import { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { customer_saved_cars } from "../api/customer_apis";
import { SavedCar } from "./ui/SavedCar";
export const Account = () => {
  const { user, signOut, favourites } = useContext(UserContext);
  return (
    <section id="account">
      <div className="container">
        <div className="row">
          <h2 className="purple account__details--title"> Account Details</h2>
          <div className="account__details--wrapper">
            <div className="account__details">
              Email
              <span>{user?.email}</span>
            </div>
            <div className="account__details">
              Name
              <span>{user?.name}</span>
            </div>
            <div className="account__details">
              Saved:
              <div className="saved__cars--wrapper">
                {favourites?.map((car) => (
                  <SavedCar car={car} key={car.id} />
                ))}
                {!favourites.length && <span>No Saved Cars Yet</span>}
              </div>
            </div>
            <div className="account__details btn__general logout__button">
              <Link to="/" onClick={signOut}>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
