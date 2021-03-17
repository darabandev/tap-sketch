import React from "react";
import { Link } from "react-router-dom";
import "./ContactMe.css";

const ContactMe = () => {
  return (
    <div className="contact-me">
      <span>About the Creator: </span>
      <Link to="https://www.linkedin.com/in/robertdaraban/">
        <i class="fab fa-linkedin"></i>
      </Link>
      <Link to="https://github.com/darabandev">
        <i class="fab fa-github"></i>
      </Link>
    </div>
  );
};

export default ContactMe;
