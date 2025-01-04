import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate() // This must be inside the component body
  function login() {
    console.log('!!!')
    if (password && username) {
      navigate('/')
      // Optionally update the context or perform an API call here
    } else {
      alert('Please fill out all fields!')
      console.log('Please fill out all fields')
      navigate('/')
    }
  }
  return (
    <div>
      Login
      <h1>Add a Meal</h1>
      <label for="userName">userName:</label>
      <input
        type="string"
        className="form-control"
        size="50"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label for="password">Password:</label>
      <input
        type="string"
        className="form-control"
        size="50"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="button" onClick={login}>
        Login
      </button>
    </div>
  )
}

export default Login
