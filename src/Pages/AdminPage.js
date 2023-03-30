import React from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <div>
      <Header data-testid="header" />

      {/* to be noted */}
      <h1>Welcome to AdminPage</h1>
      <table>
        <thead>
          <tr>
            <th>Functionality</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>To see the list of hotels -- add and delete operations.</td>
            <td>
              <Link to="/Hotellist" relative="path">
                Click here
              </Link>
            </td>
          </tr>
          <tr>
            <td>To see the user bookings</td>
            <td>
              <Link to="/AdminBookingPage" relative="path">
                Click here
              </Link>
            </td>
          </tr>
          <tr>
            <td>To Manage Hotel Admin</td>
            <td>
              <Link to="/AddHotelAdmin" relative="path">
                Click here
              </Link>
            </td>
          </tr>
          <tr>
            <td>Add new users as Admin</td>
            <td>
              <Link to="/AddnewUser" relative="path">
                Click here
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
