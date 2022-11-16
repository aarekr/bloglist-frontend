import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state)

  if (notification.ilmoitus === null) {
    return null
  }
  else if (notification.ilmoitus !== null){
    return (
      <div className="ilmoitus">{notification.ilmoitus}</div>
    )
  }
}

export default Notification