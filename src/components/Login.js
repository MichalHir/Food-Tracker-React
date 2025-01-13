import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginContext from './LoginContext'
import { jwtDecode } from 'jwt-decode'

function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const { login, setLogin } = useContext(LoginContext)
  const [message, setMessage] = useState('')
  const [host, setHost] = useState(`http://127.0.0.1:8000/`)
  const navigate = useNavigate()
  const [messageType, setMessageType] = useState('')

  function doLogin() {
    if (!password || !userName) {
      setMessage('Please add both username and password')
      setMessageType('error')
      return
    }
    const loginData = {
      username: userName,
      password: password,
    }
    axios
      .post(`${host}login/`, loginData)
      .then((response) => {
        console.log(response.data.access)
        const token = jwtDecode(response.data.access)
        localStorage.setItem('token', response.data.access)
        localStorage.setItem('username', token.username)
        setLogin(token)
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        setMessage('Login Failed - invalid username or password')
      })
  }
  return (
    <div className="login-container">
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <h1>Login</h1>
      UserName:
      <input
        size="50"
        placeholder="UserName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      Password:
      <input
        size="50"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="button" onClick={doLogin}>
        Login
      </button>
    </div>
  )
}

export default Login
