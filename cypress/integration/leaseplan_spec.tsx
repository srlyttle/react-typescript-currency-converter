describe('Home Screen e2e', function () {
  it('should display currency results and change values on input change', () => {
    cy.visit('http://localhost:3000');
    cy.get('.list-container').find('li').its('length').should('eq', 32);

    cy.get('input[data-testid="testid-currency-input-value"]').as(
      'inputCurrency'
    );
    cy.get('@inputCurrency').type('0');
    cy.wait(1000);
    cy.get('div[data-testid="testid-currency-value-CAD"]').should(
      'have.text',
      '15.5100'
    );
  });
});
