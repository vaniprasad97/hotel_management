import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  //hook is mocked using the jest.mock method, which replaces the actual
  //useNavigate hook with a mock implementation.
}));

describe("Header", () => {
  beforeEach(() => {
    localStorage.clear();
    // The beforeEach function clears the localStorage before each test is run.
  });

  test("renders the user's initials and name when logged in", () => {
    const user = { name: "John Doe" };
    localStorage.setItem("selectedUser", JSON.stringify(user));
    render(<Header />);
    const initials = screen.getByText(/jd/i);
    const name = screen.getByText(/john doe/i);
    expect(initials).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    //it tests the Header correctly renders the user's initials and name when the user is logged in
    // The screen.getByText retrieve the elements containing the user's initials and
    //name from the rendered Header component.
    //the expect statements verify that both the user's initials and name are present
    // in the rendered Header component using the toBeInTheDocument method.
  });

  test("renders the Logout button when logged in", () => {
    const user = { name: "John Doe" };
    localStorage.setItem("selectedUser", JSON.stringify(user));
    render(<Header />);
    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
    //it check if the component correctly renders the Logout button when the user is logged in.
    //the screen.getByText method locate the Logout button by searching for the text "logout".
    //The expect method verifies that the logoutButton is present in the document using toBeInTheDocument
  });

  test("does not render user initials and name when not logged in", () => {
    render(<Header />);
    const initials = screen.queryByText(/^[a-zA-Z]{2}$/);
    const name = screen.queryByText(/^[a-zA-Z]+ [a-zA-Z]+$/);
    expect(initials).toBeNull();
    expect(name).toBeNull();
    //verify that the component does not render the user's initials and name when the user is not logged in.
    //screen.queryByText method is to locate the user's initials and name.
    //The queryByText method is used instead of getByText method,as it returns null if the element is not found,
    //instead of throwing an error.
    //The expect method is used to verify that the initials and name variables are null using the toBeNull matche
  });

  test("does not render the Logout button when not logged in", () => {
    render(<Header />);
    const logoutButton = screen.queryByText(/logout/i);
    expect(logoutButton).toBeNull();
    //  to verify that the component does not render the Logout button when the user is not logged in.
    //The screen.queryByText method is then used to locate the Logout button in the rendered component by searching for the text "logout" using a regular expression.
    //The queryByText method is used instead of the getByText method,
    // as it returns null if the element is not found, instead of throwing an error
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
  //testing whether the signOut function is called when the Logout button is clicked.
  //It sets up a mock user object and mock signOut function and  mock useNavigate hook using
  // mockReturnValueOnce and returns the mock signOut function and  renders the Header component.
  //It gets the Logout button using screen.getByText and clicks it using fireEvent.click.
  //It checks that the mock signOut function was called using expect(signOutMock).toHaveBeenCalled().
});
