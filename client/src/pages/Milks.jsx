import React, { useState, useEffect } from "react";
import { isAuth } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { getAllMilks } from "../actions/milks";
import EditRow from "../components/EditRow";

const Milks = () => {
  const navigate = useNavigate();
  const [milks, setMilks] = useState([]);

  useEffect(() => {
    if (!isAuth()) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const getMilks = async () => {
      const data = await getAllMilks();
      setMilks(data.data);
    };
    getMilks();
  }, []);

  return (
    <div className="container col-12 col-md-8 col-lg-6 py-2 px-3 bg-dark">
      <div className="d-flex justify-content-between flex-column my-2">
        <h2 className="text-white my-auto">Milk List</h2>
        {milks &&
          milks.map((milk) => {
            return <EditRow milk={milk} key={milk._id} />;
          })}
      </div>
    </div>
  );
};

export default Milks;
