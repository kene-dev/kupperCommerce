describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('renders form elements', () => {
    cy.get('input[placeholder="Email"]').should('exist');
    cy.get('input[placeholder="Password"]').should('exist');
    cy.contains('Sign in').should('exist');
  });

  it('cart item shows as 0', () => {
    cy.get('[data-test=cart-length]').contains('0')
  });

  it('shows validation errors', () => {
    cy.contains('Sign in').click();
    cy.contains('please input your email').should('be.visible');
    cy.contains('please add your password').should('be.visible');
  });

  it('toggles password visibility', () => {
    cy.get('input[placeholder="Password"]')
      .should('have.attr', 'type', 'password');
    cy.get('.eye-icon').click(); 
    cy.get('input[placeholder="Password"]')
      .should('have.attr', 'type', 'text');
    cy.get('.eye-icon').click(); 
    cy.get('input[placeholder="Password"]')
      .should('have.attr', 'type', 'password');
  });

   it('links navigate correctly', () => {
    cy.contains('Forgot Your Password?')
      .should('have.attr', 'href', '/auth/forgot-password');
    cy.contains('Create Account')
      .should('have.attr', 'href', '/auth/register');
  });

    it('displays API error toast', () => {
    cy.intercept('POST', '/api/auth/signin', {
      statusCode: 400,
    });
    cy.get('input[placeholder="Email"]').type('bad@example.com');
    cy.get('input[placeholder="Password"]').type('1234567890');
    cy.contains('Sign in').click();
    cy.contains('Invalid login credentials').should('be.visible');
  });

  it('handles API success and redirects', () => {
    cy.intercept('POST', '/api/auth/signin', {
      statusCode: 200,
    });
    cy.get('input[placeholder="Email"]').type('gerryndulue@gmail.com');
    cy.get('input[placeholder="Password"]').type('123456789');
    cy.contains('Sign in').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});