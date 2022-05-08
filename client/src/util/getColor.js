const getcolor = (milkName) => {
  const name = milkName.toLowerCase();
  if (name.includes("homo") || name.includes("punch")) {
    return "#f00";
  } else if (name.includes("choc")) {
    return "#8b4513";
  } else if (
    name.includes("tea") ||
    name.includes("butter") ||
    name.includes("btr") ||
    name.includes("rasp") ||
    name.includes("lemon")
  ) {
    return "#4f4";
  } else if (name.includes("2%")) {
    return "#00f";
  } else if (name.includes("1%")) {
    return "#ff0";
  } else if (name.includes("fat")) {
    return "#99f";
  } else if (name.includes("or")) {
    return "#f90";
  } else {
    return "#fff";
  }
};

export default getcolor;
