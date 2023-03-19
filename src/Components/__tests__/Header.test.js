import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Header", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders the user's initials and name when logged in", () => {
    const user = { name: "John Doe" };
    localStorage.setItem("selectedUser", JSON.stringify(user));
    render(<Header />);
    const initials = screen.getByText(/jd/i);
    const name = screen.getByText(/john doe/i);
    expect(initials).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  test("renders the Logout button when logged in", () => {
    const user = { name: "John Doe" };
    localStorage.setItem("selectedUser", JSON.stringify(user));
    render(<Header />);
    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
  });

  test("does not render user initials and name when not logged in", () => {
    render(<Header />);
    const initials = screen.queryByText(/^[a-zA-Z]{2}$/);
    const name = screen.queryByText(/^[a-zA-Z]+ [a-zA-Z]+$/);
    expect(initials).toBeNull();
    expect(name).toBeNull();
  });

  test("does not render the Logout button when not logged in", () => {
    render(<Header />);
    const logoutButton = screen.queryByText(/logout/i);
    expect(logoutButton).toBeNull();
  });

  test("calls the signOut function when the Logout button is clicked", () => {
    const user = { name: "John Doe" };
    localStorage.setItem("selectedUser", JSON.stringify(user));
    const signOutMock = jest.fn();
    useNavigate.mockReturnValueOnce(signOutMock);
    render(<Header />);
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    expect(signOutMock).toHaveBeenCalled();
  });
});
