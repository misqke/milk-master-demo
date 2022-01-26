import axios from "axios";

export const getAllMilks = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      "https://milk-master.herokuapp.com/api/milks",
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const updateMilk = async (milk) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.patch(
      "https://milk-master.herokuapp.com/api/milks",
      milk,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
