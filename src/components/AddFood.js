import React, { useContext, useState } from 'react'
import FoodContext from './FoodContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddFood() {
  const { foods, setFoods } = useContext(FoodContext)
  const [name, setName] = useState('')
  const [foodTypes, setFoodTypes] = useState(['carbs', 'protein'])
  const [selectedTypes, setSelectedTypes] = useState([])
  const navigate = useNavigate()

  const addNewFood = async () => {
    console.log('!!!')
    if (name && selectedTypes.length > 0) {
      const newFood = { name, type: selectedTypes }
      try {
        const response = await axios.post(
          'http://localhost:3005/foods',
          newFood
        )
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
    <div>
      <h1>Add a Food</h1>
      <label for="name">Name:</label>
      <input
        type="text"
        className="form-control"
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
        className="form-control"
      >
        {foodTypes.map((foodTypes, index) => (
          <option key={index} value={foodTypes}>
            {foodTypes}
          </option>
        ))}
      </select>
      <button type="button" onClick={addNewFood}>
        Add Food
      </button>
      <button onClick={goToHomePage} type="button">
        back
      </button>
    </div>
  )
}

export default AddFood
