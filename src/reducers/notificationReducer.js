const notificationReducer = (state = null, action) => {
  console.log('notificationReducer:', state, action)
  switch (action.type) {
  case 'ADD':
    state = 'you added a blog'
    return state
  case 'REMOVE':
    state = 'you removed a blog'
    return state
  case 'LIKE':
    state = 'you liked a blog'
    return state
  case 'RESET':
    state = null
    return state
  case 'WRONG':
    state = 'wrong username or password'
    return state
  default:
    return state
  }
}

export default notificationReducer