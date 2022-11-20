import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Users from './Users'
import Blogs from './Blogs'
import OneBlog from './OneBlog'
import Notification from './Notification'
import { useEffect, useState, useRef } from 'react'
import blogService from '../services/blogs'
import userService from '../services/users'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = () => {
  const [blogs, setBlogs] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }, [])

  useEffect(() => {
    userService.getAll().then(allUsers => setAllUsers( allUsers ))
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
      dispatch({ type: 'WRONG' })
      setTimeout(() => dispatch({ type: 'RESET' }), 3000)
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
        dispatch({ type: 'ADD' })
        setTimeout(() => dispatch({ type: 'RESET' }), 3000)
        blogService.getAll().then(blogs => setBlogs( blogs ))
      })
  }

  const removeBlog = (id, blog_creator_id, title, author) => {
    let poistetaankoBlogi = window.confirm(`Remove blog ${title} by ${author}`)
    if (poistetaankoBlogi === true) {
      blogService
        .remove(id)
        .then(poistettuBlog => {
          dispatch({ type: 'REMOVE' })
          setTimeout(() => dispatch({ type: 'RESET' }), 3000)
          blogService.getAll().then(blogs => setBlogs( blogs ))
        })
    }
  }

  const addLike = (id) => {
    console.log('lisätään like id:', id)
    blogService.get_by_id(id).then(blog => {
      let muutettavaBlogi = {
        author: blog.author,
        id: blog.id,
        likes: blog.likes + 1,
        title: blog.title,
        url: blog.url,
        user: blog.user
      }
      console.log('muutettavaBlogi:', muutettavaBlogi)
      blogService
        .update(id, muutettavaBlogi)
        .then(muutettuBlog => {
          dispatch({ type: 'LIKE' })
          setTimeout(() => dispatch({ type: 'RESET' }), 3000)
          blogService.getAll().then(blogs => setBlogs( blogs ))
        })
    })
  }

  const blogFormRef = useRef()
  const padding = { padding: 10 }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span"><Link style={padding} to='/'>home</Link></Nav.Link>
              <Nav.Link href="#" as="span"><Link style={padding} to='/blogs'>blogs</Link></Nav.Link>
              <Nav.Link href="#" as="span"><Link style={padding} to='/users'>users</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path='/' element={<Home user={user} username={username} password={password}
            setUsername={setUsername} setPassword={setPassword} blogFormRef={blogFormRef} blogs={blogs}
            handleLogin={handleLogin} handleLogout={handleLogout}
            addBlog={addBlog} removeBlog={removeBlog} addLike={addLike} />} />
          <Route path='/users' element={<Users user={user} allUsers={allUsers} handleLogout={handleLogout} />} />
          <Route path='/blogs' element={<Blogs blogs={blogs} user={user} handleLogout={handleLogout} /> } />
          <Route path='/blogs/:id' element={<OneBlog blogs={blogs} user={user}
            handleLogout={handleLogout} addLike={addLike} /> } />
        </Routes>
      </Router>
    </div>
  )
}

export default Menu