import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import blogService from './services/blogs'
import loginService from './services/login'
import UusiBlogForm from './components/UusiBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
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
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
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
    console.log('kirjautuneena nyt:', username)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = (newItem) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newItem)
      .then(returnedBlog => {
        console.log('App addBlog returnedBlog:', returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const removeBlog = (id, blog_creator_id, title, author) => {
    let poistetaankoBlogi = window.confirm(`Remove blog ${title} by ${author}`)
    if (poistetaankoBlogi === true) {
      blogService
        .remove(id)
        .then(poistettuBlog => {
          setSuccessMessage('Deleted blog')
          setTimeout(() => { setSuccessMessage(null) }, 5000)
        })
    }
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h1>Blogs</h1>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username} password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}/>
        </Togglable> :
        <div>
          <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <UusiBlogForm createBlog={addBlog} />
          </Togglable><hr />
          <div>
            {blogs
              .sort((a,b) => a.likes > b.likes ? -1 : 1)
              .map(blog =>
                <Blog key={blog.id} blog={blog} kirjautunut={user.username}
                  removeBlog={removeBlog} />)
            }
          </div>
        </div>
      }
    </div>
  )
}

export default App