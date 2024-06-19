import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <img
        src="https://i.imgur.com/iT78As3.png"
        alt="Logo"
        onClick={handleLogoClick}
        className="site-logo"
      />
    </header>
  );
};

export default Header;
