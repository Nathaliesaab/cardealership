import React, { useContext, useState } from "react";
import { CloseIcon } from "./common/icons/CloseIcon";
import { AppContext } from "../providers/AppProvider";
import { toast } from "react-toastify";
import { validate } from "../data/validate";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, setDisplayLoginModal, setDisplaySignupModal, showToast } =
    useContext(AppContext);

  const ProceedLoginusingAPI = async (e) => {
    e.preventDefault();
    const messaege = validate(email, password, null, false);
    if (messaege) {
      showToast(messaege, false, true);
      return;
    }
    const credentials = { email, password };
    signIn(credentials);
  };

  return (
    <div className="general__modal">
      <form
        onSubmit={ProceedLoginusingAPI}
        className="modal__content"
        autoComplete="off"
      >
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
            className="modal__input"
            id="email"
            required
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
            className="modal__input password__input"
            id="password"
            value={password}
            required
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
        <div
          onClick={() => {
            {
              setDisplayLoginModal(false);
              setDisplaySignupModal(true);
            }
          }}
        >
          Sign Up here
        </div>
      </form>
    </div>
  );
};

export default Login;
