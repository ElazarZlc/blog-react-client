import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");



  const navigate = useNavigate();

  async function handleLogin(e){
    e.preventDefault();
    const user = {name: name, password: password}
    try {
      await axios.post("http://localhost:8081/users", user);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
    navigate(`${name}`);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
