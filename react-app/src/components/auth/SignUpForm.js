import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";
import { setUser } from "../../store/session";
import { useDispatch } from "react-redux";
import "./AuthForm.css";

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();

  const onSignUp = async e => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        dispatch(setUser(user));
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = e => {
    setUsername(e.target.value);
  };

  const updateEmail = e => {
    setEmail(e.target.value);
  };

  const updatePassword = e => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = e => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/page/1" />;
  }

  return (
    <form onSubmit={onSignUp} className="auth-form">
      <p>Let's get started!</p>
      <div>
        <input type="text" name="username" onChange={updateUsername} value={username} placeholder="Username"></input>
      </div>
      <div>
        <input type="text" name="email" onChange={updateEmail} value={email} placeholder="Email"></input>
      </div>
      <div>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          placeholder="Password"
        ></input>
      </div>
      <div>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder="Confirm Password"
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
