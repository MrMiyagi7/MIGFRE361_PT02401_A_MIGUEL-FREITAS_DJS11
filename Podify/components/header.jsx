import React from "react";
import { NavLink, Link } from "react-router-dom";
import darklogo from "../src/assets/dark-logo.png";
import lightlogo from "../src/assets/light-logo.png";
import heart from "../src/assets/heart.svg";

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">
          <img src={lightlogo}></img>
        </Link>
        <input
          className="search-input"
          type="text"
          placeholder="What show are you looking for?"
        ></input>
        <Link to="/favourites">
          <p className="favourite-link">
            My favourites <img className="heart-icon" src={heart}></img>
          </p>
        </Link>
        <span className="user-icon">M</span>
      </nav>
    </header>
  );
}
