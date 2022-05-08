import React, { useState, useEffect } from "react";
import { Row, RowTitle, Input, Total } from "../styles/components";
import getTotal from "../util/getTotal";

const MilkRow = ({ milk, index, updateMilk }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = getTotal(milk);
    setTotal(newTotal);
  }, [milk]);

  return (
    <Row style={{ color: `${milk.color}` }}>
      <RowTitle>{milk.name}</RowTitle>
      <Input
        type="text"
        min="0"
        inputMode="decimal"
        value={milk.stacks}
        onChange={(e) =>
          updateMilk(index, {
            name: milk.name,
            crateMultiplier: milk.crateMultiplier,
            stacks: Number(e.target.value),
            crates: milk.crates,
            singles: milk.singles,
          })
        }
      />
      <Input
        type="text"
        min="0"
        inputMode="decimal"
        value={milk.crates}
        onChange={(e) =>
          updateMilk(index, {
            name: milk.name,
            crateMultiplier: milk.crateMultiplier,
            stacks: milk.stacks,
            crates: Number(e.target.value),
            singles: milk.singles,
          })
        }
      />
      <Input
        type="text"
        min="0"
        inputMode="decimal"
        value={milk.singles}
        onChange={(e) =>
          updateMilk(index, {
            name: milk.name,
            crateMultiplier: milk.crateMultiplier,
            stacks: milk.stacks,
            crates: milk.crates,
            singles: Number(e.target.value),
          })
        }
      />
      <Total>{total}</Total>
    </Row>
  );
};

export default MilkRow;
