import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { CloseIcon } from "./common/icons/CloseIcon";
import { toast } from "react-toastify";

const Registration = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerCustomer, displaySignupModal, setDisplaySignupModal } =
    useContext(UserContext);
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
  return (
    displaySignupModal && (
      <div className="login--registration__modal">
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
