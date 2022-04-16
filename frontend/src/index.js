import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { loadUserInfo } from "./store/actions/authActions";
import store from "./store";
import { Provider } from "react-redux";


const userToken = localStorage.getItem("alumniUserToken");
if (userToken) {
	store.dispatch(loadUserInfo());
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
