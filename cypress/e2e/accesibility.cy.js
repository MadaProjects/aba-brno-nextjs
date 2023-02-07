describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.injectAxe();
  });

  it('Has no detectable a11y violations on load', () => {
    cy.get('[data-testid="expertsList"]').should('be.visible');
    cy.checkA11y();
  });
});

describe('Experts list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/odbornici');
    cy.injectAxe();
  });

  it('Has no detectable a11y violations on load', () => {
    cy.get('[data-testid="expertsList"]').should('be.visible');
    cy.checkA11y();
  });
});

describe('Expert detail', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/odbornici/mgr-lucie-vozakova-bcba');
    cy.injectAxe();
  });

  it('Has no detectable a11y violations on load', () => {
    cy.get('[data-testid="expertPage"]').should('be.visible');
    cy.checkA11y();
  });
});

describe('Articles list', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/clanky');
    cy.injectAxe();
  });

  it('Has no detectable a11y violations on load', () => {
    cy.get('[data-testid="articlesList"]').should('be.visible');
    cy.checkA11y();
  });
});

describe('Article detail', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/clanky/aba-a-zabava');
    cy.injectAxe();
  });

  it('Has no detectable a11y violations on load', () => {
    cy.get('[data-testid="articlePage"]').should('be.visible');
    cy.checkA11y();
  });
});
