import axios from "axios";

export const login = async (password) => {
  try {
    const response = await axios.post(
      "https://milk-master-demo.herokuapp.com/api/auth",
      {
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const isAuth = () => {
  if (localStorage.getItem("token")) {
    const token = JSON.parse(localStorage.getItem("token"));
    const now = new Date();
    if (now.getTime() > token.expires) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } else {
    return false;
  }
};
