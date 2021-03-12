import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { setUser } from "../../store/session";
import "./AuthForm.css";

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async e => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      dispatch(setUser(user));
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = e => {
    setEmail(e.target.value);
  };

  const updatePassword = e => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/page/1" />;
  }

  return (
    <form onSubmit={onLogin} className="auth-form">
      <p>Welcome back!</p>
      <div>
        {errors.map(error => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <input name="email" type="text" placeholder="Email" value={email} onChange={updateEmail} />
      </div>
      <div>
        <input name="password" type="password" placeholder="Password" value={password} onChange={updatePassword} />
      </div>
      <button type="submit">Login</button>
      <p className="login-switch-text">Don't have an account?</p>
      <Link to="/sign-up">Sign up here.</Link>
    </form>
  );
};

export default LoginForm;
