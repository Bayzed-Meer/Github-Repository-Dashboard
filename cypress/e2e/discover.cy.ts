describe('Discover Page', () => {
  beforeEach(() => {
    cy.visit('/discover');
  });

  it('should display the navigation bar', () => {
    cy.get('[data-cy=navbar]').should('be.visible');
  });

  it('should navigate to Discover page', () => {
    cy.get('[data-cy=discover]').click({ force: true });
    cy.url().should('include', '/discover');
  });

  it('should navigate to Charts page', () => {
    cy.get('[data-cy=charts]').click({ force: true });
    cy.url().should('include', '/charts');
  });

  it('should display the search component elements', () => {
    cy.get('[data-cy=language-input]').should('be.visible');
    cy.get('[data-cy=sortOrder-select]').should('be.visible');
    cy.get('[data-cy=search-button]').should('be.visible');
  });

  it('should display view button', () => {
    cy.get('[data-cy=view-button]').should('be.visible');
  });

  it('should show 50 repos by default', () => {
    cy.get('[data-cy=repo-card-parent] [data-cy=repo-card-child]').should(
      'have.length.at.least',
      50
    );
  });

  it('should search repositories work', () => {
    cy.get('[data-cy=search-button]').click({ force: true });
    cy.get('[data-cy=repo-card-parent] [data-cy=repo-card-child]').should(
      'have.length.at.least',
      50
    );
  });
});
