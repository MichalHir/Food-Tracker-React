import React, { useContext, useEffect, useState } from 'react'
import FoodContext from './FoodContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function AddFood() {
  const { foods, setFoods } = useContext(FoodContext)
  const [name, setName] = useState('')
  const [foodTypes, setFoodTypes] = useState([])
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/foodTypes/')
      .then((response) => {
        setFoodTypes(response.data)
      })
      .catch((error) => {
        console.error('Error fetching foods TYPES:', error)
      })
  }, [])
  const [selectedTypes, setSelectedTypes] = useState([])
  const navigate = useNavigate()

  const addNewFood = async () => {
    if (name && selectedTypes.length > 0) {
      const newFood = { name, typesOfFood: selectedTypes }

      try {
        // const response = await axios.get('http://localhost:3005/foods') // Fetch existing foods
        const response = await axios.get('http://127.0.0.1:8000/api/foods/')
        setFoods(response.data)
        const existingFoods = response.data
        const foodExists = existingFoods.some(
          (food) => food.name.toLowerCase() === name.toLowerCase()
        )
        if (foodExists) {
          alert(`Food with name "${name}" already exists.`)
          console.log('Duplicate food detected:', name)
          return // Stop execution if food exists
        }
        // await axios.post('http://localhost:3005/foods', newFood)
        await axios.post('http://127.0.0.1:8000/api/foods/', newFood)
        setFoods([...foods, newFood])
        setName('')
        setSelectedTypes([])
        console.log('Food Added:', newFood)
      } catch (error) {
        console.error('Error saving food:', error)
        alert('Failed to add food. Please try again.')
      }
    } else {
      alert('Please fill out all fields!')
      console.log('Please fill out all fields')
    }
  }
  const goToHomePage = () => {
    navigate('/')
  }
  const handleTypeSelection = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    )
    setSelectedTypes(selectedOptions)
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
      <button type="button" onClick={addNewFood}>
        Add Food
      </button>
      <div>{foods.map((food) => food.name)}</div>
      <button onClick={goToHomePage} type="button">
        back
      </button>
    </div>
  )
}

export default AddFood
