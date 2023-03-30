import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import RegistrationForm from "../../Pages/RegistrationForm";
import { MemoryRouter } from "react-router-dom";

describe("RegistrationForm component", () => {
  test("submits user registration data", async () => {
    // Render the component
    const { getByLabelText, getByRole, getByText } = render(
      <MemoryRouter>
        {" "}
        <RegistrationForm />{" "}
      </MemoryRouter>
    );

    // Fill out the registration form
    fireEvent.change(getByLabelText("Username:"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Email:"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(getByLabelText("Password:"), {
      target: { value: "password123" },
    });
    fireEvent.change(getByLabelText("Confirm Password:"), {
      target: { value: "password123" },
    });

    fireEvent.click(getByRole("button"));

    // const errorMessage = screen.getByText("User Registered successfully");
    // expect(errorMessage).toBeInTheDocument();

    // await waitFor(() => expect(getByText(/errorMessage/i)).toBeInTheDocument());
    // const submitButton = screen.getByText(/Register/i);
  });
});
