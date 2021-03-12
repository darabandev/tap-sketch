import React from "react";
import "./SplashInfoCard.css";

const SplashInfoCard = ({ infoCode }) => {
  // each info card displays unique info but isn't stored in a DB
  // hardcoded values are below and this function returns the values
  // to populate in each component
  const infoObject = infoCode => {
    switch (infoCode) {
      case "a":
        return {
          icon: "fas fa-image",
          tagline: "See what everyone's up to.",
          text: "Follow users to stay current with their latest artworks!",
        };
      case "b":
        return {
          icon: "fas fa-palette",
          tagline: "Create your own art.",
          text: "Use the built-in canvas to bring your ideas to life!",
        };
      case "c":
        return {
          icon: "fas fa-users",
          tagline: "Share with your friends.",
          text: "Post your creations online for your friends to like and comment!",
        };
      default:
        return {};
    }
  };

  return (
    <div className="splash-card">
      <i className={infoObject(infoCode).icon}></i>
      <h3>{infoObject(infoCode).tagline}</h3>
      <p>{infoObject(infoCode).text}</p>
    </div>
  );
};

export default SplashInfoCard;
