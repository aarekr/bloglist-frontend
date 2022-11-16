import Blog from './Blog'
import LoginForm from './LoginForm'
import UusiBlogForm from './UusiBlogForm'
import Togglable from './Togglable'

const Home = ({ user, username, password, setUsername, setPassword, blogFormRef, blogs,
  handleLogin, handleLogout, addBlog, removeBlog, addLike }) => {

  return (
    <div>
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
                  removeBlog={removeBlog} addLike={addLike} />)
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Home