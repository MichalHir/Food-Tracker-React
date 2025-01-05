import React, { useContext, useState } from 'react'
import FoodContext from './FoodContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddMeal() {
  const { foods } = useContext(FoodContext)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [selectedFoods, setSelectedFoods] = useState([])
  const navigate = useNavigate()

  const handleFoodSelection = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    )
    setSelectedFoods(selectedOptions)
  }

  const addNewMeal = async () => {
    console.log('!!!')
    if (date && time && selectedFoods.length > 0) {
      const newMeal = { date, time, foods: selectedFoods }
      try {
        const response = await axios.post(
          'http://localhost:3005/meals',
          newMeal
        )
        setTime('')
        setDate('')
        setSelectedFoods([])
        console.log('Meal Added:', newMeal)
      } catch (error) {
        console.error('Error saving meal:', error)
        alert('Failed to add meal. Please try again.')
      }
    } else {
      alert('Please fill out all fields!')
      console.log('Please fill out all fields')
    }
  }
  const goToHomePage = () => {
    navigate('/')
  }
  return (
    <div>
      <h1>Add a Meal</h1>
      <label for="date">Date:</label>
      <input
        type="date"
        className="form-control"
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
      <label for="foods">Select Foods:</label>
      <select
        id="foods"
        name="foods"
        multiple
        value={selectedFoods}
        onChange={handleFoodSelection}
        required
        className="form-control"
      >
        {foods.map((food, index) => (
          <option key={index} value={food}>
            {food}
          </option>
        ))}
      </select>
      <button type="button" onClick={addNewMeal}>
        Add Meal
      </button>
      <button onClick={goToHomePage} type="button">
        back
      </button>
    </div>
  )
}

export default AddMeal
