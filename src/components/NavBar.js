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
                  <li>
                    <Link to="/searchFood">Search Food</Link>
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
              <li className="user-greeting">
                {login ? (
                  `hello ${login}`
                ) : (
                  <li>
                    <button onClick={() => (window.location.href = '/login')}>
                      Login
                    </button>
                  </li>
                )}
              </li>
              <li className="current-date">Today's date: {formattedDate}</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
