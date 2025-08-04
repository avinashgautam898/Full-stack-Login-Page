import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const url = isLogin ? "/login" : "/register";
    try {
      const res = await axios.post(`http://localhost:5000${url}`, form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="inputField"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="inputField"
      />
      <button onClick={handleSubmit} className="actionBtn">
        {isLogin ? "Login" : "Register"}
      </button>
      <p onClick={() => setIsLogin(!isLogin)} className="toggleText">
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </p>
    </div>
  );
}

export default App;
