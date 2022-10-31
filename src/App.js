import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import blogService from './services/blogs'
import loginService from './services/login'
import UusiBlogForm from './components/UusiBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

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
      setErrorMessage('wrong username or password')
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
    //window.localStorage.clear()
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

  const uusiBlogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <UusiBlogForm handleSubmit={addBlog} 
            newBlogTitle={newBlogTitle} handleBlogTitleChange={handleBlogTitleChange}
            newBlogAuthor={newBlogAuthor} handleBlogAuthorChange={handleBlogAuthorChange}
            newBlogURL={newBlogURL} handleBlogURLChange={handleBlogURLChange} />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  }

  const addBlog = (event) => {
    event.preventDefault()
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
        setSuccessMessage(`a new blog ${newBlogTitle} by ${newBlogAuthor} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogURL('')
      })
    setBlogFormVisible(false)
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
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {user === null
        ? loginForm()
        : <div><p>{user.name} logged in 
               <button onClick={handleLogout}>logout</button></p><hr />
            {uusiBlogForm()}
          </div>
      }
    </div>
  )
}

export default App