import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios"; // Import axios mock
import AddnewUser from "../../Pages/AddnewUser";
import instance from "../../axiosconfig";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../axiosconfig"); // create Mock axios

describe("AddnewUser", () => {
  test("adds a new hotel admin successfully", async () => {
    instance.get.mockResolvedValue({
      data: [{ _id: "1", hotelName: "hotel1", name: "Hotel 1" }],
    });
    instance.post.mockResolvedValue({}); // create a mock axios and post the data.

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <AddnewUser />{" "}
      </MemoryRouter>
    );

    // Wait for hotels to be fetched and loaded into the select dropdown
    await waitFor(() =>
      expect(getByLabelText("Select a hotel:")).toHaveTextContent("Hotel 1")
    );

    // Fill out form fields
    fireEvent.change(getByLabelText("Username:"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Select a hotel:"), {
      target: { value: "hotel1" },
    });

    // Submit form
    fireEvent.submit(getByText("Add Hotel Admin"));

    // Wait for success message to appear
    await waitFor(() =>
      expect(getByText("Hotel admin added successfully")).toBeInTheDocument()
    );

    // Check that form fields are reset
    expect(getByLabelText("Username:")).toHaveValue("");

    // Check that axios was called with the correct data
    expect(instance.post).toHaveBeenCalledWith("/assignhotel", {
      username: "testuser",
      hotelName: "hotel1",
    });
  });
});
