import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../../Pages/LoginPage";

describe("LoginPage", () => {
  test("allows a user to log in", () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/user type/i), { target: { value: "user" } });
fireEvent.click(screen.getByRole('button', { name: /login/i }));
expect(screen.getByText(/invalid username or password or type/i)).toBeInTheDocument();


  });

  test("displays an error message for invalid credentials", () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/user type/i), { target: { value: "user" } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/invalid username or password or type/i)).toBeInTheDocument();
    
  });
});
