import React, { useState } from "react";
import axios from "axios";
const Login = () => {
  const [emailId, setEmailId] = useState("sobhandip.sam@gmail.com");
  const [password, setPassword] = useState("Admin@123");

  const handleLogin = async () => {
    try {
      const loginRes = await axios.post("http://localhost:3000/login", {
        emailId,
        password,
      },{
        withCredentials:true
      });
    } catch (err) {
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
