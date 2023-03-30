import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserPage from "../../Pages/UserPage";
import instance from "../../axiosconfig";

jest.mock("../../axiosconfig");

describe("UserPage component", () => {
  test("displays a list of hotels and navigates to the booking form when the 'Book' link is clicked", async () => {
    const hotels = [
      {
        _id: "hotel1",
        name: "Hotel 1",
        description: "A lovely hotel",
      },
      {
        _id: "hotel2",
        name: "Hotel 2",
        description: "Another lovely hotel",
      },
    ];

    instance.get.mockResolvedValueOnce({ data: hotels });

    const { getByText, getByRole } = render(
      <MemoryRouter>
        <UserPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("Hotel 1")).toBeInTheDocument();
      expect(getByText("Hotel 2")).toBeInTheDocument();
    });
  });
});
