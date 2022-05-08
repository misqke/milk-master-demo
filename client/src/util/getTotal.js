const getTotal = (milk) => {
  const stackMultiplier = 6;
  const stacksTotal = milk.stacks * stackMultiplier * milk.crateMultiplier;
  const crateTotal = milk.crates * milk.crateMultiplier;
  const newTotal = stacksTotal + crateTotal + Number(milk.singles);
  return newTotal;
};

export default getTotal;
