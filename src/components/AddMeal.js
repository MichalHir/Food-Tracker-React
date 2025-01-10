import React, { useContext, useEffect, useState } from 'react'
import FoodContext from './FoodContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddMeal() {
  const { foods } = useContext(FoodContext)
  const [foodsChoice, setFoodsChoice] = useState([])
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [selectedFoods, setSelectedFoods] = useState([])
  const [host, setHost] = useState('http://127.0.0.1:8000/')
  const navigate = useNavigate()

  console.log('Foods from Context:', foods)
  const handleFoodSelection = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    )
    setSelectedFoods(selectedOptions)
  }

  useEffect(() => {
    if (foods.length === 0) {
      axios
        // .get('http://localhost:3005/foods')
        .get(`${host}api/foods/`)
        .then((response) => {
          setFoodsChoice(response.data)
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
  }, [])

  const addNewMeal = async () => {
    if (date && time && selectedFoods.length > 0) {
      const newMeal = { date, time, food_info: selectedFoods }
      try {
        // await axios.post('http://localhost:3005/meals', newMeal)
        await axios.post(`${host}api/meals/`, newMeal)
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
      <label for="foods">Select Foods:</label>
      <select
        id="foods"
        name="foods"
        multiple
        value={selectedFoods}
        onChange={handleFoodSelection}
        required
      >
        <h2>Select Foods</h2>
        {loading ? (
          <option disabled>Loading foods...</option>
        ) : foodsChoice.length > 0 ? (
          foodsChoice.map((food) => (
            <option key={food.id} value={food.id}>
              {food.name}
            </option>
          ))
        ) : (
          <option disabled>No foods available</option>
        )}
      </select>
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
