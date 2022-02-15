import React, { useState } from "react";
import { login } from "../actions/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(password);
    if (data.error) {
      setError(data.error);
    } else {
      const now = new Date();
      const token = {
        value: data.data,
        expires: now.getTime() + 14400000,
      };
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/");
    }
  };

  return (
    <div className="container col-12 col-md-8 col-lg-6">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label text-light mb-3" htmlFor="password">
            enter password to continue
          </label>
          <input
            className="form-control mb-3 bg-dark text-white"
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <p className="text-white mt-4">Password: password</p>
    </div>
  );
};

export default Login;
