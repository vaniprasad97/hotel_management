import { Routes, Route, MemoryRouter } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import AdminPage from "./Pages/AdminPage";
import UserPage from "./Pages/UserPage";
import HotelAdminPage from "./Pages/HotelAdminPage";
import HotelList from "./Components/Hotellist";
import AdminBookingPage from "./Components/AdminBookingPage";
import AddHotelAdmin from "./Components/AddHotelAdmin";
import ViewDetails from "./Pages/ViewDetails";
import BookingForm from "./Components/BookingForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/HotelAdminPage" element={<HotelAdminPage />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/Hotellist" element={<HotelList />} />
        <Route path="/AdminBookingPage" element={<AdminBookingPage />} />
        <Route path="/AddHotelAdmin" element={<AddHotelAdmin />} />
        <Route path="/ViewDetails/:id" element={<ViewDetails />} />
        <Route path="/BookingForm/:id" element={<BookingForm />} />
      </Routes>
    </div>
  );
}

export default App;
