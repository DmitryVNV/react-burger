import React, { useMemo, useState, useRef, MutableRefObject, FC, UIEvent } from "react";
import styles from "./burger-ingredients.module.css";
import { useDrag } from "react-dnd";
import { v4 } from "uuid";
import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "../../services/hooks";
import { OPEN_MODAL } from "../../services/actions/modal";
import { VIEWED_INGREDIENT } from "../../services/constants/ingredients";
import { useNavigate, useLocation } from "react-router-dom";
import { IIngredient, IIngredientTypes, IIngredientInfo } from "../../services/types";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { ingredientData, constructorData } = useSelector(
    (store: { ingredients: { ingredientData: IIngredient[]; constructorData: any } }) => store.ingredients,
  );

  const bunRef = useRef<HTMLParagraphElement>(null) as MutableRefObject<HTMLParagraphElement>;
  const sauceRef = useRef<HTMLParagraphElement>(null) as MutableRefObject<HTMLParagraphElement>;
  const mainRef = useRef<HTMLParagraphElement>(null) as MutableRefObject<HTMLParagraphElement>;

  const filterByType = (type: IIngredient["type"]) =>
    ingredientData.filter((ingredient: IIngredient) => ingredient.type === type);
  const buns = useMemo(() => filterByType("bun"), [ingredientData]);
  const sauces = useMemo(() => filterByType("sauce"), [ingredientData]);
  const mains = useMemo(() => filterByType("main"), [ingredientData]);

  const modalOpen = (data: IIngredient) => {
    dispatch({
      type: OPEN_MODAL,
      modalTitle: "Детали ингредиента",
      modalContent: <IngredientDetails data={data} />,
    });
    navigate(`/ingredients/${data._id}`, { state: { background: location } });
  };
  const [currentTab, setCurrentTab] = useState("buns");

  const onTabClick = (tab: string) => {
    setCurrentTab(tab);
    const elementById = document.getElementById(tab);
    if (elementById) elementById.scrollIntoView({ behavior: "smooth" });
  };

  const tabChanger = (e: UIEvent<HTMLElement>) => {
    const currentHeight = e.currentTarget.getBoundingClientRect().y + 50;
    const sauceHeight = sauceRef?.current?.getBoundingClientRect().y;
    const mainHeight = mainRef?.current?.getBoundingClientRect().y;
    mainHeight < currentHeight
      ? setCurrentTab("mains")
      : sauceHeight < currentHeight
        ? setCurrentTab("sauces")
        : setCurrentTab("buns");
  };

  const count = (id: string) => {
    const ingredientCount =
      constructorData.ingredients?.filter((ingredient: IIngredient) => ingredient._id === id).length || 0;
    const bunCount = constructorData.bun?._id === id ? 2 : 0;
    return ingredientCount + bunCount;
  };

  const IngredientsTypes: FC<IIngredientTypes> = ({ title, data, typeId, innerRef }) => {
    return (
      <>
        <div className="text text_type_main-medium mt-10" id={typeId} ref={innerRef}>
          {title}
        </div>
        <ul className={`${styles.list}`}>
          {data.map((ingredient) => (
            <IngredientCard data={ingredient} key={ingredient._id} />
          ))}
        </ul>
      </>
    );
  };

  const IngredientCard: FC<IIngredientInfo> = ({ data }) => {
    const [{ isDrag }, dragRef] = useDrag({
      type: "ingredient",
      item: { _uuid: v4(), ...data },
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    });
    const opacity = isDrag ? 0.2 : 1;
    return (
      <li className={`${styles.info}`} onClick={() => modalOpen(data)} ref={dragRef} style={{ opacity }}>
        {constructorData && count(data._id) > 0 && <Counter count={count(data._id)}></Counter>}

        <img src={data.image} alt={data.name}></img>
        <div className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>
          {data.price} &nbsp;
          <CurrencyIcon type="primary" />
        </div>
        <div className={`${styles.name} text text_type_main-default`}>{data.name}</div>
      </li>
    );
  };

  return (
    <div className={`${styles.ingredients}`}>
      <div className="text text_type_main-large mb-5 mt-10">Соберите бургер</div>
      <div className={styles.tabs}>
        <Tab value="buns" active={currentTab === "buns"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === "sauces"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === "mains"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.scroll}`} onScroll={tabChanger}>
        <IngredientsTypes title="Булки" data={buns} typeId="buns" innerRef={bunRef} />
        <IngredientsTypes title="Соусы" data={sauces} typeId="sauces" innerRef={sauceRef} />
        <IngredientsTypes title="Начинки" data={mains} typeId="mains" innerRef={mainRef} />
      </div>
    </div>
  );
};

export default React.memo(BurgerIngredients);