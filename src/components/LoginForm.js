import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange,
  username, password }) => {
  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username <input id='username' value={username}
            onChange={handleUsernameChange} /></Form.Label>
          <Form.Label>password <input id='password' type='password' value={password}
            onChange={handlePasswordChange} /></Form.Label> <br />
          <Button variant="primary" id='login-button' type='submit'>login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm