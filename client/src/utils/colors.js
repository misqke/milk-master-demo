export const colors = [
  {
    color: "blue",
    code: "#2939E6",
  },
  {
    color: "lt blue",
    code: "#72B0F7",
  },
  {
    color: "red",
    code: "#E02222",
  },
  {
    color: "yellow",
    code: "#F2EF16",
  },
  {
    color: "green",
    code: "#15BD2B",
  },
  {
    color: "lt green",
    code: "#35F03B",
  },
  {
    color: "brown",
    code: "#8b4513",
  },
  {
    color: "lt brown",
    code: "#ba8759",
  },
  {
    color: "orange",
    code: "#F59918",
  },
  {
    color: "purple",
    code: "#A259E3",
  },
];

export const getColor = (word) => {
  let code = "#ddd";
  colors.forEach((color) => {
    if (color.color === word) {
      code = color.code;
      return code;
    }
  });
  return code;
};
