// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import HotelList from "../Hotellist";
// import { MemoryRouter } from "react-router-dom";

// describe("HotelList", () => {
//   it("should render the HotelList component", async () => {
//     const { getByTestId, debug } = render(
//       <MemoryRouter>
//         <HotelList />
//       </MemoryRouter>
//     );
//     await Promise.resolve(); // wait for component to render
//     debug(); // outputs the HTML of the rendered component to the console
//     const hotelList = getByTestId("hotel-list");
//     expect(hotelList).toBeInTheDocument();
//   });

//   it("should return an empty object if all fields are filled", async () => {
//     const { getByTestId } = render(
//       <MemoryRouter>
//         <HotelList />
//       </MemoryRouter>
//     );
//     await Promise.resolve(); // wait for component to render
//     const hotelList = getByTestId("hotel-list");
//     const nameInput = getByTestId("name-input");
//     const descriptionInput = getByTestId("description-input");
//     const locationInput = getByTestId("location-input");
//     const addButton = getByTestId("add-button");

//     fireEvent.change(nameInput, { target: { value: "New Hotel" } });
//     fireEvent.change(descriptionInput, {
//       target: { value: "New description" },
//     });
//     fireEvent.change(locationInput, { target: { value: "New location" } });
//     fireEvent.click(addButton);

//     expect(hotelList).toHaveTextContent("New Hotel");
//     expect(hotelList).toHaveTextContent("New description");
//     expect(hotelList).toHaveTextContent("New location");
//     expect(nameInput).toHaveValue("");
//     expect(descriptionInput).toHaveValue("");
//     expect(locationInput).toHaveValue("");
//   });

//   it("should return an object with an error message if a field is empty", () => {
//     const { getByTestId } = render(
//       <MemoryRouter>
//         <HotelList />
//       </MemoryRouter>
//     );
//     const hotelList = getByTestId("hotel-list");
//     const nameInput = getByTestId("name-input");
//     const descriptionInput = getByTestId("description-input");
//     const locationInput = getByTestId("location-input");
//     const addButton = getByTestId("add-button");

//     fireEvent.change(nameInput, { target: { value: "New Hotel" } });
//     fireEvent.change(descriptionInput, { target: { value: "" } });
//     fireEvent.change(locationInput, { target: { value: "New location" } });
//     fireEvent.click(addButton);

//     expect(hotelList).not.toHaveTextContent("New Hotel");
//     expect(hotelList).not.toHaveTextContent("New description");
//     expect(hotelList).not.toHaveTextContent("New location");
//     expect(nameInput).toHaveValue("New Hotel");
//     expect(descriptionInput).toHaveValue("");
//     expect(locationInput).toHaveValue("New location");
//   });

//   it("should add a new hotel to the list of hotels if all fields are filled and the name is unique", () => {
//     const { getByTestId } = render(
//       <MemoryRouter>
//         <HotelList />
//       </MemoryRouter>
//     );
//     const hotelList = getByTestId("hotel-list");
//     const nameInput = getByTestId("name-input");
//     const descriptionInput = getByTestId("description-input");
//     const locationInput = getByTestId("location-input");
//     const addButton = getByTestId("add-button");
//     fireEvent.change(nameInput, { target: { value: "New Hotel" } });
//     fireEvent.change(descriptionInput, {
//       target: { value: "New description" },
//     });
//     fireEvent.change(locationInput, { target: { value: "New location" } });
//     fireEvent.click(addButton);

//     expect(hotelList).toHaveTextContent("New Hotel");
//     expect(hotelList).toHaveTextContent("New description");
//     expect(hotelList).toHaveTextContent("New location");
//     expect(nameInput).toHaveValue("");
//     expect(descriptionInput).toHaveValue("");
//     expect(locationInput).toHaveValue("");

//     fireEvent.change(nameInput, { target: { value: "New Hotel 2" } });
//     fireEvent.change(descriptionInput, {
//       target: { value: "New description 2" },
//     });
//     fireEvent.change(locationInput, { target: { value: "New location 2" } });
//     fireEvent.click(addButton);

//     expect(hotelList).toHaveTextContent("New Hotel 2");
//     expect(hotelList).toHaveTextContent("New description 2");
//     expect(hotelList).toHaveTextContent("New location 2");
//     expect(nameInput).toHaveValue("");
//     expect(descriptionInput).toHaveValue("");
//     expect(locationInput).toHaveValue("");
//   });

//   it("should display an error message if the name of the new hotel is not unique", () => {
//     const { getByTestId } = render(
//       <MemoryRouter>
//         <HotelList />
//       </MemoryRouter>
//     );
//     const hotelList = getByTestId("hotel-list");
//     const nameInput = getByTestId("name-input");
//     const descriptionInput = getByTestId("description-input");
//     const locationInput = getByTestId("location-input");
//     const addButton = getByTestId("add-button");
//     fireEvent.change(nameInput, { target: { value: "New Hotel" } });
//     fireEvent.change(descriptionInput, {
//       target: { value: "New description" },
//     });
//     fireEvent.change(locationInput, { target: { value: "New location" } });
//     fireEvent.click(addButton);

//     expect(hotelList).toHaveTextContent("New Hotel");
//     expect(hotelList).toHaveTextContent("New description");
//     expect(hotelList).toHaveTextContent("New location");
//     expect(nameInput).toHaveValue("");
//     expect(descriptionInput).toHaveValue("");
//     expect(locationInput).toHaveValue("");

//     fireEvent.change(nameInput, { target: { value: "New Hotel" } });
//     fireEvent.change(descriptionInput, {
//       target: { value: "New description 2" },
//     });
//     fireEvent.change(locationInput, { target: { value: "New location 2" } });
//     fireEvent.click(addButton);

//     expect(hotelList).not.toHaveTextContent("New Hotel 2");
//     expect(hotelList).not.toHaveTextContent("New description 2");
//     expect(hotelList).not.toHaveTextContent("New location 2");
//     expect(nameInput).toHaveValue("New Hotel");
//     expect(descriptionInput).toHaveValue("New description 2");
//     expect(locationInput).toHaveValue("New location 2");
//     expect(hotelList).toHaveTextContent(
//       "A hotel with the same name already exists."
//     );
//   });
// });
