import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LoginContext from './LoginContext'

function Navbar() {
  const { login, setLogin } = useContext(LoginContext)
  // Get today's date
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  setLogin(localStorage.getItem('username'))
  function logout() {
    setLogin(null)
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }
  return (
    <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header"></div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li className="active">
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              {localStorage.getItem('token') ? (
                <>
                  <li>
                    <Link to="/addMeal">Add Meal</Link>
                  </li>
                  <li>
                    <Link to="/addFood">Add Food</Link>
                  </li>
                </>
              ) : null}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {login ? (
                <li>
                  <button onClick={() => logout()}>Logout</button>
                </li>
              ) : null}
              <li>
                <Link to="/login">{login ? `hello ${login}` : 'Login'}</Link>
              </li>
              <li>
                <a href="https://www.google.co.il">
                  Today's date:{formattedDate}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
