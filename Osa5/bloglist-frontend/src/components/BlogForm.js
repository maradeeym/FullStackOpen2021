import React, { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState("")
  const [blogAuthor, setBlogAuthor] = useState("")
  const [blogUrl, setBlogUrl] = useState("")


  //change handlers

  const HandleTitleChange = (event) => {
    console.log(event.target.value)
    setBlogTitle(event.target.value)
  }
  const HandleAuthorChange = (event) => {
    console.log(event.target.value)
    setBlogAuthor(event.target.value)
  }
  const HandleUrlChange = (event) => {
    console.log(event.target.value)
    setBlogUrl(event.target.value)
  }

  //creating blog Object

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })

    setBlogTitle("")
    setBlogAuthor("")
    setBlogUrl("")
  }

  return (
    <div>
      <h2>add new blog</h2>
      <form onSubmit={addBlog}>
        <p>
        title:
          <input
            id="title"
            value={blogTitle}
            onChange={HandleTitleChange}
          />
        </p>
        <p>
        author:
          <input
            id="author"
            value={blogAuthor}
            onChange={HandleAuthorChange}
          />
        </p>
        <p>
        url:
          <input
            id="url"
            value={blogUrl}
            onChange={HandleUrlChange}
          />
        </p>
        <button id="create" type="submit">
            create
        </button>
      </form>
    </div>
  )
}

export default BlogForm