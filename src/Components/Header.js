import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Header.css";
const Header = () => {
  const loggedInUser = localStorage.getItem("selectedUser");
  let firstWord;

  if (loggedInUser) {
    try {
      const userObj = JSON.parse(loggedInUser);
      console.log(userObj);
      firstWord = userObj.name.match(/\b(\w)/g).join("");
    } catch (error) {
      console.error("Error parsing user data from local storage:", error);
    }
  }

  const navigate = useNavigate();

  function signOut() {
    navigate("/");
  }

  return (
    <div>
      <header>
        <nav className="nav">
          {loggedInUser && <h3 onClick={signOut}>Logout</h3>}
          <ul className="nav-items">
            <li className="profile-pic">{firstWord}</li>
            <li className="profile-name">
              {loggedInUser && JSON.parse(loggedInUser).name}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
export default Header;
