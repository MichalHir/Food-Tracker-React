import React, { useContext, useEffect, useState } from 'react'
import FoodContext from './FoodContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function AddFood() {
  const { foods, setFoods } = useContext(FoodContext)
  const [name, setName] = useState('')
  const [foodTypes, setFoodTypes] = useState([])
  const [host, setHost] = useState('http://127.0.0.1:8000/')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'

  useEffect(() => {
    axios
      .get(`${host}api/foodTypes/`)
      .then((response) => {
        setFoodTypes(response.data)
      })
      .catch((error) => {
        console.error('Error fetching foods TYPES:', error)
      })
    axios
      .get(`${host}api/foods/`)
      .then((response) => {
        setFoods(response.data) // Update the foods state with the response
      })
      .catch((error) => {
        console.error('Error fetching foods:', error)
      })
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000) // Clear message after 5 seconds
      return () => clearTimeout(timer) // Cleanup timer
    }
  }, [message])
  const [selectedTypes, setSelectedTypes] = useState([])
  const navigate = useNavigate()

  const addNewFood = async () => {
    if (name && selectedTypes.length > 0) {
      const newFood = { name, typesOfFood: selectedTypes }
      try {
        // Fetch existing foods to check for duplicates
        const response = await axios.get(`${host}api/foods/`)
        const existingFoods = response.data

        const foodExists = existingFoods.some(
          (food) => food.name.toLowerCase() === name.toLowerCase()
        )
        if (foodExists) {
          // Set error message if food already exists
          setMessage(`Food with name "${name}" already exists.`)
          setMessageType('error')
          console.log('Duplicate food detected:', name)
          return // Stop execution if food exists
        }
        // Add the new food to the backend
        await axios.post(`${host}api/foods/`, newFood)

        // Update the local state with the new food
        setFoods([...existingFoods, newFood])
        // Set success message
        setMessage(`Food with name "${name}" added successfully.`)
        setMessageType('success')
        // Reset form fields
        setName('')
        setSelectedTypes([])
        console.log('Food Added:', newFood)
      } catch (error) {
        console.error('Error saving food:', error)
        if (error.response) {
          setMessage(
            `Failed to add "${name}": ${
              error.response.data.message || 'Unknown error occurred'
            }.`
          )
        } else {
          setMessage(`Failed to add "${name}". Please try again.`)
        }
        setMessageType('error')
      }
    } else {
      // Alert for incomplete form fields
      setMessage('Please fill out all fields!')
      setMessageType('error')
      console.log('Please fill out all fields')
    }
  }

  const handleTypeSelection = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    )
    setSelectedTypes(selectedOptions)
  }

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(name.toLowerCase())
  )

  const goToHomePage = () => {
    navigate('/')
  }
  return (
    <div className="form-container">
      <h1>Add a Food</h1>
      <label for="name">Name:</label>
      <input
        type="text"
        placeholder="Enter food name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label for="type">Type:</label>
      <select
        id="foods"
        name="foods"
        multiple
        value={selectedTypes}
        onChange={handleTypeSelection}
        required
      >
        {foodTypes.map((foodTypes, index) => (
          <option key={index} value={foodTypes.id}>
            {foodTypes.type}
          </option>
        ))}
      </select>
      <label htmlFor="foods">Food List:</label>
      <select id="foods" name="foods" multiple value={name}>
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (
            <option key={index}>{food.name}</option>
          ))
        ) : (
          <option disabled>No foods found</option>
        )}
      </select>
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <button type="button" onClick={addNewFood}>
        Add Food
      </button>
      <br /> <br />
      <br />
      <button onClick={goToHomePage} type="button">
        back
      </button>
    </div>
  )
}

export default AddFood
