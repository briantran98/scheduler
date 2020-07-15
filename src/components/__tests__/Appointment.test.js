import React from "react";

import { render } from "@testing-library/react";

import Appointments from "components/Appointment";

describe("Appointments", () => {
  it("renders without crashing", () => {
    render(<Appointments />);
  });
});
