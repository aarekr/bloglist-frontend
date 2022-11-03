describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tauno Testaaja',
      username: 'tauno',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Blogs')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('tauno')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('Tauno Testaaja logged in')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('tauno')
      cy.get('#password').type('väärä')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

/*
  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('aare')
      cy.get('#password').type('...)
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Aare')
      cy.get('#url').type('http://blogi')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
    })
  })*/
})