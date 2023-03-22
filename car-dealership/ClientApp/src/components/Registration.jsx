import React, { useContext, useState } from "react";
import { validate } from "../data/validate";
import { AppContext } from "../providers/AppProvider";
import { CloseIcon } from "./common/icons/CloseIcon";

const Registration = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    registerCustomer,
    displaySignupModal,
    setDisplaySignupModal,
    showToast,
  } = useContext(AppContext);

  const handleRegisterCustomer = async (e) => {
    e.preventDefault();
    const messaege = validate(email, password, name, true);
    if (messaege) {
      showToast(messaege, false, true);
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };
    await registerCustomer(user);
  };

  return (
    displaySignupModal && (
      <div className="general__modal">
        <form
          onSubmit={handleRegisterCustomer}
          className="modal__content registration__modal"
          autoComplete="off"
        >
          <span
            className="close__button"
            onClick={() => setDisplaySignupModal(!displaySignupModal)}
          >
            <CloseIcon />
          </span>
          <h2 className="purple modal__title">Sign Up</h2>
          <div className="input__wrapper">
            <label htmlFor="name" className="purple">
              Name:
            </label>
            <input
              type="text"
              value={name}
              className="modal__input password__input"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input__wrapper">
            <label htmlFor="email" className="purple">
              Email:
            </label>
            <input
              type="email"
              className="modal__input password__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input__wrapper">
            <label htmlFor="password" className="purple">
              Password:
            </label>
            <input
              type="password"
              className="modal__input password__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn__general login__button modal__button"
          >
            Sign Up
          </button>
        </form>
      </div>
    )
  );
};

export default Registration;
