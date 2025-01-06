import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import MealContext from './MealContext'
import { useNavigate } from 'react-router-dom'

function MealsContainer() {
  //   const [foods, setFoods] = useState([])
  const { meals, setMeals } = useContext(MealContext)
  const [selectedDate, setSelectedDate] = useState('') // State for the selected date
  const [filteredMeals, setFilteredMeals] = useState([]) // State for filtered meals
  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate() // This must be inside the component body

  useEffect(() => {
    console.log('starting app')
    getMeals()
  }, []) // Empty dependency array means it runs only once
  function getMeals() {
    axios.get('http://localhost:3005/meals').then((response) => {
      setMeals(response.data) // Save the API data in state
      setClicked(true)
      console.log(response.data)
    })
  }
  //   Fetch meals by date
  function fetchMealsByDate() {
    if (selectedDate) {
      const filtered = meals.filter((meal) => meal.date === selectedDate)
      setFilteredMeals(filtered)
      console.log(filteredMeals)
      setClicked(true)
    } else {
      setFilteredMeals([]) // Clear filtered meals if no date is selected
      setClicked(false) // Ensure the header shows the "no selected date" message
    }
  }
  const goToAddPage = () => {
    navigate('/addMeal') // Use this function for navigation
  }
  return (
    <div>
      <div class="header">
        <h1>Meals by Date</h1>
        <p>Select a date to see all meals for that day</p>
      </div>

      <div class="filter-section">
        <label for="dateSelect">Select Date:</label>
        <input
          type="date"
          id="dateSelect"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={fetchMealsByDate}>Show Meals</button>
      </div>
      {/* <div class="meals-container">
        <div class="row">
      {/* </div>
                </div>
              </div>
            ))
          ) : (
            // If no products are available, show a loading message or a placeholder
            <div className="col-sm-4">
              <div className="panel panel-default">
                <div className="panel-body">Loading meals list...</div>
              </div>
            </div>
          )}
        </div> */}
      {/* </div>  */}

      <h2>
        {clicked ? `Meals for ${selectedDate}` : 'Clicked? No selected date...'}
      </h2>
      <div className="meals-container">
        <div className="row">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <div key={meal.id} className="col-sm-4">
                <div className="meal-card">
                  <h4>{meal.date}</h4>
                  <p>Time: {meal.time}</p>
                  <p>
                    Foods:{' '}
                    {Array.isArray(meal.foodInfo)
                      ? meal.foodInfo.join(', ')
                      : 'No foods available'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p>No meals found for the selected date.</p>
            </div>
          )}
        </div>
      </div>

      <button onClick={goToAddPage} type="button">
        Add meal
      </button>
    </div>
  )
}

export default MealsContainer
