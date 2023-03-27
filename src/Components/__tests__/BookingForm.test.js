// import React from "react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import BookingForm from "../BookingForm";
// import instance from "../../axiosconfig";
// import { MemoryRouter } from "react-router-dom";

// describe("BookingForm", () => {
//   test("submits the form with valid data", async () => {
//     const loggedInUser = JSON.stringify({
//       id: 1,
//       name: "John Doe",
//       email: "johndoe@example.com",
//     });
//     localStorage.setItem("loggedInUser", loggedInUser);

//     render(
//       <MemoryRouter>
//         <BookingForm />
//       </MemoryRouter>
//     );

//     const submitButton = screen.getByRole("button", { name: "Submit" });
//     const nameInput = screen.getByLabelText("Name");
//     const emailInput = screen.getByLabelText("Email");
//     const checkInDateInput = screen.getByLabelText("Check In");
//     const checkOutDateInput = screen.getByLabelText("Check Out");

//     userEvent.type(nameInput, "John Doe");
//     userEvent.type(emailInput, "johndoe@example.com");
//     userEvent.type(checkInDateInput, "2022-04-01");
//     userEvent.type(checkOutDateInput, "2022-04-03");
//     userEvent.click(submitButton);

//     await waitFor(() => {
//       const successMessage = screen.getByText(
//         "Your booking has been confirmed!"
//       );
//       expect(successMessage).toBeInTheDocument();
//     });
//   });
// });
