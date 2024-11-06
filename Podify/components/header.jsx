import React from "react";
import { NavLink, Link } from "react-router-dom";
import darklogo from "../src/assets/dark-logo.png";
import lightlogo from "../src/assets/light-logo.png";

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
        <span className="user-icon">M</span>
      </nav>
    </header>
  );
}
