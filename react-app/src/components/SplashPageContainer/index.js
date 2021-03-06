import React from "react";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import SplashInfoCard from "../SplashInfoCard";
import painter from "./painter.png";
import "./SplashPageContainer.css";

const SplashPageContainer = ({ authenticated, setAuthenticated, authType }) => {
  return (
    <div className="main splash-container">
      <h1>Draw Up Some Fun!</h1>
      <div className="pic-form">
        <div>
          <img src={painter} alt="painter" />
        </div>
        <div className="auth-form-container">
          {authType === "login" ? (
            <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
          ) : (
            <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
          )}
        </div>
      </div>
      <div className="splash-card-container">
        <SplashInfoCard infoCode="a" />
        <SplashInfoCard infoCode="b" />
        <SplashInfoCard infoCode="c" />
      </div>
    </div>
  );
};

export default SplashPageContainer;
