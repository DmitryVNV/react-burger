import styles from './burger-ingredients.module.css';
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from "react";
import PropTypes from 'prop-types';
import {burgerPropTypes} from '../../utils/propTypes';


const BurgerIngredients = (props) => {
	const [type, setTab] = useState("Булки");
	const ingredientsId = ['60666c42cc7b410027a1a9b1', '60666c42cc7b410027a1a9b1', '60666c42cc7b410027a1a9bc', '60666c42cc7b410027a1a9bb', '60666c42cc7b410027a1a9b8','60666c42cc7b410027a1a9b7', '60666c42cc7b410027a1a9bd'];
	
	const IngredientInfo = ({ data }) => {
		return (
			<li className={`${styles.info}`}>
				{
					ingredientsId.filter(ingredient=>ingredient===data._id).length>0
					?
					<div className={styles.counter}>
						<Counter count={ingredientsId.filter(ingredient=>ingredient===data._id).length}></Counter>
					</div>
					:
                    ""
                }
                
                <img src={data.image} alt={data.name}></img>
                <div className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>{data.price}<CurrencyIcon/></div>
                <div className={`${styles.name} text text_type_main-default`}>{data.name}</div>
            </li>
			);
		}; 

	const IngredientTypes = ({ data }) => {
		return (
				<ul className={`${styles.list}`}>
					{data.map(ingredient=>(
						<IngredientInfo data={ingredient} key={ingredient._id}/>
					 ))}
				</ul>
			);
		 };
	  
    return (
		<div className={`${styles.ingredients}`}>
			<div className="text text_type_main-large mb-5 mt-10">Соберите бургер</div>
		
			<div className={`${styles.tabs} mb-10`}>
				<Tab value="Булки" active={type === "Булки"} onClick={setTab}>
				  Булки
				</Tab>

				<Tab value="Соусы" active={type === "Соусы"} onClick={setTab}>
				  Соусы
				</Tab>

				<Tab value="Начинки" active={type === "Начинки"} onClick={setTab}>
				  Начинки
				</Tab>
			</div>
			  
			<div className={`${styles.scroll}`}>
				{type === "Булки"}
					<div className='text text_type_main-medium mt-10'>Булки</div>
					<IngredientTypes data={props.data.filter(ingredient=>ingredient.type==="bun")}/>
				
				{type === "Соусы"} 
					<div className='text text_type_main-medium mt-10'>Соусы</div>
					<IngredientTypes data={props.data.filter(ingredient=>ingredient.type==="sauce")}/>
				
				{type === "Начинки"}
					<div className='text text_type_main-medium mt-10'>Начинки</div>
					<IngredientTypes data={props.data.filter(ingredient=>ingredient.type==="main")}/>
			</div>
		</div>
    );

}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(burgerPropTypes.isRequired)
};