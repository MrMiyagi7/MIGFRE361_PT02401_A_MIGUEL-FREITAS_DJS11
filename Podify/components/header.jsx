import React from "react";
import { NavLink } from "react-router-dom";
import darklogo from "../src/assets/dark-logo.png";
import lightlogo from "../src/assets/light-logo.png";

export default function Header() {
  return (
    <header>
      <nav>
        <img src={lightlogo}></img>
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
