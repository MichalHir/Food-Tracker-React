import React, { useContext, useEffect, useState } from 'react'
import FoodContext from './FoodContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginContext from './LoginContext'

function AddMeal() {
  const { foods, setFoods } = useContext(FoodContext)
  const [foodsChoice, setFoodsChoice] = useState([])
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [selectedFoods, setSelectedFoods] = useState([])
  const [searchQuery, setSearchQuery] = useState('') // Search query state
  const [host, setHost] = useState('http://127.0.0.1:8000/')
  const navigate = useNavigate()
  const [user, setUser] = useState(localStorage.getItem('username'))
  const [addedFood, setAddedFood] = useState('') // For single dropdown selection
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'

  console.log('Foods from Context:', foods)
  useEffect(() => {
    if (foods.length === 0) {
      axios
        // .get('http://localhost:3005/foods')
        .get(`${host}api/foods/`)
        .then((response) => {
          setFoodsChoice(response.data)
          setFoods(response.data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching foods:', error)
          setLoading(false)
        })
    } else {
      setFoodsChoice(foods)
      setLoading(false)
    }
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000) // Clear message after 5 seconds
      return () => clearTimeout(timer) // Cleanup timer
    }
  }, [message])

  // Filter foods based on search query
  const filteredFoods = foodsChoice.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addNewMeal = async () => {
    if (date && time && selectedFoods.length > 0) {
      const newMeal = { user, date, time, food_info: selectedFoods }
      try {
        await axios.post(`${host}api/meals/`, newMeal)
        setTime('')
        setDate('')
        setSelectedFoods([])
        setMessage('Meal added successfully!')
        setMessageType('success')
        console.log('Meal Added:', newMeal, localStorage.getItem('username'))
      } catch (error) {
        console.error('Error saving meal:', error)
        setMessage('Failed to add meal. Please try again.')
        setMessageType('error')
      }
    } else {
      alert('Please fill out all fields!')
      console.log('Please fill out all fields')
    }
  }
  const addFoodToSelectedFoods = () => {
    if (addedFood && addedFood !== '' && !selectedFoods.includes(addedFood)) {
      const foodId = parseInt(addedFood) // Ensure the ID matches the type in foods
      const food = foods.find((f) => f.id === foodId) // Lookup food by ID
      const foodName = food ? food.name : 'Unknown food'
      setSelectedFoods([...selectedFoods, addedFood])
      setAddedFood('')
      setMessage(`${foodName} added to your selection!`)
      setMessageType('success')
    } else if (!addedFood || addedFood === '') {
      setMessage('Please select a food to add!')
      setMessageType('error')
    } else {
      setMessage('This food is already selected!')
      setMessageType('error')
    }
  }

  const goToHomePage = () => {
    navigate('/')
  }
  return (
    <div className="form-container">
      <h1>Add a Meal</h1>
      <label for="date">Date:</label>
      <input
        type="date"
        size="50"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label for="time">Time:</label>
      <input
        type="time"
        id="time"
        name="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <label htmlFor="foods">Search and Select Foods:</label>
      <input
        type="text"
        placeholder="Search foods..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        className="search-input"
      />
      <select
        id="foods"
        name="foods"
        multiple
        value={addedFood}
        onChange={(e) => setAddedFood(e.target.value)}
        required
      >
        <h2>Select a food to add</h2>
        {loading ? (
          <option disabled>Loading foods...</option>
        ) : filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <option key={food.id} value={food.id}>
              {food.name}
            </option>
          ))
        ) : (
          <option disabled>No foods found</option>
        )}
      </select>
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <button type="button" onClick={addFoodToSelectedFoods}>
        Add Selected Food
      </button>
      <p>The foods you have selected:</p>
      <ul>
        {selectedFoods.length > 0 ? (
          selectedFoods.map((foodId) => {
            const food = foods.find((f) => f.id === parseInt(foodId)) // Find food by ID
            return (
              <li key={foodId}>
                {food ? food.name : `Food with ID ${foodId} not found`}
              </li>
            )
          })
        ) : (
          <li>No foods available</li>
        )}
      </ul>
      <button type="button" onClick={addNewMeal}>
        Add Meal
      </button>
      <br /> <br />
      <button onClick={goToHomePage} type="button">
        back
      </button>
    </div>
  )
}

export default AddMeal
