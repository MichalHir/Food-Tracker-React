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
    axios
      // .get('http://localhost:3005/meals')
      .get('http://127.0.0.1:8000/api/meals/')
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
      const filtered = meals.filter((meal) => meal.date === selectedDate)
      setFilteredMeals(filtered)
      console.log(filteredMeals)
      setClicked(true)
    } else {
      setFilteredMeals([]) // Clear filtered meals if no date is selected
      setClicked(false) // Ensure the header shows the "no selected date" message
    }
  }
  // const deleteMeal = (mealId) => {
  //   axios
  //     .delete(`http://localhost:3005/meals/${mealId}`)
  //     .then(() => {
  //       console.log(`Meal with ID ${mealId} deleted successfully.`);
  //       getMeals(); // Refresh meals after deletion
  //     })
  //     .catch((error) => {
  //       console.error('Error deleting meal:', error);
  //     });
  // };
  function deleteMeal(mealId) {
    console.log(mealId)
    axios
      // .delete(`http://localhost:3005/meals/${mealId}`)
      .delete(`http://127.0.0.1:8000/meals/${mealId}/`)
      .then((response) => {
        console.log('Meal deleted successfully:', response.data)
        // Optionally refresh the meals list or update UI here
        // getMeals()
        // fetchMealsByDate()
        const updatedMeals = meals.filter((meal) => meal.id !== mealId)
        setMeals(updatedMeals)
        setFilteredMeals(
          updatedMeals.filter((meal) => meal.date === selectedDate)
        )
      })
      .catch((error) => {
        console.error('Error deleting meal:', error)
      })
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
        <button onClick={fetchMealsByDate} disabled={!selectedDate}>
          Show Meals
        </button>
      </div>

      {clicked && <h2>Meals for {selectedDate}</h2>}
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
                    {Array.isArray(meal.foodInfo)
                      ? meal.foodInfo.join(', ')
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
                    delete meal
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

      <button onClick={goToAddPage} type="button" className="btn btn-primary">
        Add meal
      </button>
    </div>
  )
}

export default MealsContainer
