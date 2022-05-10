const getTotal = (milk) => {
  const stackMultiplier = 6;
  const stacksTotal = Math.floor(
    milk.stacks * stackMultiplier * milk.crateMultiplier
  );
  const crateTotal = Math.floor(milk.crates * milk.crateMultiplier);
  const newTotal = stacksTotal + crateTotal + milk.singles;
  return newTotal;
};

export default getTotal;
