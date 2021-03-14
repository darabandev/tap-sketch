import React from "react";
import { logout } from "../../services/auth";

const LogoutButton = ({ setAuthenticated }) => {
  const onLogout = async e => {
    await logout();
    setAuthenticated(false);
  };

  return (
    <button className="logout-btn" onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
