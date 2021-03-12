import React from "react";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import painter from "./painter.png";
import "./SplashPageContainer.css";

const SplashPageContainer = ({ authenticated, setAuthenticated, authType }) => {
  return (
    <div>
      <h1>Draw Up Some Fun!</h1>
      <div className="pic-form">
        <img src={painter} alt="painter" />
        {authType === "login" ? (
          <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        ) : (
          <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
        )}
      </div>
    </div>
  );
};

export default SplashPageContainer;
