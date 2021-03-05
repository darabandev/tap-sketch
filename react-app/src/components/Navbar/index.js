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
        <NavLink to="/" exact={true} activeClassName="active">
          <img src={img} alt="logo" />
        </NavLink>
      </li>
      {authenticated ? (
        <>
          <li>
            <NavLink to={user && `/profile/${user.username}`} exact={true} activeClassName="active">
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/create" exact={true} activeClassName="active">
              Create
            </NavLink>
          </li>
          <li>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        </>
      )}
    </nav>
  );
};

export default Navbar;
