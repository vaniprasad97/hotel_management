import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import Add from "../../Pages/Add";
import instance from "../../axiosconfig";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../axiosconfig");

describe("Add component", () => {
  beforeEach(() => {
    instance.post.mockResolvedValue({});
  });

  it("renders the component", () => {
    const { getByText } = render(<Add />);
    expect(getByText("Add")).toBeInTheDocument();
  }); // testing of add component. during each it post data to the api.
  // it check whether the add is in the document or not.
});
