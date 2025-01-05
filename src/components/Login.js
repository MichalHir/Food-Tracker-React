import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate() // This must be inside the component body
  function login() {
    console.log('!!!')
    if (password && email) {
      navigate('/')
      // Optionally update the context or perform an API call here
    } else {
      alert('Please enter both email and password!')
      console.log('Please enter both email and password')
      navigate('/')
    }
  }
  return (
    <div>
      Login
      <h1>Add a Meal</h1>
      <label for="email">email:</label>
      <input
        type="text"
        className="form-control"
        size="50"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label for="password">Password:</label>
      <input
        type="text"
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
