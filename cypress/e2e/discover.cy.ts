describe('Discover Page', () => {
  beforeEach(() => {
    cy.visit('/discover');
  });

  it('should display the navigation bar', () => {
    cy.get('nav').should('be.visible');
  });

  it('should navigate to Discover page', () => {
    cy.get('.discover').click({ force: true });

    cy.url().should('include', '/discover');
  });

  it('should navigate to Charts page', () => {
    cy.get('.charts').click({ force: true });

    cy.url().should('include', '/charts');
  });

  it('should display the search component with default values', () => {
    cy.get('.language-input').should('have.value', 'JavaScript');

    cy.get('.sortOrder-select').should('have.value', 'desc');
  });
});
