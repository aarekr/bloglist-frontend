import Togglable from './Togglable'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const OneBlog = ({ blogs, user, handleLogout, addLike }) => {
  console.log('OneBlog blogs:', blogs)
  const navigate = useNavigate()
  console.log('useParams():', useParams())
  const id = useParams().id
  console.log('OneBlog useParams().id:', typeof(useParams().id), useParams().id)
  const blogi = blogs.find(n => n.id === id)
  console.log('haettu blogi:', blogi)

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
            <h2>{blogi.title}</h2>
            <div>{blogi.url}</div>
            <div>{blogi.likes} likes <button id='like-button' onClick={
              () => addLike(blogi.id)}>like</button></div>
            <div>added by {blogi.user.name}</div>
          </div>
        </div>
      }
    </div>
  )
}

export default OneBlog