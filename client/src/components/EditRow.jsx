import React, { useState, useEffect } from "react";
import { getColor } from "../utils/colors";
import { updateMilk } from "../actions/milks";

const EditRow = ({ milk }) => {
  const [initialColor, setInitialcolor] = useState(milk.color);
  const [initialMultiplier, setInitialMultiplier] = useState(milk.multiplier);
  const [multiplier, setMultiplier] = useState(milk.multiplier);
  const [color, setColor] = useState(milk.color);
  const [colorCode, setColorCode] = useState(getColor(milk.color));
  const colorList = [
    "blue",
    "lt blue",
    "red",
    "yellow",
    "green",
    "lt green",
    "brown",
    "lt brown",
    "orange",
    "purple",
  ];

  const handleUpdate = async () => {
    const newMilk = {
      _id: milk._id,
      color,
      multiplier,
    };
    const data = await updateMilk(newMilk);
    setInitialMultiplier(data.data.multiplier);
    setInitialcolor(data.data.color);
  };

  useEffect(() => {
    setColorCode(getColor(color));
  }, [color]);

  return (
    <div
      className="row mb-2 pt-2 pb-3 justify-content-evenly"
      style={{
        background: `linear-gradient(${colorCode}, ${colorCode} 18%, #333 35%, #222)`,
      }}
    >
      <div className="col-12">
        <h4
          className="my-auto pb-2"
          style={{ color: "#ddd", textShadow: "2px 2px 2px #000" }}
        >
          {milk.name}
        </h4>
      </div>
      <hr />
      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
        <div className="col-10 text-center text-white">per crate</div>
        <input
          className="col-10 text-center fs-5 rounded text-white bg-dark"
          type="text"
          min="0"
          inputMode="decimal"
          value={multiplier}
          onChange={(e) => setMultiplier(e.target.value)}
          style={{ height: "35px" }}
        />
      </div>
      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
        <div className="col-10 text-center text-white">Color</div>
        <select
          className="form-select text-center col-10 bg-dark"
          onChange={(e) => setColor(e.target.value)}
          style={{ height: "35px", color: `${colorCode}` }}
          value={color}
        >
          {colorList.map((singleColor) => (
            <option
              key={singleColor}
              value={singleColor}
              style={{ color: `${getColor(singleColor)}` }}
            >
              {singleColor}
            </option>
          ))}
        </select>
      </div>
      {multiplier !== initialMultiplier || color !== initialColor ? (
        <div className="col-2 d-flex align-items-end justify-content-center">
          <button
            className="btn rounded-circle"
            style={{ borderColor: `${colorCode}` }}
            onClick={handleUpdate}
          >
            <i
              className="bi bi-cloud-arrow-up-fill"
              style={{ color: `${colorCode}` }}
            />
          </button>
        </div>
      ) : (
        <div className="col-2"></div>
      )}
    </div>
  );
};

export default EditRow;
