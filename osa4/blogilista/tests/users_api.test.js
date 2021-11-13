const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const listHelper = require('../utils/list_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')


const initialUsers = [
    {
        username: 'testiuseri',
        name: 'useri',
        password: 'salasana',
    },
    {
        username: 'testiuseri2',
        name: 'useri2',
        password: 'salasana2',
    },
]


describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb()

    const newUser = {
      username: 'serkku',
      name: 'serkkupoika',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('addtition of a new user', () => {

    test('fails with status code 400 if data invalid', async () => {
        const newUser = {
            username: 'ma',
            name: 'mara',  
            password: 'se'
            }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        const usersAtEnd = await listHelper.usersInDb()

        expect(usersAtEnd).toHaveLength(initialUsers.length)
        })
    })


afterAll(() => {
    mongoose.connection.close()
  })