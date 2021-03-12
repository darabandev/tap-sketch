import React from "react";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";

const SplashPageContainer = ({ authenticated, setAuthenticated }) => {
  return (
    <div>
      <h1>Splash Page Component</h1>
      {window.location.href.includes("login") ? (
        <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      ) : (
        <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      )}
    </div>
  );
};

export default SplashPageContainer;
