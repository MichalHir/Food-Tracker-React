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
              <li>
                <Link to="/addMeal">Add Meal</Link>
              </li>
              <li>
                <Link to="/addFood">Add Food</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {login?.is_admin && (
                <li>
                  <Link to="/login">Admin</Link>
                </li>
              )}
              <li>
                <Link to="/login">
                  {login ? `hello ${username}` : 'Your Account'}
                </Link>
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
