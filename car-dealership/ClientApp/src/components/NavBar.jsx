import Logo from "../assets/logo.png";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppRoutes from "../AppRoutes";
import { HamburgerIcon } from "./common/icons/HamburgerIcons";
import { CloseIcon } from "./common/icons/CloseIcon";
import Login from "./LoginModel";
import { UserContext } from "../providers/UserProvider";
import Registration from "./Registration";

export const Navbar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const { displayLoginModal, setDisplayLoginModal, user, displaySignupModal } =
    useContext(UserContext);
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
            {!user ? (
              <button
                className="login__button btn__general"
                onClick={() => setDisplayLoginModal(!displayLoginModal)}
              >
                Login
              </button>
            ) : (
              <Link className="login__button btn__general" to={"/account"}>
                Account
              </Link>
            )}
          </ul>
          <button
            className="btn__menu"
            onClick={() => setDisplayMenu(!displayMenu)}
          >
            <HamburgerIcon />
          </button>
        </div>
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
                      to={`${item.path}`}
                      className="menu__link"
                      onClick={() => setDisplayMenu(!displayMenu)}
                    >
                      {item.linkValue}
                    </Link>
                  </li>
                )
            )}
            {!user ? (
              <button
                className="login__button btn__general"
                onClick={() => {
                  {
                    setDisplayLoginModal(!displayLoginModal);
                    setDisplayMenu(!displayMenu);
                  }
                }}
              >
                Login
              </button>
            ) : (
              <Link
                className="login__button btn__general"
                to={"/account"}
                onClick={() => setDisplayMenu(!displayMenu)}
              >
                Account
              </Link>
            )}
          </ul>
        </div>
      </nav>
      {displayLoginModal && <Login />}
      {displaySignupModal && <Registration />}
    </>
  );
};
