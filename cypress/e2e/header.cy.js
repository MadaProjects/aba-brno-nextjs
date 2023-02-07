describe('Header', () => {
  it('should have the correct title', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h1').should('contain', 'My App');
  });
});
