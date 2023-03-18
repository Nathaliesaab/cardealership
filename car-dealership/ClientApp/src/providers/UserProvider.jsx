import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  //   const navigate = useNavigate();

  let avatarString = "";
  if (!!user) {
    // const { firstName, lastName } = user;
    // avatarString = firstName.charAt(0) + lastName.charAt(0);
  }
  const showToast = (message, isError = false) => {
    if (isError) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };
  const signIn = async (credentials) => {
    try {
      const res = await fetch("/api/customer/authenticate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const resp = await res.json();
      if (res.ok) {
        showToast("Success");
        localStorage.setItem("jwt", JSON.stringify(resp.jwtToken));
        setUser(resp.customer);
        setDisplayLoginModal(false);
        // navigate("/findyourcar");
      } else {
        showToast("Login failed, invalid credentials", true);
      }
    } catch (err) {
      showToast(`Login Failed due to: ${err.message}`, true);
    }
  };

  const signOut = () => {
    // Perform sign-out logic and reset user state
    localStorage.removeItem("jwt");
    setUser(null);
  };
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    console.log("refreshed");
    // Check if a valid JWT is present in local storage

    if (token) {
      try {
        // Verify the JWT and decode its payload
        const payload = jwtDecode(token);
        console.log(payload);
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

  return (
    <UserContext.Provider
      value={{ user, signIn, signOut, setDisplayLoginModal, displayLoginModal }}
    >
      {children}
    </UserContext.Provider>
  );
};
