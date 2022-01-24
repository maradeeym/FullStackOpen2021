describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'MarkkuK',
      username: 'Markku',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  it('Front page can ne opened', function() {
    cy.contains('login to application')
  })

  it('login form can be opened', function() {
    cy.get('#username').type('Markku')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('MarkkuK is logged in')
  })
})
