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
  // state variable to manage application's user
  const [user, setUser] = useState(null);

  // state variables to manage displaying login,signup and review modals
  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  const [displaySignupModal, setDisplaySignupModal] = useState(false);
  const [displayReviewModal, setDisplayReviewModal] = useState(false);

  // state variables to manage user's favourited cars
  const [favourites, setFavourites] = useState([]);

  //state variable to manage reviews
  const [reviews, setReviews] = useState([]);

  //jwt token stored in local storage
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  // Check if a car with the given id is saved in the user's favourites
  const isCarSaved = (id) => favourites?.find((car) => car.id === id);

  // function to display toast message ,error,or warning
  const showToast = (message, isError = false, isWarning = false) => {
    if (isError) {
      toast.error(message);
    } else if (isWarning) {
      toast.warning(message);
    } else {
      toast.success(message);
    }
  };

  // function to handle user sign in
  const handleSignIn = async (credentials) => {
    const [response, error] = await sign_in(credentials);

    // if response contain jwtToken => user is authenticated
    if (response.jwtToken) {
      // display success
      showToast("Success");

      // decode jwt token to get user data
      const payload = jwtDecode(response.jwtToken);

      //set user data from decoded token
      setUser({
        id: payload.id,
        email: payload.email,
        name: payload.unique_name,
      });
      // close login modal
      setDisplayLoginModal(false);

      // navigate to account page
      navigate("/account");
    } else {
      // user credentials are wrong, display message
      showToast(response, true);
    }
    // if error exist display error message
    if (error) showToast(error.message, true);
  };

  // function to handle user sign out
  const handleSignOut = () => {
    // remove token from local storage
    localStorage.removeItem("jwt");

    // set user to null
    setUser(null);

    // empty favourites
    setFavourites([]);

    // navigate to landing page
    navigate("/");

    // display success
    showToast("Success");
  };

  // function to handle registration
  const handleRegister = async (user) => {
    const [response, error] = await register(user);
    // if response status is 200 => success => user is registered
    if (response.status === 200) {
      showToast(response);
      setDisplaySignupModal(false);
      handleSignIn({ email: user.email, password: user.password });
    }
    // else response will be that user with entered email already exits
    else {
      showToast(response, true);
    }
    // if error exist, display error message
    if (error) showToast(error.message, true);
  };

  // function to handle getting logged in user saved cars
  const handleGetSavedCars = async () => {
    // receive cars by user id
    const [result, error] = await customer_saved_cars(user?.id);
    setFavourites(result);
    if (error) {
      showToast(error, true);
    }
  };

  // function to handle saving cars
  const saveCar = async (carId) => {
    // if  user is not logged in, dont allow to save cars, display message
    if (!user) showToast("Please Sign In to save cars", false, true);
    else {
      // call api to save car passing car and user ids
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

  // function to handle unsaving cars
  const removeCar = async (carId) => {
    // call api to unsave car passing car and user ids
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
        // get expiration time
        const expirationTime = payload.exp;
        // convert to seconds
        const currentTime = Date.now() / 1000;

        // get expiration time is less than current time
        if (expirationTime < currentTime) {
          // remove jwt token => log out User
          localStorage.removeItem("jwt");
        } else {
          setUser({
            id: payload.id,
            email: payload.email,
            name: payload.unique_name,
          });
        }
      } catch (err) {
        // if error  // remove jwt token => log out User
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
