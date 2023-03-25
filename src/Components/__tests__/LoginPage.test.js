import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../../Pages/LoginPage";

describe("LoginPage", () => {
  test("renders the login form", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const userTypeInput = screen.getByLabelText("User Type:");
    const loginButton = screen.getByText("Login");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(userTypeInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  test("shows error message with invalid credentials", async () => {
    const userData = {
      users: [
        {
          id: 1,
          username: "testuser",
          password: "testpass",
          type: "user",
        },
      ],
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(userData),
    });
    const { container } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const userTypeInput = screen.getByLabelText("User Type:");
    const loginButton = screen.getByText("Login");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpass" } });
    fireEvent.change(userTypeInput, { target: { value: "user" } });
    fireEvent.click(loginButton);
    await screen.findByText("Invalid username or password or type");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/users");
    expect(container.querySelector(".error")).toHaveTextContent(
      "Invalid username or password or type"
    );
  });
});
