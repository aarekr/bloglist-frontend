import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>setBlogs( blogs ))  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>username
          <input type="text" value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>password
          <input type="password" value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input value={newBlog} onChange={handleBlogChange} />
      <button type="submit">save</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </form>

  )

  const addBlog = (event) => {
    event.preventDefault()
    console.log('adding a blog')
  }
  const handleBlogChange = () => {
    console.log('handleBlogChange')
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {user === null
        ? loginForm()
        : <div><p>{user.name} logged in 
               <button onClick={handleLogout}>logout</button></p><hr />
            {blogForm()}
          </div>
      }
    </div>
  )
}

export default App