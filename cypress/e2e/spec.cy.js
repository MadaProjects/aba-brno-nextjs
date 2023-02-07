describe('My First Test', () => {
  it('Find the content type', () => {
    cy.visit('https://example.cypress.io');
    cy.contains('type').click();

    cy.url().should('include', '/commands/actions');
    cy.get('.action-email').type('fake@mail.com');
    cy.get('.action-email').should('have.value', 'fake@mail.com');
  });
});
