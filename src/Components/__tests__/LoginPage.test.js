import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../../Pages/LoginPage";
import { MemoryRouter } from "react-router-dom";

describe("LoginPage", () => {
  test("allows a user to log in", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/user type/i), {
      target: { value: "user" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(
      screen.getByText(/invalid username or password or type/i)
    ).toBeInTheDocument();
  });

  test("displays error message for invalid login", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const userTypeSelect = screen.getByLabelText("User Type:");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "invaliduser" } });
    fireEvent.change(passwordInput, { target: { value: "invalidpassword" } });
    fireEvent.change(userTypeSelect, { target: { value: "admin" } });
    fireEvent.click(loginButton);

    const errorMessage = screen.getByText(
      "Invalid username or password or type"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
