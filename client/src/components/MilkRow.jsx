import React, { useState, useEffect } from "react";
import { Row, RowTitle, Input, Total } from "../styles/components";
import getTotal from "../util/getTotal";

const MilkRow = ({ milk, index, updateMilk }) => {
  const [total, setTotal] = useState(0);

  const handleChange = (e, what) => {
    const updatedMilk = { ...milk, [what]: Number(e.target.value) };
    updateMilk(index, updatedMilk);
  };

  useEffect(() => {
    const newTotal = getTotal(milk);
    setTotal(newTotal);
  }, [milk]);

  return (
    <Row style={{ color: `${milk.color}` }}>
      <RowTitle>{milk.name}</RowTitle>
      <Input
        type="number"
        min="0"
        inputMode="decimal"
        value={milk.stacks}
        onChange={(e) => handleChange(e, "stacks")}
      />
      <Input
        type="number"
        min="0"
        inputMode="decimal"
        value={milk.crates}
        onChange={(e) => handleChange(e, "crates")}
      />
      <Input
        type="number"
        min="0"
        // inputMode="decimal"
        value={milk.singles}
        onChange={(e) => handleChange(e, "singles")}
      />
      <Total>{total}</Total>
    </Row>
  );
};

export default MilkRow;
