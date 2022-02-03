describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Serkkupas',
      username: 'Serkku',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Serkku')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Serkkupas is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Serkku')
      cy.get('#password').type('salainen111')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: "Serkku", password: "salainen" })
    })
/*
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Serkku')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })
*/

    it('A blog can be created', function() {
      cy.get('#create-new-blog').click()
      cy.get('#title').type('Blog made by cypress')
      cy.get('#author').type('Blog author')
      cy.get('#url').type('CoolBlog.com')
      cy.get('#create').click()
      cy.contains('hide').click()
      cy.reload(true)
      cy.contains('Blog made by cypress Blog author')
    })

    describe('blog is there', function() {
      beforeEach(function () {
        cy.createBlog({
          title: "Blog made by cypress",
          author: "Blog author",
          url: "ColBlog.com",
          likes: 0,
        })
      })

      it('A blog can be liked', function() {
        cy.reload(true)
        cy.contains('Blog made by cypress Blog author')
        cy.contains('view').click()
        cy.get('#like').click()
        cy.get('.likeCont').contains("Likes: 1")
        cy.get('#like').click()
        cy.get('.likeCont').contains("Likes: 2")
      })
    })

    describe("blog can be created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Blog made by cypress",
          author: "Blog author",
          url: "CoolBlog.com",
          likes: 0,
        })
      })

      it("and deleted by creator", function () {
        cy.contains("Blog made by cypress")
        cy.contains('view').click()
        cy.get('#delete').click()
        cy.get("html").should("not.contain", "Blog made by cypress")
      })
    })
/*
      it('A blog can be deleted', function() {
        cy.get('#create-new-blog').click()
        cy.get('#title').type('Blog made by cypress')
        cy.get('#author').type('Blog author')
        cy.get('#url').type('CoolBlog.com')
        cy.get('#create').click()
        cy.contains('hide').click()
        cy.reload(true)
        cy.contains('Blog made by cypress Blog author')
        cy.contains('view').click()
        cy.get('#delete').click()
      })
*/
    describe("several blogs can be created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Blog with 1 like",
          author: "Test 1",
          url: "testblog",
          likes: 1,
        })
        cy.createBlog({
          title: "Blog with 3 likes",
          author: "Test2",
          url: "testblog2",
          likes: 3,
        })
        cy.createBlog({
          title: "Blog with 6 likes",
          author: "Test6",
          url: "testblog3",
          likes: 6,
        })
      })

      it("and they are automatically sorted by likes", function () {
        cy.get(".blogCont>.blogTitle").should((items) => {
          expect(items[0]).to.contain("Blog with 6 likes")
          expect(items[1]).to.contain("Blog with 3 likes")
          expect(items[2]).to.contain("Blog with 1 like")
        })
      })
    })})})
