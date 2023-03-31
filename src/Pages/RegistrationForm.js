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
    let validationErrors = [];

    // Validate username
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(username)) {
      validationErrors.push(
        "Username can only contain letters, numbers, underscores, and dashes."
      );
    }

    // Validate password
    if (password.length < 3) {
      validationErrors.push("Password must be at least 5 characters long.");
    }
    if (password === username) {
      validationErrors.push("Password cannot be the same as username.");
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      validationErrors.push("Passwords do not match.");
    }

    // Check if user already exists
    instance
      .get("/users")
      .then((response) => {
        const users = response.data;
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
          validationErrors.push("Username already exists.");
        }

        // If there are validation errors, display them and prevent form submission
        if (validationErrors.length > 0) {
          setError(validationErrors.join(" "));
          return;
        }

        // If all validations pass, submit the data to the API
        const data = {
          username: username,
          type: "user",
          username,
          password: encrypt(confirmPassword),
          name: email,
        };
        instance
          .post("/users", data)
          .then((response) => {
            setError("User Registered successfully");
          })
          .catch((error) => {
            setError("Error registering:", error);
          });
      })
      .catch((error) => {
        setError("Error checking if user already exists:", error);
      });
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
          enter your name:
          <input
            type="text"
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
