import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state)

  if (notification.ilmoitus === null) {
    return null
  }
  else if (notification.ilmoitus !== null){
    return (
      <div className="container">{
        (notification.ilmoitus && <Alert variant='success'>{notification.ilmoitus}</Alert>)
      }</div>
    )
  }
}

export default Notification