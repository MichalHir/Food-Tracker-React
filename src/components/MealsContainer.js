import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import MealContext from './MealContext'
import { useNavigate } from 'react-router-dom'
import FoodContext from './FoodContext'

function MealsContainer() {
  const [foodTypes, setFoodTypes] = useState([])
  const { foods, setFoods } = useContext(FoodContext)
  const { meals, setMeals } = useContext(MealContext)
  const [selectedDate, setSelectedDate] = useState('') // State for the selected date
  const [filteredMeals, setFilteredMeals] = useState([]) // State for filtered meals
  const [host, setHost] = useState('http://127.0.0.1:8000/')
  const [user, setUser] = useState(localStorage.getItem('username'))
  // const [foods, setFoods] = useContext(FoodContext)

  const navigate = useNavigate() // This must be inside the component body

  useEffect(() => {
    console.log('starting app')
    getMeals()
    axios
      .get(`${host}api/foodTypes/`)
      .then((response) => {
        setFoodTypes(response.data)
      })
      .catch((error) => {
        console.error('Error fetching food types:', error)
      })
    axios
      .get(`${host}api/foods/`)
      .then((response) => {
        setFoods(response.data)
      })
      .catch((error) => {
        console.error('Error fetching foods:', error)
      })
    console.log('user:', localStorage.getItem('username'))
    fetchMealsByDate()
  }, [selectedDate])
  function getMeals() {
    axios
      .get(`${host}api/meals/`)
      .then((response) => {
        setMeals(response.data)
      })
      .catch((error) => {
        console.error('Error fetching meals:', error)
      })
  }

  function fetchMealsByDate() {
    if (selectedDate) {
      const filtered = meals.filter(
        (meal) => meal.date === selectedDate && meal.user === user
      )
      setFilteredMeals(filtered)
    } else {
      setFilteredMeals([])
    }
  }
  function setTodayDate() {
    setSelectedDate(new Date().toISOString().split('T')[0])
  }
  function deleteMeal(mealId) {
    console.log(mealId)
    axios
      .delete(`${host}meals/${mealId}/`)
      .then((response) => {
        const updatedMeals = meals.filter(
          (meal) => meal.id !== mealId && meal.user === user
        )
        setMeals(updatedMeals)
        setFilteredMeals(
          updatedMeals.filter((meal) => meal.date === selectedDate)
        )
      })
      .catch((error) => {
        console.error('Error deleting meal:', error)
      })
  }

  const mapFoodInfoToNamesAndTypes = (foodInfo) => {
    if (!Array.isArray(foodInfo)) {
      console.warn('Invalid foodInfo:', foodInfo)
      return []
    }
    return foodInfo
      .map((foodId) => {
        const food = foods.find((f) => f.id === foodId)
        if (food) {
          const foodTypeNames = food.typesOfFood
            .map((typeId) => {
              const type = foodTypes.find((t) => t.id === typeId)
              return type ? type.type : null
            })
            .filter(Boolean)
            .join(', ')

          return `${food.name} - ${foodTypeNames}`
        }
        return null
      })
      .filter(Boolean)
  }

  const goToAddPage = () => {
    navigate('/addMeal')
  }
  return (
    <div className="form-container">
      {localStorage.getItem('token') ? (
        <>
          <div className="header">
            <h1>Welcome to your food tracker</h1>
            <h1>Meals by Date</h1>
            <p>Select a date to see all meals for that day</p>
          </div>

          <div className="filter-section">
            <label htmlFor="dateSelect">Select Date:</label>
            <input
              type="date"
              id="dateSelect"
              placeholder="Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button onClick={setTodayDate}>Show today's meals</button>
          </div>
          <h2>
            Meals for {selectedDate} - {user}
          </h2>
          <div className="meals-container">
            <div className="row">
              {filteredMeals.length > 0 ? (
                filteredMeals.map((meal) => (
                  <div key={meal.id} className="col-sm-6 col-md-4">
                    <div className="meal-card">
                      <h4 className="food-list">{meal.date}</h4>
                      <p className="food-list">Time: {meal.time}</p>
                      <p>Foods:</p>
                      {meal.food_info.length > 0 ? (
                        <div className="food-list">
                          {mapFoodInfoToNamesAndTypes(meal.food_info).map(
                            (foodTypeInfo, index) => (
                              <div key={index} className="food-item">
                                <span>{foodTypeInfo}</span>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <p>No foods available</p>
                      )}
                      <button
                        onClick={() =>
                          window.confirm(
                            'Are you sure you want to delete this meal?'
                          ) && deleteMeal(meal.id)
                        }
                        type="button"
                      >
                        Delete Meal
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <p className="text-center">
                    No meals found for the selected date.
                  </p>
                </div>
              )}
            </div>
          </div>
          <button onClick={goToAddPage}>Add Meal</button>
        </>
      ) : (
        <p className="text-center">Please log in to use the food tracker.</p>
      )}
    </div>
  )
}

export default MealsContainer
