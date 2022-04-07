describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Md Faruk',
      username: 'mdfaruk',
      password: 'kurafdm'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('log in to application')
    cy.contains('cancel')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mdfaruk')
      cy.get('#password').type('kurafdm')
      cy.get('#login').click()

      cy.contains('Md Faruk logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mdfaruk')
      cy.get('#password').type('wrong password')
      cy.get('#login').click()

      cy.get('.message').should('contain','invalid username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('mdfaruk')
        cy.get('#password').type('kurafdm')
        cy.get('#login').click()
      })

      it('A blog can be created', function() {
        cy.contains('create blog').click()

        cy.get('#title').type('React 18.0.0')
        cy.get('#author').type('Md')
        cy.get('#url').type('https://react.com')

        cy.get('#create').click()
        cy.contains('a new blog React 18.0.0 by Md')
      })

      it('users can like a blog', function() {
        cy.contains('create blog').click()

        cy.get('#title').type('React 18.0.0')
        cy.get('#author').type('Md')
        cy.get('#url').type('https://react.com')

        cy.get('#create').click()
        cy.contains('a new blog React 18.0.0 by Md')

        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('updated likes')
      })

      it('user can delete a blog who created', function() {
        cy.contains('create blog').click()

        cy.get('#title').type('React 18.0.0')
        cy.get('#author').type('Md')
        cy.get('#url').type('https://react.com')

        cy.get('#create').click()
        cy.contains('a new blog React 18.0.0 by Md')

        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('Remove blog React 18.0.0 by Md').should('not.exist')
      })

      describe('blogs are ordered according to likes', function() {
        beforeEach(function() {
          cy.login({ username: 'mdfaruk', password: 'kurafdm' })

          cy.createBlog({
            title: 'blog1',
            author: 'david',
            url: 'https://blog1.com',
          })
          cy.createBlog({
            title: 'blog2',
            author: 'son',
            url: 'https://blog2.com',
            likes: 14
          })
          cy.createBlog({
            title: 'blog3',
            author: 'lara',
            url: 'https://blog3.com',
            likes:5
          })
        })
        it.only('sorting blogs according to likes', function() {
          cy.contains('login').click()
          cy.get('#username').type('mdfaruk')
          cy.get('#password').type('kurafdm')
          cy.get('#login').click()

          cy.get('.blog').then(($div) => {
            ($div).map(function(index,el) {
              cy.get(el).contains(el.firstChild.textContent.slice(0,-4))
            })
          })
        })
      })


    })
  })
})