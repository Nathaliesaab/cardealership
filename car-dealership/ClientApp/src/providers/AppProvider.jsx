import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import {
  customer_saved_cars,
  register,
  sign_in,
  unfavourite_car,
  favourite_car,
} from "../api/customer_apis";

const MILLISECOND = 1000;

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  const [displaySignupModal, setDisplaySignupModal] = useState(false);
  const [displayReviewModal, setDisplayReviewModal] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const isCarSaved = (id) => favourites?.find((car) => car.id === id);

  const showToast = (message, isError = false, isWarning = false) => {
    if (isError) {
      toast.error(message);
    } else if (isWarning) {
      toast.warning(message);
    } else {
      toast.success(message);
    }
  };

  const handleSignIn = async (credentials) => {
    const [response, error] = await sign_in(credentials);

    if (error) {
      showToast(error.message, true);
      return;
    }

    if (!response.jwtToken) {
      showToast(response, true);
      return;
    }

    showToast("Success");

    const payload = jwtDecode(response.jwtToken);

    setUser({
      id: payload.id,
      email: payload.email,
      name: payload.unique_name,
    });

    setDisplayLoginModal(false);

    navigate("/account");
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    setFavourites([]);
    navigate("/");
    showToast("Success");
  };

  const handleRegister = async (user) => {
    const [response, error] = await register(user);

    if (error) {
      showToast(error, true);
      return;
    }

    showToast(response);
    setDisplaySignupModal(false);
    handleSignIn({ email: user.email, password: user.password });
  };

  const handleGetSavedCars = async () => {
    if (!user) {
      setFavourites([]);
      return;
    }
    const [result, error] = await customer_saved_cars(user?.id, token);
    setFavourites(result);
    if (error) {
      showToast(error, true);
    }
  };

  const saveCar = async (carId) => {
    if (!user) {
      showToast("Please sign in to save cars", false, true);
      return;
    }
    const [result, error] = await favourite_car({
      carId,
      customerId: +user?.id,
    });
    if (error) {
      showToast(error, true);
      return;
    }

    showToast("Car Saved");
    handleGetSavedCars();
  };

  // function to handle unsaving cars
  const removeCar = async (carId) => {
    const [result, error] = await unfavourite_car({
      customerId: +user?.id,
      carId,
    });
    if (error) {
      showToast(error, true);
      return;
    }

    showToast("Car Unsaved");
    handleGetSavedCars();
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    try {
      const payload = jwtDecode(token);
      const expirationTime = payload.exp;
      const currentTime = Date.now() / MILLISECOND;

      if (expirationTime < currentTime) {
        localStorage.removeItem("jwt");
        setUser(null);
        setFavourites([]);
      } else {
        setUser({
          id: payload.id,
          email: payload.email,
          name: payload.unique_name,
        });
      }
    } catch (err) {
      localStorage.removeItem("jwt");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      handleGetSavedCars();
    }
  }, [user]);

  const contextValue = {
    user,
    signIn: handleSignIn,
    signOut: handleSignOut,
    savedCars: handleGetSavedCars,
    setDisplayLoginModal,
    showToast,
    displayLoginModal,
    registerCustomer: handleRegister,
    displaySignupModal,
    favourites,
    setDisplaySignupModal,
    isCarSaved,
    removeCar,
    saveCar,
    setDisplayReviewModal,
    displayReviewModal,
    reviews,
    setReviews,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
