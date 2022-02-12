import React, { useState, useEffect } from "react";
import { getColor } from "../utils/colors";
import { useSelector, useDispatch } from "react-redux";
import { updateShelf, updateCrates } from "../redux/inventorySlice";

const InventoryRow = ({ milk, index }) => {
  const dispatch = useDispatch();
  const shelf = useSelector((state) => state.inventory[index].shelf);
  const crates = useSelector((state) => state.inventory[index].crates);
  const [total, setTotal] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const updateTotal = () => {
      const shelfVal = Math.floor(Number(shelf));
      const cratesVal = Math.floor(Number(crates) * milk.multiplier);
      setTotal((shelfVal + cratesVal).toString());
    };
    updateTotal();
  }, [shelf, crates, milk.multiplier]);

  useEffect(() => {
    setColor(getColor(milk.color));
  }, [milk.color]);

  return (
    <div
      className="row mb-2 pt-2 pb-3 justify-content-evenly"
      style={{
        background: `linear-gradient(${color}, ${color} 18%, #333 35%, #222)`,
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
      <hr className="mb-2" />
      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
        <div className="col-10 text-center text-white">Shelf</div>
        <input
          className="col-10 text-center fs-5 rounded text-white bg-dark"
          type="text"
          min="0"
          inputMode="decimal"
          value={shelf}
          onChange={(e) =>
            dispatch(updateShelf({ index, value: Math.floor(e.target.value) }))
          }
          style={{ height: "35px" }}
        />
      </div>
      <div className="col-4 d-flex flex-column justify-content-center align-items-center">
        <div className="col-10 text-center text-white">Crates</div>
        <input
          className="col-10 text-center fs-5 rounded text-white bg-dark"
          type="text"
          min="0"
          inputMode="decimal"
          value={crates}
          onChange={(e) =>
            dispatch(updateCrates({ index, value: e.target.value }))
          }
          style={{ height: "35px" }}
        />
      </div>
      <div className="col-2 d-flex flex-column justify-content-center align-items-center">
        <div
          className={`col-12 text-center h1`}
          id={`total${milk._id}`}
          style={{ color: `${color}` }}
        >
          {total}
        </div>
      </div>
    </div>
  );
};

export default InventoryRow;
