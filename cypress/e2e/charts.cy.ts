describe('Chart page', () => {
  beforeEach(() => {
    cy.visit('/charts');
  });

  it('displays the chart selection options', () => {
    cy.get('[data-cy=charts]').should('be.visible');
    cy.get('[data-cy=charts-title]')
      .contains('Choose a Chart to Compare Repositories')
      .should('be.visible');
    cy.get('[data-cy=charts]')
      .find('[data-cy=charts-barchart]')
      .should('be.visible');
    cy.get('[data-cy=charts]')
      .find('[data-cy=charts-piechart]')
      .should('be.visible');
  });

  it('navigates to Pie Chart page when Pie Chart option is clicked', () => {
    cy.get('[data-cy=charts-piechart]').click();
    cy.url().should('include', '/charts/piechart');
  });

  it('navigates to Bar Chart page when Bar Chart option is clicked', () => {
    cy.get('[data-cy=charts-barchart]').click();
    cy.url().should('include', '/charts/barchart');
  });
});
