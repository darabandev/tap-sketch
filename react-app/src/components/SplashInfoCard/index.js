import React from "react";

const SplashInfoCard = ({ infoCode }) => {
  // each info card displays unique info but isn't stored in a DB
  // hardcoded values are below and this function returns the values
  // to populate in each component
  const infoObject = infoCode => {
    switch (infoCode) {
      case "a":
        return {
          icon: "fas fa-image",
          tagline: "See what people are making.",
          text: "Follow users to stay current with their latest artworks.",
        };
      case "b":
        return {
          icon: "fas fa-palette",
          tagline: "Create your own art.",
          text: "I said you can look at pics, bro.",
        };
      case "c":
        return {
          icon: "fas fa-users",
          tagline: "Share with your friends.",
          text: "I said you can look at pics, bro.",
        };
      default:
        return {};
    }
  };

  return (
    <div>
      <i className={infoObject(infoCode).icon}></i>
      <h3>{infoObject(infoCode).tagline}</h3>
      <p>{infoObject(infoCode).text}</p>
    </div>
  );
};

export default SplashInfoCard;
