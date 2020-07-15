describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

  it("should book an interview", () => {
    cy.visit("/");
    /*
		1. Visits the root of our web server
    2. Clicks on the "Add" button in the second appointment
    3. Enters their name
    4. Chooses an interviewer
    5. Clicks the save button
    6. Sees the booked appointment
		*/
    cy.request("http://localhost:8001/api/debug/reset");
  });

  it("should edit an interview", () => {
    /*
    1. Visits the root of our web server
    2. Clicks the edit button for the existing appointment
    3. Changes the name and interviewer
    4. Clicks the save button
    5. Sees the edit to the appointment
		*/
    cy.request("http://localhost:8001/api/debug/reset");
  });

  it("should cancel an interview", () => {
    /*
    1. Visits the root of our web server
    2. Clicks the delete button for the existing appointment
    3. Clicks the confirm button
    4. Sees that the appointment slot is empty
		*/
    cy.request("http://localhost:8001/api/debug/reset");
  });
});
