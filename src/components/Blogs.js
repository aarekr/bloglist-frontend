import Togglable from './Togglable'
import { useNavigate } from 'react-router-dom'

const Blogs = ({ blogs, user, handleLogout }) => {
  console.log('Blogs:', blogs)
  const navigate = useNavigate()

  return (
    <div>
      {user === null ?
        <Togglable buttonLabel='click here'>
          click main page button <br />
          <button onClick={() => navigate('/')}>main page</button>
        </Togglable> :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <div>
            <h2>All blogs</h2>
            <table>
              <tbody>
                <tr><td><b>Blog</b></td><td><b>Author</b></td><td><b>Likes</b></td></tr>
                {blogs.map(blog =>
                  <tr key={blog.id}><td>{blog.title}</td><td>{blog.author}</td><td>{blog.likes}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  )
}

export default Blogs