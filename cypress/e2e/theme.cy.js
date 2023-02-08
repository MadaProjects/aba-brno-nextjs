describe('Dark theme', () => {
  beforeEach(() => {
    window.localStorage.setItem('theme', 'dark');
    cy.visit('/');
  });

  it('prefers dark theme', () => {
    cy.visit('/');
    cy.get('body').should('have.class', 'dark');
  });

  it('has a sun icon on dark mode', () => {
    cy.visit('/');
    cy.get('[data-testid="lightModeBtn"]').should('be.visible');
  });
});

describe('Light theme', () => {
  beforeEach(() => {
    window.localStorage.setItem('theme', '');
    cy.visit('/');
  });

  it('prefers light theme', () => {
    cy.visit('/');
    cy.get('body').should('not.have.class', 'dark');
  });

  it('has a moon icon on light mode', () => {
    cy.visit('/');
    cy.get('[data-testid="darkModeBtn"]').should('be.visible');
  });
});
