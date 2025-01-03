import logo from './logo.svg'
import './App.css'
import MealsContainer from './components/MealsContainer'
import { useState } from 'react'
import MealContext from './components/MealContext'

function App() {
  const [meals, setMeals] = useState([])
  return (
    <div className="App">
      <MealContext.Provider value={{ meals, setMeals }}>
        <MealsContainer />
      </MealContext.Provider>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  )
}

export default App
