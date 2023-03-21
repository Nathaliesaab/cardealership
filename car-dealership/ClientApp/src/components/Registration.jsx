import React, { useContext, useState } from "react";
import { AppContext } from "../providers/AppProvider";
import { CloseIcon } from "./common/icons/CloseIcon";
import { toast } from "react-toastify";

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

  // function to validate registration  inputs
  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      showToast("Please enter email", false, true);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      result = false;
      showToast("Please enter a valid email", false, true);
    }
    if (password === "" || password === null) {
      result = false;
      showToast("Please enter password", false, true);
    } else if (password.length < 8) {
      result = false;
      showToast("Password must be at least 8 characters long", false, true);
    }

    if (name === "" || password === null) {
      result = false;
      showToast("Please enter name", false, true);
    }

    return result;
  };

  // function to handle submit registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };
    const result = await registerCustomer(user);
    console.log(result);
    // perform sign-up action with name, email, and password
    // clear input fields
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    displaySignupModal && (
      <div className="general__modal">
        <form
          onSubmit={handleSubmit}
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
              required
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
