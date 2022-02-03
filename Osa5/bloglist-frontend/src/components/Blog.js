import React from "react"
//import PropTypes from "prop-types"
import Togglable from "./Togglable"

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ( { blog, blogUpdate, blogRemove } ) => {

  const likeHandler = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogUpdate(blog.id, updatedBlog)
  }

  const removeHandler = () => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`) &&
      blogRemove(blog.id)
  }

  return (
    <div className="blogCont" style={blogStyle}>
      <div className="blogTitle">
        {blog.title} {blog.author}
        <Togglable buttonLabel="view" cancelButtonLabel="hide">
          <p>Url: {blog.url}</p>
          <p className="likeCont">Likes: {blog.likes}<button id="like" onClick={likeHandler}>like</button></p>
          <p>User: {blog.user.name}</p>
          <button id="delete" onClick={removeHandler}>delete blog</button>
        </Togglable>
      </div>
    </div>
  )}
/*
Blog.propTypes = {
  blog: PropTypes.string.isRequired
}
*/
export default Blog
