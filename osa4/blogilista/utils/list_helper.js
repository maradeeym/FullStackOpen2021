const User = require('../models/user')

const dummy = (blogs) => {
    return (1)
  }

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const reducer = (sum, likes) => {
        return sum + likes
    }
  return likes.reduce(reducer)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const mostLikes = Math.max(...likes)
    const blogWithMostLikes = (theBlog) => theBlog === mostLikes
    return blogs[likes.findIndex(blogWithMostLikes)]
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }


  module.exports = {
      dummy,
      totalLikes,
      favoriteBlog,
      usersInDb,
  }