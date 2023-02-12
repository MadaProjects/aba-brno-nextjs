/*
const allPages = [
  {
    title: 'Home',
    path: '/',
    waitFor: '[data-testid="expertsList"]',
  },
  {
    title: 'Odborníci',
    path: '/odbornici',
    waitFor: '[data-testid="expertsList"]',
  },
  {
    title: 'Odborník',
    path: '/odbornici/mgr-lucie-vozakova-bcba',
    waitFor: '[data-testid="expertPage"]',
  },
  {
    title: 'Články',
    path: '/clanky',
    waitFor: '[data-testid="articlesList"]',
  },
  {
    title: 'Článek',
    path: '/clanky/na-co-se-ptat',
    waitFor: '[data-testid="articlePage"]',
  },
  {
    title: 'Kontakt',
    path: '/kontakt',
    waitFor: '[data-testid="contactForm"]',
  },
];

describe('Accesibility', () => {
  allPages.map((page) => {
    it(`Has no detectable a11y violations on load on page - ${page.title}`, () => {
      cy.visit(page.path);
      if (page.waitFor) {
        cy.get(`${page.waitFor}`).should('be.visible');
      }
      cy.injectAxe();
      cy.checkA11y();
    });
  });
});
*/
