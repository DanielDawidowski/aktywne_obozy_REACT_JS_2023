import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>home</h1>
      <Link to="/events">events</Link>
    </div>
  );
}

export default Home;
