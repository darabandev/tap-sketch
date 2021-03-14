import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import img from "./cropped.png";
import "./Navbar.css";

const Navbar = ({ setAuthenticated, authenticated }) => {
  const user = useSelector(state => state.session.user);

  return (
    <nav className="navbar">
      <li>
        <NavLink to="/page/1" exact={true} activeClassName="active">
          <img src={img} alt="logo" />
        </NavLink>
      </li>
      {authenticated ? (
        <>
          <li>
            <NavLink to="/create" exact={true} activeClassName="active">
              Create
            </NavLink>
          </li>
          <div className="profile-btn-container">
            <li>
              <NavLink
                to={user && `/profile/${user.username}`}
                className="green-btn"
                exact={true}
                activeClassName="active"
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <LogoutButton setAuthenticated={setAuthenticated} className="orange-btn" />
            </li>
          </div>
        </>
      ) : (
        <div className="login-btn-container">
          <li>
            <NavLink to="/login" exact={true} className="orange-btn" activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" exact={true} className="green-btn" activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
