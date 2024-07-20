import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";

import Modal from "../modal/modal";
import { CLOSE_MODAL } from "../../services/actions/modal";
import { VIEWED_INGREDIENT } from "../../services/actions/ingredients";
import { DELETE_ORDER } from "../../services/actions/order";
import { checkUserAuth } from "../../services/actions/user";

import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import ProtectedRoute from "../protected-route/protected-route";

import IngredientDetails from "../ingredient-details/ingredient-details";

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
    const { currentIngredients } = useSelector((store) => store.ingredients);
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

    const {
      isAuthenthicated,
      resetPasswordFailed,
      resetPasswordMessage,
      setNewPasswordFailed,
      setNewPasswordMessage,
    } = useSelector((store) => store.user);

    useEffect(() => {
      dispatch(checkUserAuth());
    }, [dispatch]);

    return (
      <>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/ingredients/:id"
            element={<IngredientDetails title="Детали ингредиента" />}
          />
          <Route path="/login/" element={isAuthenthicated ? <Navigate to="/" /> : <LoginPage />} />
          <Route
            path="/register/"
            element={isAuthenthicated ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="/forgot-password/"
            element={isAuthenthicated ? <Navigate to="/" /> : <ForgotPasswordPage />}
          />
          <Route
            path="/reset-password/"
            element={isAuthenthicated ? <Navigate to="/" /> : <ResetPasswordPage />}
          />
          <Route
            path="/profile/"
            element={!isAuthenthicated ? <Navigate to="/login/" /> : <ProfilePage />}
          />
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