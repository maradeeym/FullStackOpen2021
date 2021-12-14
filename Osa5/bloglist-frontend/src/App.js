import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in with", username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }
  //Adding blog

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser")
    document.location.reload()
  }

  const addBlog = async (blogObject) => {
    if (
      blogObject.title !== "" &&
      blogObject.author !== "" &&
      blogObject.url !== ""
    ) {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))

    } else {
      setErrorMessage("something wen wrong bro")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const blogForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" }
    const showWhenVisible = { display: loginVisible ? "" : "none" }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog}/>
          <button onClick={() => setLoginVisible(false)}>hide</button>
        </div>
      </div>
    )
  }

  // updating blog
  const blogUpdate = async (blogId, blogObject) => {
    await blogService.update(blogId, blogObject)

    const updatedBlog = { ...blogObject, blogId }

    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    )
  }

  // deleteing blog
  const blogRemove = async (blogId) => {
    await blogService.remove(blogId)

    setBlogs(blogs.filter((blog) => blog.id !== blogId))
  }

  return (
    <div>
      {user && (
        <div>
          <h2>Blogs</h2>
          <b>{user.name} is logged in</b>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <Notification message={errorMessage} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <>
          <div>
            {blogForm()}
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .filter((blog) => blog.user.username === user.username)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  blogUpdate={blogUpdate}
                  blogRemove={blogRemove}
                />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
