import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";

import Modal from "../modal/modal";
import { CLOSE_MODAL } from "../../services/actions/modal";
import { checkUserAuth } from "../../services/actions/user";
import { useDispatch } from "../../services/hooks";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ForAuth, ForNonAuth } from "../protected-route/protected-route";

import IngredientDetails from "../ingredient-details/ingredient-details";
import { getIngredientsEnhancer } from "../../services/actions/ingredients";

import OrdersFeed from "../orders-feed/orders-feed";
import {
  MainPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404,
  FeedPage,
  OrderInfoPage,
} from "../../pages";

function App() {
  const ModalSwitch = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state || {};
    const background = state.background;

    const closeModalIngredient = () => {
      dispatch({
        type: CLOSE_MODAL,
      });
      navigate("/");
    };

    const closeModalFeed = () => {
      dispatch({
        type: CLOSE_MODAL,
      });
      navigate("/feed");
    };

    const closeModalPersonal = () => {
      dispatch({
        type: CLOSE_MODAL,
      });
      navigate("/profile/orders");
    };

    useEffect(() => {
      dispatch(checkUserAuth());
    }, [dispatch]);

    useEffect(() => {
      dispatch(getIngredientsEnhancer());
    }, [dispatch]);

    return (
      <>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/ingredients/:id" element={<IngredientDetails title="Детали ингредиента" />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<OrderInfoPage />} />
          <Route path="/login" element={<ForNonAuth children={<LoginPage />} />} />
          <Route path="/register" element={<ForNonAuth children={<RegisterPage />} />} />
          <Route path="/forgot-password" element={<ForNonAuth children={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<ForNonAuth children={<ResetPasswordPage />} />} />
          <Route path="/profile" element={<ForAuth children={<ProfilePage />} />}>
            <Route path="orders" element={<ForAuth children={<OrdersFeed />} />} />
          </Route>
          <Route path="/profile/orders/:id" element={<ForAuth children={<OrderInfoPage />} />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal closeModalWindow={closeModalIngredient} title="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path="/feed/:id"
              element={
                <Modal closeModalWindow={closeModalFeed}>
                  <OrderInfoPage />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:id"
              element={
                <ForAuth
                  children={
                    <Modal closeModalWindow={closeModalPersonal}>
                      <OrderInfoPage />
                    </Modal>
                  }
                />
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