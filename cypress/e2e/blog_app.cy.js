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

  describe('Starting page', function() {
    it('Login form is shown', function() {
      cy.contains('Blogs')
      cy.contains('login')
    })
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
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Tauno Testaaja logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('tauno')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Tauno added a new blog')
      cy.get('#author').type('Tauno')
      cy.get('#url').type('http://blogi')
      cy.get('#create-button').click()
      cy.contains('Tauno added a new blog')
    })
    /*
    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('input').type('another note cypress')
        cy.contains('create').click()
      })
    })*/
    
    it('a new blog can be created and liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Tauno added a new blog')
      cy.get('#author').type('Tauno')
      cy.get('#url').type('http://blogi')
      cy.get('#create-button').click()
      cy.contains('Tauno added a new blog')
      cy.get('#view-button').click()
      cy.get('#like-button').click()
    })
  })
})