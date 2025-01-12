// import logo from './logo.svg'
import './App.css'
import MealsContainer from './components/MealsContainer'
import { useState } from 'react'
import MealContext from './components/MealContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/NavBar'
import AddMeal from './components/AddMeal'
import AddFood from './components/AddFood'
import SearchFood from './components/SearchFood'
import Login from './components/Login'
import FoodContext from './components/FoodContext'
import LoginContext from './components/LoginContext'

function App() {
  const [meals, setMeals] = useState([])
  const [foods, setFoods] = useState([])
  const [login, setLogin] = useState([])
  return (
    <div className="App">
      <BrowserRouter>
        <MealContext.Provider value={{ meals, setMeals }}>
          <FoodContext.Provider value={{ foods, setFoods }}>
            <LoginContext.Provider value={{ login, setLogin }}>
              <Navbar />
              <Routes>
                <Route path="/" element={<MealsContainer />} />
                <Route path="/addMeal" element={<AddMeal />} />
                <Route path="/addFOOD" element={<AddFood />} />
                <Route path="/searchFOOD" element={<SearchFood />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/about"
                  element={
                    <>
                      <h1>
                        this is an app that helps you to track and manage your
                        meals
                      </h1>
                    </>
                  }
                />
              </Routes>
            </LoginContext.Provider>
          </FoodContext.Provider>
        </MealContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
