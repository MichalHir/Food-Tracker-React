import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import MealContext from './MealContext'
import { useNavigate } from 'react-router-dom'

function MealsContainer() {
  //   const [foods, setFoods] = useState([])
  const { meals, setMeals } = useContext(MealContext)
  const [selectedDate, setSelectedDate] = useState('') // State for the selected date
  const [filteredMeals, setFilteredMeals] = useState([]) // State for filtered meals
  const navigate = useNavigate() // This must be inside the component body

  useEffect(() => {
    console.log('starting app')
    getMeals()
  }, []) // Empty dependency array means it runs only once
  function getMeals() {
    axios.get('http://localhost:3005/meals').then((response) => {
      setMeals(response.data) // Save the API data in state
      console.log(response.data)
    })
  }
  //   Fetch meals by date
  function fetchMealsByDate() {
    if (selectedDate) {
      const filtered = meals.filter((meal) => meal.date === selectedDate)
      setFilteredMeals(filtered)
      console.log(filteredMeals)
    }
  }
  const goToAddPage = () => {
    navigate('/addMeal') // Use this function for navigation
  }

  // Function to fetch and display meals based on selected date using Axios
  //   function fetchMealsByDate() {
  //     // const selectedDate = document.getElementById('dateSelect').value // Declare and assign selectedDate first
  //     // const mealsList = document.getElementById('mealsList')
  //     // const token = localStorage.getItem('access_token')
  //     // Clear previous results
  //     mealsList.innerHTML = ''
  //     // Check if token exists and is valid
  //     // if (!token || isTokenExpired(token)) {
  //     //   window.location.href = `${host_front}login.html`
  //     //   return // Stop function execution if token is invalid
  //     // }
  //     // Fetch meals from backend for the selected date
  //     axios
  //       .get(`${host_back}api/meals_by_date/?date=${selectedDate}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })

  //       .then((response) => {
  //         const meals = response.data.meals
  //         const userId = response.data.userId
  //         if (meals.length === 0) {
  //           mealsList.innerHTML = '<p>No meals found for this date.</p>'
  //         } else {
  //           meals.forEach((meal) => {
  //             const mealItem = document.createElement('li')
  //             mealItem.classList.add('meal-item')
  //             mealItem.innerHTML = `
  //                 <h3>Time: ${meal.time} User:${meal.username} </h3>
  //                 <ul>${meal.foods
  //                   .map((food) => `<li>${food}</li>`)
  //                   .join('')}</ul>
  //                 <button class="delete-btn" data-meal-id="${
  //                   meal.meal_id
  //                 }">Delete</button>
  //             `
  //             mealsList.appendChild(mealItem)
  //             // Add event listener for delete button
  //             const deleteButton = mealItem.querySelector('.delete-btn')
  //             deleteButton.addEventListener('click', () => {
  //               deleteMeal(meal.meal_id, selectedDate, token) // Call function to handle deletion
  //             })
  //           })
  //         }
  //       })
  //       .catch((error) => {
  //         if (error.response && error.response.status === 401) {
  //           // Handle token expiration or unauthorized access, possibly redirect to login
  //           window.location.href = `${host_front}login.html`
  //         } else {
  //           console.error('Error fetching meals:', error)
  //           mealsList.innerHTML = '<p>There was an error fetching meals.</p>'
  //         }
  //       })
  //   }
  //   document
  //     .getElementById('addMealButton')
  //     .addEventListener('click', function () {
  //       window.location.href = `${host_front}add_meal.html`
  //     })
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
      {/* <div class="container">
        <div class="row">
          {meals.length > 0 ? (
            // If meals exist, map over the array and display them
            meals.map((meal, index) => (
              <div key={index} className="col-sm-4">
                <div className="panel panel-primary">
                  <div className="panel-heading"></div>
                  <div className="panel-footer">
                    {meal.date} - {meal.time} - {meal.foodInfo}
                    {/* <button
                      className="card-button"
                      onClick={() => addToCart(product)} // Corrected the onClick handler here
                    >
                      Add To Cart
                    </button> */}
      {/* <Cart /> */}
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
      <div>
        <h2>Filtered Meals</h2>
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div key={meal.id}>
              {meal.date} - {meal.time} - {meal.foodInfo}
            </div>
          ))
        ) : (
          <p>No meals found for the selected date.</p>
        )}
      </div>
      <button onClick={goToAddPage} type="button">
        Add meal
      </button>
    </div>
  )
}

export default MealsContainer
