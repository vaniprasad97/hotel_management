import React, { useState } from "react";
import "../Styles/LoginPage.css";
import instance from "../axiosconfig";
import { encrypt } from "../utlis/encrypt";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: username,
      type: "user",
      username,
      password: encrypt(password),
    };
    instance
      .post("/users", data)
      .then((response) => {
        setError("User Registered successfully");
      })
      .catch((error) => {
        setError("Error registering:", error);
      });
    // while submitting the form. it will post all the details to the user api. where username is the userinput that
    // stored in a state username. pass the type default as user and password.
  };
  return (
    <div className="registration-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default RegistrationForm;
