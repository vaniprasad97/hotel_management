import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginPage.css";
import instance from "../axiosconfig";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [userData, setuserData] = useState([]);
  console.log(userData);
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get("/users")
      .then((response) => {
        setuserData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching hotels", error);
      });
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    const user = userData[0].users.find(
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
        localStorage.setItem("UserId", JSON.stringify(user.id));
        navigate("/HotelAdminPage");
      }
      localStorage.setItem("selectedUser", JSON.stringify(user));
    } else {
      setError("Invalid username or password or type");
    }

    // The function then checks whether the entered username, password,
    //and userType match with any user data in the userData.users array using the find() method
    // If a user is found with matching credentials and type,
    //the function uses the navigate()  to redirect the user to the appropriate page based on their user type.
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8&w=1000&q=80")',
      }}
    >
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
              {userData.length > 0 &&
                userData[0].users.map((user) => (
                  <option key={user.id} value={user.type}>
                    {user.type}
                  </option>
                ))}
            </select>
          </label>
          <br />
          <button className="loginbutton" type="submit">
            Login
          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default LoginPage;
