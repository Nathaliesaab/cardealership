import React, { createContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { customer_saved_cars, register, sign_in } from "../api/customer_apis";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  const [displaySignupModal, setDisplaySignupModal] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const token = localStorage.getItem("jwt");

  const carSaved = (id) => {
    return favourites?.find((item) => item.id === id);
  };
  // const navigate = useNavigate();
  const showToast = (message, isError = false) => {
    if (isError) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const registerCustomer = async (user) => {
    const [response, error] = await register(user);
    if (response.status == 200) {
      showToast(response);
      setDisplaySignupModal(false);
      signIn({ email: user.email, password: user.password });
    } else {
      showToast(response, true);
    }
  };

  const signIn = async (credentials) => {
    const [response, error] = await sign_in(credentials);
    if (response.jwtToken) {
      showToast("Success");
      setUser(response.customer);
      setDisplayLoginModal(false);
    }
    showToast(response, true);
    if (error) showToast(error, true);
  };

  const signOut = () => {
    // Perform sign-out logic and reset user state
    localStorage.removeItem("jwt");
    setUser(null);
    setFavourites([]);
  };

  useEffect(() => {
    // Check if a valid JWT is present in local storage
    if (token) {
      try {
        // Verify the JWT and decode its payload
        const payload = jwtDecode(token);
        const expirationTime = payload.exp;
        const currentTime = Date.now() / 1000; // convert to seconds
        if (expirationTime < currentTime) {
          localStorage.removeItem("jwt");
        }
        // Set the user's information in the app's state
        setUser({
          id: payload.id,
          email: payload.email,
          name: payload.unique_name,
        });
      } catch (err) {
        // If the JWT is invalid or expired, remove it from local storage
        localStorage.removeItem("jwt");
      }
    }
  }, [token]);

  const getSavedCars = async () => {
    const [result, error] = await customer_saved_cars(user?.id);
    if (result) {
      setFavourites(result);
    }
  };

  useEffect(() => {
    if (user) {
      getSavedCars();
    }
  }, [user?.id]);
  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signOut,
        setDisplayLoginModal,
        showToast,
        displayLoginModal,
        registerCustomer,
        displaySignupModal,
        favourites,
        setDisplaySignupModal,
        carSaved,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
