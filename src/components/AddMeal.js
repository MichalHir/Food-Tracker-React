import React, { useContext, useState } from 'react'
import FoodContext from './FoodContext'
import { useNavigate } from 'react-router-dom'

function AddMeal() {
  const { foods, setFoods } = useContext(FoodContext)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [selectedFoods, setSelectedFoods] = useState([])
  const navigate = useNavigate() // This must be inside the component body

  const handleFoodSelection = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    )
    setSelectedFoods(selectedOptions)
  }

  const addNewMeal = () => {
    console.log('!!!')
    if (date && time && selectedFoods.length > 0) {
      const newMeal = { date, time, foods: selectedFoods }
      console.log('Meal Added:', newMeal)
      // Optionally update the context or perform an API call here
    } else {
      alert('Please fill out all fields!')
      console.log('Please fill out all fields')
    }
  }
  const goToHomePage = () => {
    navigate('/') // Use this function for navigation
  }
  return (
    <div>
      <h1>Add a Meal</h1>
      <label for="date">Date:</label>
      {/* <br><br> */}
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
      {/* <br><br> */}
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
      {/* <br><br> */}
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
