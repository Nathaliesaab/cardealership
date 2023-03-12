import React, { Component } from "react";
import Building from "../assets/Building.png";
import { Search } from "../common/Search/Search";

export const Landing = () => {
  return (
    <section id="landing">
      <header>
        <div className="header__container">
          <div className="header__description">
            <h1>
              Most awarded <br /> car dealership platform
            </h1>
            <h2>
              Find your dream car with <span className="purple">FASTKAR</span>
            </h2>
            <Search />
          </div>
          <figure className="header__img--wrapper">
            <img src={Building} alt="Building" />
          </figure>
        </div>
      </header>
    </section>
  );
};
