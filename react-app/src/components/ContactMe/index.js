import React from "react";
import { Link } from "react-router-dom";
import "./ContactMe.css";

const ContactMe = () => {
  return (
    <div className="contact-me">
      <span>About the Creator: </span>
      <a target="_blank" href="https://www.linkedin.com/in/robertdaraban/">
        <i class="fab fa-linkedin"></i>
      </a>
      <a target="_blank" href="https://github.com/darabandev">
        <i class="fab fa-github"></i>
      </a>
    </div>
  );
};

export default ContactMe;
