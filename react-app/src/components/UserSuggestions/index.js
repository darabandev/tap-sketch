import React from "react";
import { Link } from "react-router-dom";
import "./UserSuggestions.css";

const UserSuggestions = () => {
  return (
    <div className="user-suggestions">
      <h1>Looks like you aren't following anyone...</h1>
      <h2>Get started with some of these users!</h2>
      <p>
        <Link to="/profile/robd">robd</Link>
      </p>
      <p>
        <Link to="/profile/blackandyellow">blackandyellow</Link>
      </p>
      <p>
        <Link to="/profile/theartiste">theartiste</Link>
      </p>
    </div>
  );
};

export default UserSuggestions;
