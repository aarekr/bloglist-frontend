import Togglable from './Togglable'
import { useNavigate } from 'react-router-dom'

const DataLine = ({ name, lkm }) => {
  return (
    <><td>{name}</td><td>{lkm}</td></>
  )
}

const Users = ({ user, handleLogout, allUsers }) => {
  console.log('Users:', allUsers)
  const navigate = useNavigate()

  return (
    <div>
      {user === null ?
        <Togglable buttonLabel='click here'>
          click main page button <br />
          <button onClick={() => navigate('/')}>main page</button>
        </Togglable> :
        <div>
          <p>{user.name} logged in<br /><br /><button onClick={handleLogout}>logout</button></p>
          <div>
            <h2>Users</h2>
            <table>
              <tbody>
                <tr><td><b>Name</b></td><td><b>Blogs created</b></td></tr>
                {allUsers.map(user =>
                  <tr key={user.username}><DataLine name={user.name} lkm={user.blogs.length} /></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  )
}

export default Users