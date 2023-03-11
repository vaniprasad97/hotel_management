// describe("true is truthy and false is falsy", () => {
//   test("true is truthy", () => {
//     expect(true).toBe(true);
//   });

//   test("false is falsy", () => {
//     expect(false).toBe(false);
//   });
// });
import React from 'react';
import Header from "../Header";

describe('App tests', () => {
    it('should contains the heading 1', () => {
    render(<Header />);
        const heading = screen.getByText(Logout);
        expect(heading).toBeInTheDocument()
    });
});