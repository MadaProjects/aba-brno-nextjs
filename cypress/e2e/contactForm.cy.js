describe('Contact form', () => {
  context('errors', () => {
    it('should show error message on empty form submit', () => {
      cy.visit('/odbornici/mgr-lucie-vozakova-bcba');

      cy.get('[data-testid="tabWithContactFormBtn"]').click();
      cy.get('[data-testid="contactForm"]').should('be.visible');

      cy.get('input[type="submit"]').click();
      cy.get('p[role="alert"]').should('have.length', 4);
    });

    it('should show error message when name is not filled', () => {
      cy.visit('/odbornici/mgr-lucie-vozakova-bcba');

      cy.get('[data-testid="tabWithContactFormBtn"]').click();
      cy.get('[data-testid="contactForm"]').should('be.visible');

      cy.get('input[name="email"]').type('test@test.cz');
      cy.get('textarea[name="message"]').type('test message');

      cy.get('input[type="submit"]').click();
      cy.get('p[role="alert"]').should(
        'have.text',
        'Toto pole je povinné'
      );
      cy.get('p[role="alert"]').should('have.length', 2);
    });

    it('should show error message when email is not filled', () => {
      cy.visit('/odbornici/mgr-lucie-vozakova-bcba');

      cy.get('[data-testid="tabWithContactFormBtn"]').click();
      cy.get('[data-testid="contactForm"]').should('be.visible');

      cy.get('input[name="name"]').type('Test name');
      cy.get('textarea[name="message"]').type('test message');

      cy.get('input[type="submit"]').click();
      cy.get('p[role="alert"]').should(
        'have.text',
        'Toto pole je povinné'
      );
      cy.get('p[role="alert"]').should('have.length', 2);
    });

    it('should show error message when message is not filled', () => {
      cy.visit('/odbornici/mgr-lucie-vozakova-bcba');

      cy.get('[data-testid="tabWithContactFormBtn"]').click();
      cy.get('[data-testid="contactForm"]').should('be.visible');

      cy.get('input[name="name"]').type('Test name');
      cy.get('input[name="email"]').type('test@test.cz');

      cy.get('input[type="submit"]').click();
      cy.get('p[role="alert"]').should(
        'have.text',
        'Toto pole je povinné'
      );
      cy.get('p[role="alert"]').should('have.length', 2);
    });

    it('should show error message on form submit', () => {
      cy.visit('/odbornici/mgr-lucie-vozakova-bcba');

      cy.get('[data-testid="tabWithContactFormBtn"]').click();
      cy.get('[data-testid="contactForm"]').should('be.visible');

      cy.get('input[name="name"]').type('test name');
      cy.get('input[name="email"]').type('testemail@email.com');
      cy.get('textarea[name="message"]').type('test message');

      //cy.get('input[type="submit"]').click();

      cy.intercept('POST', '/api/contact', {
        statusCode: 500,
      });
      cy.get('form').submit();

      cy.get('div[role="alert"]').should(
        'have.text',
        'An unexpected error occurred while saving, please try again'
      );
    });
  });

  context('success', () => {
    it('should show success message on form submit', () => {
      cy.visit('/odbornici/mgr-lucie-vozakova-bcba');

      cy.get('[data-testid="tabWithContactFormBtn"]').click();
      cy.get('[data-testid="contactForm"]').should('be.visible');

      cy.get('input[name="name"]').type('test name');
      cy.get('input[name="email"]').type('testemail@email.com');
      cy.get('textarea[name="message"]').type('test message');

      //cy.get('input[type="submit"]').click();

      cy.intercept('POST', '/api/contact', {
        statusCode: 201,
      }).as('userSuccess');
      cy.get('form').submit();

      cy.get('div[role="alert"]').should(
        'have.text',
        'Zprava úspěšně odeslána'
      );
    });
  });
});
