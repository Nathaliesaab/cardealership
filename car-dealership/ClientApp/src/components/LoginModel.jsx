import React, { useContext, useEffect, useState } from "react";
import { CloseIcon } from "./common/icons/CloseIcon";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, signIn, signOut, setDisplayLoginModal } =
    useContext(UserContext);

  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast.warning("Please Enter Email");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };

  const ProceedLoginusingAPI = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const credentials = { email, password };
    signIn(credentials);
  };

  return (
    <div className="login__modal">
      <form onSubmit={ProceedLoginusingAPI} className="login__modal-content">
        <span
          className="close__button"
          onClick={() => setDisplayLoginModal(false)}
        >
          <CloseIcon />
        </span>
        <h2 className="purple modal__title">Sign In</h2>

        <div className="input__wrapper">
          <label htmlFor="email" className="purple">
            Email:
          </label>
          <input
            type="text"
            className="login__input"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="input__wrapper">
          <label htmlFor="password" className="purple">
            Password:
          </label>
          <input
            type="password"
            className="login__input password__input"
            id="password"
            value={password}
            placeholder="........"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn__general login__button modal__button"
        >
          Sign In
        </button>
        <a href="#">Sign Up here</a>
      </form>
    </div>
  );
};

export default Login;
