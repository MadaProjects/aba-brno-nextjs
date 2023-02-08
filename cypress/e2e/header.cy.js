describe('Header', () => {
  it('should have the correct title', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'My App');
  });
});
