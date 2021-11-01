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

  module.exports = {
      dummy,
      totalLikes
  }