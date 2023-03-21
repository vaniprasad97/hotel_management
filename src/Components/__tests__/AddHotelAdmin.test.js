import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import AddHotelAdmin from "../AddHotelAdmin";

describe("AddHotelAdmin component", () => {
  const hotels = [    { id: 1, name: "Hotel A" },    { id: 2, name: "Hotel B" },    { id: 3, name: "Hotel C" },  ];

  const hotelAdmins = {
    users: [
      { id: 1, username: "admin1" },
      { id: 2, username: "admin2" },
      { id: 3, username: "admin3" },
    ],
  };

 

  test("renders AddHotelAdmin component", async () => {
    render(
      <Router>
        <AddHotelAdmin />
      </Router>
    );

    expect(screen.getByText("Back to Admin home page")).toBeInTheDocument();

    // Wait for hotels to be loaded
    await waitFor(() =>
      expect(screen.getByText("Select a hotel:")).toBeInTheDocument()
    );
    expect(screen.getByText("Select a hotel:")).toBeInTheDocument();

    expect(screen.getByText("Select a hotel admin:")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("displays success message when hotel is assigned", async () => {
    

    render(
      <Router>
        <AddHotelAdmin />
      </Router>
    );

    // Wait for hotels to be loaded
    await waitFor(() =>
      expect(screen.getByText("Select a hotel:")).toBeInTheDocument()
    );

    fireEvent.change(screen.getByLabelText("Select a hotel:"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText("Select a hotel admin:"), {
      target: { value: "3" },
    });
  
  });
});
