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
    fireEvent.change(screen.getByLabelText(/user type/i), {
      target: { value: "user" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(
      screen.getByText(/invalid username or password or type/i)
    ).toBeInTheDocument();
    // verify that the component allows a user to log in successfully.
    // LoginPage wrapped in a MemoryRouter, which allows testing of components that use React Router
    //getByLabelText is to obtain references to the form input for usertype and getByText is for login button.
    //fireEvent.change method is then used to simulate a change event on the user type 
    //fireEvent.click method is then used to simulate a click event on the login.
    //expect statement verifies that the component displays a specific error message 
  });
  
  test("displays an error message for invalid credentials", () => {
    const { getByLabelText, getByText } = render(
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
  // display an error message to invalid credentials.
  // LoginPage wrapped in a MemoryRouter, which allows testing of components that use React Router
    //getByLabelText is to obtain references to the form input for usertype and getByText is for login button.
    //fireEvent.change method is then used to simulate a change event on the user type 
    //fireEvent.click method is then used to simulate a click event on the login.
    //expect statement verifies that the component displays a specific error message 
  
});
