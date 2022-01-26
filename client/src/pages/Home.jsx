import React, { useEffect } from "react";
import { isAuth } from "../actions/auth";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container w-100 h-100 d-flex flex-column gap-4 align-items-center justify-content-center px-4 pb-2 py-5">
      <Link to="/inventory" className="btn btn-primary py-2 w-100">
        Inventory
      </Link>
      <Link to="/order" className="btn btn-primary py-2 w-100">
        Order
      </Link>
      <Link to="/milks" className="btn btn-primary py-2 w-100">
        Milk List
      </Link>
    </div>
  );
};

export default Home;
