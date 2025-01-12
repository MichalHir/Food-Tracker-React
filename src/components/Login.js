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
  const navigate = useNavigate() // This must be inside the component body
  function doLogin() {
    console.log(`login success with username: ${userName} password:${password}`)
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
        setMessage('Login Failed please try again')
      })
    // if (password && userName) {
    //    navigate('/')
    //    Optionally update the context or perform an API call here
    // } else {
    //   alert('Please enter both email and password!')
    //   console.log('Please enter both email and password')
    //   navigate('/')
    // }
  }
  return (
    <div className="login-container">
      <div>{message}</div>
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
