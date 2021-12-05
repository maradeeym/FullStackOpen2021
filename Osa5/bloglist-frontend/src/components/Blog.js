import React from "react"
import PropTypes from "prop-types"


const Blog = ( { blog } ) => {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.string.isRequired
}

export default Blog