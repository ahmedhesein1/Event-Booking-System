import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} EventMaster. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
