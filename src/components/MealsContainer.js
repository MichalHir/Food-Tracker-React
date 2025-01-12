import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import MealContext from './MealContext'
import { useNavigate } from 'react-router-dom'

function MealsContainer() {
  const [foods, setFoods] = useState([])
  const { meals, setMeals } = useContext(MealContext)
  // const [selectedDate, setSelectedDate] = useState('') // State for the selected date
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0] // Default to today's date
  )
  const [filteredMeals, setFilteredMeals] = useState([]) // State for filtered meals
  const [clicked, setClicked] = useState(false)
  const [host, setHost] = useState('http://127.0.0.1:8000/')
  const [user, setUser] = useState(localStorage.getItem('username'))
  // const [foods, setFoods] = useContext(FoodContext)

  const navigate = useNavigate() // This must be inside the component body

  useEffect(() => {
    console.log('starting app')
    getMeals()
    axios
      .get(`${host}api/foods/`)
      .then((response) => {
        setFoods(response.data) // Update the foods state with the response
      })
      .catch((error) => {
        console.error('Error fetching foods:', error)
      })

    console.log('user:', localStorage.getItem('username'))
    fetchMealsByDate()
  }, [selectedDate]) // Empty dependency array means it runs only once
  function getMeals() {
    axios
      // .get('http://localhost:3005/meals')
      .get(`${host}api/meals/`)
      .then((response) => {
        setMeals(response.data)
      })
      .catch((error) => {
        console.error('Error fetching meals:', error)
      })
  }
  //   Fetch meals by date
  function fetchMealsByDate() {
    if (selectedDate) {
      console.log(user)
      const filtered = meals.filter(
        (meal) => meal.date === selectedDate && meal.user === user
      )
      setFilteredMeals(filtered)
      console.log(filteredMeals)
      setClicked(true)
    } else {
      setFilteredMeals([]) // Clear filtered meals if no date is selected
      setClicked(false) // Ensure the header shows the "no selected date" message
    }
  }
  function deleteMeal(mealId) {
    console.log(mealId)
    axios
      // .delete(`http://localhost:3005/meals/${mealId}`)
      .delete(`${host}meals/${mealId}/`)
      .then((response) => {
        console.log('Meal deleted successfully:', response.data)
        // Optionally refresh the meals list or update UI here
        // getMeals()
        // fetchMealsByDate()
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
  const mapFoodInfoToNames = (foodInfo) => {
    return foodInfo
      .map((foodId) => {
        const food = foods.find((f) => f.id === foodId)
        return food ? food.name : null
      })
      .filter(Boolean)
      .join(', ')
  }
  const goToAddPage = () => {
    navigate('/addMeal') // Use this function for navigation
  }
  return (
    <div className="form-container">
      {localStorage.getItem('token') ? (
        <>
          <div className="header">
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
            <button onClick={fetchMealsByDate} disabled={!selectedDate}>
              Show Meals
            </button>
          </div>

          {/* Check for token in localStorage */}
          {/* Show meals if clicked */}
          {clicked && (
            <h2>
              Meals for {selectedDate} - {user}
            </h2>
          )}
          <div className="meals-container">
            <div className="row">
              {filteredMeals.length > 0 ? (
                filteredMeals.map((meal) => (
                  <div key={meal.id} className="col-sm-6 col-md-4">
                    <div className="meal-card">
                      <h4>{meal.date}</h4>
                      <p>Time: {meal.time}</p>
                      <p>
                        Foods:{' '}
                        {meal.food_info.length > 0
                          ? mapFoodInfoToNames(meal.food_info)
                          : 'No foods available'}
                      </p>
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

          {/* Add Meal Button */}
          <button onClick={goToAddPage}>Add Meal</button>
        </>
      ) : (
        <p className="text-center">Please log in to view meals.</p>
      )}
    </div>
  )
}

export default MealsContainer
