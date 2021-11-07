const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'pekkablogaaja',
    url: 'blogi.com',
    likes: 1,
  },
  {
    title: 'HTML is beeeasi',
    author: 'pekkablogaaja2',
    url: 'blogi2.com',
    likes: 2,
  },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

describe('Test blogs', () => {

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  
    test('there are X amount of blogs', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(2)
    })
  
  
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'testi',
        author: 'testiauthor',
        url: 'testiurli',
        likes: 1
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
        const response = await api.get('/api/blogs')
  
        const blogs = response.body.map(b => b.title)
  
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(blogs).toContain(
          'testi'
        )
    })
  
  })

  afterAll(() => {
    mongoose.connection.close()
  })