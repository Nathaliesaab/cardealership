import Logo from "../assets/logo.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppRoutes from "../AppRoutes";
import { HamburgerIcon } from "../common/icons/HamburgerIcons";
import { CloseIcon } from "../common/icons/CloseIcons";

export const Navbar = ({ numberOfItems }) => {
  const [displayMenu, setDisplayMenu] = useState(false);
  return (
    <>
      <nav>
        <div className="nav__container">
          <Link to="/">
            <img src={Logo} alt="Logo" className="logo" />
          </Link>

          <ul className="nav__links">
            {AppRoutes.map(
              (item, index) =>
                item.display && (
                  <li className="nav__list" key={index}>
                    <Link to={`${item.path}`} className="nav__link">
                      {item.linkValue}
                    </Link>
                  </li>
                )
            )}
            <button className="nav__login--button btn__general">Login</button>
          </ul>
          <button
            className="btn__menu"
            onClick={() => setDisplayMenu(!displayMenu)}
          >
            <HamburgerIcon />
          </button>
        </div>
      </nav>
      <div
        className={`menu__backdrop ${displayMenu && "menu__backdrop--open"}`}
      >
        <button
          className="btn__menu btn__menu--close"
          onClick={() => setDisplayMenu(!displayMenu)}
        >
          <CloseIcon />
        </button>
        <ul className="menu__links">
          {AppRoutes.map(
            (item, index) =>
              item.display && (
                <li className="menu__list" key={index}>
                  <Link
                    to="/"
                    className="menu__link"
                    onClick={() => setDisplayMenu(!displayMenu)}
                  >
                    {item.linkValue}
                  </Link>
                </li>
              )
          )}
          <button className="nav__login--button btn__general">Login</button>
        </ul>
      </div>
    </>
  );
};
