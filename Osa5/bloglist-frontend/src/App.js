import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    };
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

  try {
    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem("loggedBlogUser", JSON.stringify(user)
    )
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  }
}
//Adding blog

const handleLogout = () => {
  window.localStorage.removeItem("loggedBlogUser");
  document.location.reload();
}

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const addBlog = async (blogObject) => {
    if (
      blogObject.title !== "" &&
      blogObject.author !== "" &&
      blogObject.url !== ""
    ) {
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
  } else {
    setErrorMessage('something wen wrong bro')
    setTimeout(() => {
    setErrorMessage(null)
    }, 3000)
  }
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
      loginForm()
      ) : (
      <>
        <div>
        <BlogForm createBlog={addBlog}/>
            {blogs
              .filter((blog) => blog.user.username === user.username)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                />
              ))}
          </div>
      </>
      )}
    </div>
  )
}

export default App
