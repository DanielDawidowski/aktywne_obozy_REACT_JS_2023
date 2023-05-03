import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/app/login">Login</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
