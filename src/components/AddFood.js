import React, { useContext, useEffect, useState } from 'react'
import FoodContext from './FoodContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function AddFood() {
  const { foods, setFoods } = useContext(FoodContext)
  const [name, setName] = useState('')
  const [foodTypes, setFoodTypes] = useState([])
  // const [host, setHost] = useState(
  //   'https://food-tracker-react-backend.onrender.com/'
  // )
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
        setFoods(response.data)
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
        const response = await axios.get(`${host}api/foods/`)
        const existingFoods = response.data

        const foodExists = existingFoods.some(
          (food) => food.name.toLowerCase() === name.toLowerCase()
        )
        if (foodExists) {
          setMessage(`Food with name "${name}" already exists.`)
          setMessageType('error')
          console.log('Duplicate food detected:', name)
          return
        }
        await axios.post(`${host}api/foods/`, newFood)
        setFoods([...existingFoods, newFood])
        setMessage(`Food with name "${name}" added successfully.`)
        setMessageType('success')
        setName('')
        setSelectedTypes([])
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
      setMessage('Please fill out all fields!')
      setMessageType('error')
    }
  }

  const handleTypeSelection = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    )
    setSelectedTypes(selectedOptions)
  }

  const goToHomePage = () => {
    navigate('/')
  }
  return (
    <div className="form-container">
      {localStorage.getItem('token') ? (
        <>
          <h1>Add a Food</h1>
          <label for="name">Enter the food name:</label>
          <input
            type="text"
            placeholder="Enter food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {name.length > 0 ? (
            <>
              <label for="type">Select the food type/s:</label>
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
            </>
          ) : null}
          {message && <div className={`message ${messageType}`}>{message}</div>}
          <button type="button" onClick={addNewFood}>
            Add Food
          </button>
          <br /> <br />
          <br />
          <button onClick={goToHomePage} type="button">
            back
          </button>
        </>
      ) : (
        <p className="text-center">Please log in to use the food tracker.</p>
      )}
    </div>
  )
}

export default AddFood
