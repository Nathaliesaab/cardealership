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

  // Check if a car with the given id is saved in the user's favourites
  const isCarSaved = (id) => favourites?.find((car) => car.id === id);

  const showToast = (message, isError = false) => {
    if (isError) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const handleSignIn = async (credentials) => {
    const [response, error] = await sign_in(credentials);
    if (response.jwtToken) {
      showToast("Success");
      const payload = jwtDecode(response.jwtToken);
      setUser({
        id: payload.id,
        email: payload.email,
        name: payload.unique_name,
      });
      setDisplayLoginModal(false);
      navigate("/");
    } else {
      showToast(response, true);
    }
    if (error) showToast(error.message, true);
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
    if (response.status === 200) {
      showToast(response);
      setDisplaySignupModal(false);
      handleSignIn({ email: user.email, password: user.password });
    } else {
      showToast(response, true);
    }

    if (error) showToast(error.message, true);
  };

  const handleGetSavedCars = async () => {
    const [result, error] = await customer_saved_cars(user?.id);
    setFavourites(result);
  };

  const saveCar = async (carId) => {
    if (!user) showToast("Please Sign In to save cars", true);
    else {
      const [result, error] = await favourite_car({
        carId: carId,
        customerId: +user?.id,
      });
      if (result) {
        showToast("Car Saved");
        handleGetSavedCars();
      }
    }
  };
  const removeCar = async (carId) => {
    const [result, error] = await unfavourite_car({
      customerId: +user?.id,
      carId: carId,
    });
    if (result) {
      showToast("Car Unsaved");
      handleGetSavedCars();
    }
    showToast(error, true);
  };

  useEffect(() => {
    // Verify the JWT and decode its payload
    if (token) {
      try {
        const payload = jwtDecode(token);
        const expirationTime = payload.exp;
        const currentTime = Date.now() / 1000; // convert to seconds
        if (expirationTime < currentTime) {
          localStorage.removeItem("jwt");
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
    }
  }, [token]);
  useEffect(() => {
    if (user) handleGetSavedCars();
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
