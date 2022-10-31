import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 
      blogService.setToken(user.token)
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
    window.localStorage.clear()
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
      <h2>create new</h2>
      <div>title: <input value={newBlogTitle} onChange={handleBlogTitleChange} /></div>
      <div>author: <input value={newBlogAuthor} onChange={handleBlogAuthorChange} /></div>
      <div>url: <input value={newBlogURL} onChange={handleBlogURLChange} /></div>
      <div><button type="submit">create</button></div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </form>
  )

  const addBlog = (event) => {
    event.preventDefault()
    console.log('adding a blog')
    const newItem = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
      likes: 0
    }
    blogService
      .create(newItem)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogURL('')
  }

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleBlogURLChange = (event) => {
    setNewBlogURL(event.target.value)
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