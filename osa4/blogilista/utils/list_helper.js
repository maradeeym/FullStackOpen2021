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


  module.exports = {
      dummy,
      totalLikes,
      favoriteBlog
  }