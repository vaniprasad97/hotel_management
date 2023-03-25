import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import AdminPage from "./Pages/AdminPage";
import UserPage from "./Pages/UserPage";
import HotelAdminPage from "./Pages/HotelAdminPage";
import HotelList from "./Components/Hotellist";
import AdminBookingPage from "./Components/AdminBookingPage";
import AddHotelAdmin from "./Components/AddHotelAdmin";
import ViewDetails from "./Pages/ViewDetails";
import BookingForm from "./Components/BookingForm";
import RoomList from "./Pages/RoomList";
import BookingDetails from "./Pages/BookingDetails";
import HotelAdminlist from "./Pages/HotelAdminlist";
import AddnewUser from "./Pages/AddnewUser";
import AddUsers from "./Pages/AddUsers";
import HotelAdminBookingDetails from "./Pages/HotelAdminBookingDetails";
import Add from "./Pages/Add";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/AdminPage"
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/HotelAdminPage"
          element={
            <ProtectedRoute>
              <HotelAdminPage />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/Hotellist" element={<HotelList />} />
        <Route path="/AdminBookingPage" element={<AdminBookingPage />} />
        <Route path="/AddHotelAdmin" element={<AddHotelAdmin />} />
        <Route path="/ViewDetails/:id" element={<ViewDetails />} />
        <Route path="/BookingForm/:id" element={<BookingForm />} />
        <Route path="/RoomList" element={<RoomList />} />
        <Route path="/Addnewuser" element={<AddnewUser />} />
        <Route path="/BookingDetails" element={<BookingDetails />} />
        <Route path="/HotelAdminList" element={<HotelAdminlist />} />
        <Route path="/AddUsers" element={<AddUsers />} />
        <Route path="/Add" element={<Add />} />

        <Route
          path="/HotelAdminBookingDetails"
          element={<HotelAdminBookingDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;

function ProtectedAdminRoute({ children, ...rest }) {
  const userAuth = JSON.parse(localStorage.getItem("selectedUser"));

  if (
    userAuth &&
    userAuth.username &&
    userAuth.username.length > 0 &&
    userAuth.type === "admin"
  ) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
function ProtectedRoute({ children, ...rest }) {
  const userAuth = JSON.parse(localStorage.getItem("selectedUser"));

  if (
    userAuth &&
    userAuth.username &&
    userAuth.username.length > 0 &&
    userAuth.type === "hoteladmin"
  ) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
