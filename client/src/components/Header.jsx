import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center py-2 pt-4 bg-dark sticky-top"
      style={{ zIndex: "99" }}
    >
      <Link
        to="/"
        className="h1 text-white font-monospace"
        style={{
          textDecoration: "none",
        }}
      >
        Milk Master DEMO
      </Link>
    </div>
  );
};

export default Header;
