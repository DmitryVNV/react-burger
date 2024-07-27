import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers";
import { thunk } from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

const enhancerComposer =
  typeof window === "object" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = enhancerComposer(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

const rootTemp = document.getElementById("root");
if (rootTemp === null) throw new Error("Отсутствует элемент root");
const root = ReactDOM.createRoot(rootTemp);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();