import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ViewDetails from "../../Pages/ViewDetails";

describe("ViewDetails", () => {
  const hotel = {
    _id: "hotel123",
    name: "Test Hotel",
    description: "Test Description",
    location: "Test Location",
  };

  it("should render hotel details", async () => {
    render(
      <MemoryRouter>
        <ViewDetails />
      </MemoryRouter>
    );
    expect(screen.getByText(hotel.description)).toBeInTheDocument();
    expect(screen.getByText(hotel.location)).toBeInTheDocument();
  });
});
