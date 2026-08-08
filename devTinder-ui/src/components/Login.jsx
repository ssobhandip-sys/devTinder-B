import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("elon.sam@gmail.com");
  const [password, setPassword] = useState("Admin@123");
  const [error,setError]=useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginRes = await axios.post(
        API_BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(loginRes);
      dispatch(addUser(loginRes.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset my-2">
              <label className="label" htmlFor="name">
                Email ID
              </label>
              <input
                type="text"
                value={emailId}
                id="name"
                className="input"
                placeholder="Name"
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <label className="label" htmlFor="name">
                Password
              </label>
              <input
                type="text"
                value={password}
                id="name"
                className="input"
                placeholder="Name"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
