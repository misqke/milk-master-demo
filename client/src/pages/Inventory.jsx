import React, { useEffect, useState } from "react";
import { isAuth } from "../actions/auth";
import { submitInventory, getConfirmation } from "../actions/submits";
import { useNavigate } from "react-router-dom";
import InventoryRow from "../components/InventoryRow";
import { getAllMilks } from "../actions/milks";
import { colors } from "../utils/colors";
import { useSelector } from "react-redux";

const Inventory = () => {
  // navigation
  const navigate = useNavigate();

  // states
  const [milks, setMilks] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [view, setView] = useState("all");
  const inventoryList = useSelector((state) => state.inventory);

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setView("all");
    setMessage(
      "Submitting inventory... This may take a few moments... Do not refresh or close browser...."
    );
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    const submission = {
      milks: [],
    };
    inventoryList.forEach((milk, i) => {
      const total = Math.floor(
        Number(milk.shelf) + Number(milk.crates) * milks[i].multiplier
      );
      submission.milks.push(total);
    });
    const data = await submitInventory(submission);
    if (data.error) {
      console.log(data.error);
      setMessage("");
      setError(data.error);
    } else {
      setMessage(data.msg);
      const getImage = setInterval(async () => {
        const data = await getConfirmation(1);
        if (data.data) {
          setUrl(data.data);
          setMessage(data.msg);
          clearInterval(getImage);
        } else if (data.error) {
          setMessage("");
          setError(data.error);
          clearInterval(getImage);
        } else {
          setMessage(data.msg);
        }
      }, 15000);
    }
  };

  const handleViewClick = (col) => {
    return () => {
      setView(col);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
  };

  // use effects
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

  if (message) {
    return (
      <div className="container d-flex justify-content-center flex-column py-3 align-items-center">
        <h3 className="text-primary text-center py-3">{message}</h3>
        {url && <img src={`data:image/png;base64,${url}`} alt="confirmation" />}
      </div>
    );
  }

  if (!message) {
    return (
      <div className="container py-2 px-3 bg-dark">
        <div
          className="row py-1 d-flex justify-content-evenly flex-wrap sticky-top bg-dark"
          style={{ zIndex: "100" }}
        >
          {colors.map((color) => (
            <button
              key={color.code}
              onClick={handleViewClick(color.color)}
              className="btn col-2 py-2 me-1 my-1"
              style={{ background: `${color.code}`, height: "30px" }}
            ></button>
          ))}
          <button
            onClick={handleViewClick("all")}
            className="btn col-2 py-2 me-1 my-1"
            style={{
              background: `linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)`,
              height: "30px",
            }}
          ></button>
        </div>
        {error && <h3 className="alert alert-danger">{error}</h3>}
        <div className="d-flex justify-content-between my-2">
          <h2 className="text-white my-auto">Inventory</h2>
        </div>
        {milks &&
          milks.map((milk, i) => {
            return view === "all" ? (
              <InventoryRow milk={milk} key={milk._id} index={i} />
            ) : (
              milk.color === view && (
                <InventoryRow milk={milk} key={milk._id} index={i} />
              )
            );
          })}
        <form className="container my-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-primary" htmlFor="username">
              Deans Login
            </label>
            <input
              className="form-control bg-dark text-white"
              type="text"
              id="username"
              value={username}
              placeholder="NOT REQUIRED"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-primary" htmlFor="password">
              Deans Password
            </label>
            <input
              className="form-control bg-dark text-white"
              type="password"
              id="password"
              value={password}
              placeholder="NOT REQUIRED"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" type="submit">
              Submit Inventory
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default Inventory;
