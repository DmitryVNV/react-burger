import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";

import Modal from "../modal/modal";
import { CLOSE_MODAL } from "../../services/actions/modal";
import { VIEWED_INGREDIENT } from "../../services/actions/ingredients";
import { DELETE_ORDER } from "../../services/actions/order";
import { checkUserAuth } from "../../services/actions/user";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ForAuth, ForNonAuth } from "../protected-route/protected-route";

import IngredientDetails from "../ingredient-details/ingredient-details";
import { getIngredientsEnhancer } from "../../services/actions/ingredients";

import { useSelector, useDispatch } from "react-redux";
import {
  MainPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404,
} from "../../pages";

function App() {
  const ModalSwitch = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state || {};
    const background = state.background;
    const { currentIngredients } = useSelector((store: any) => store.ingredients);
    const closeModal = () => {
      dispatch({
        type: CLOSE_MODAL,
      });
      dispatch({
        type: DELETE_ORDER,
      });
      currentIngredients &&
        dispatch({
          type: VIEWED_INGREDIENT,
          item: null,
        });
      navigate("/");
    };

    useEffect(() => {
      dispatch(checkUserAuth() as any);
    }, [dispatch]);

    useEffect(() => {
      dispatch(getIngredientsEnhancer() as any);
    }, [dispatch]);

    return (
      <>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/ingredients/:id" element={<IngredientDetails title="Детали ингредиента" />} />
          <Route path="/login" element={<ForNonAuth children={<LoginPage />} />} />
          <Route path="/register" element={<ForNonAuth children={<RegisterPage />} />} />
          <Route path="/forgot-password" element={<ForNonAuth children={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<ForNonAuth children={<ResetPasswordPage />} />} />
          <Route path="/profile" element={<ForAuth children={<ProfilePage />} />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal closeModalWindow={closeModal} title="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </>
    );
  };

  return <ModalSwitch />;
}

export default App;