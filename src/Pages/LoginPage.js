import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userData from "../assets/Userdata.json";
import "../Styles/LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const user = userData.users.find(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.type === userType
    );
    if (user) {
      
      if (user.type === "admin") {
        navigate("/AdminPage");
      } else if (user.type === "user") {
        navigate("/UserPage");
      } else if (user.type === "hoteladmin") {
        navigate("/HotelAdminPage");
      }
      localStorage.setItem("selectedUser", JSON.stringify(user));
      console.log(user);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="Login">
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
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
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <label>
          User Type:
          <select
            value={userType}
            onChange={(event) => setUserType(event.target.value)}
          >
            <option value="">Select User Type</option>
            {userData.users.map((user) => (
              <option key={user.id} value={user.type}>
                {user.type}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default LoginPage;
