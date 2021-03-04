import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./store";
import "./index.css";
import App from "./App";

const store = configureStore();

function Root() {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
