import React, { useContext, useState } from 'react'
import FoodContext from './FoodContext'
import { useNavigate } from 'react-router-dom'

function AddFood() {
  const { foods, setFoods } = useContext(FoodContext)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const navigate = useNavigate() // This must be inside the component body

  const addNewFood = () => {
    console.log('!!!')
    if (name && type) {
      const newFood = { name, type }
      console.log('Food Added:', newFood)
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
      <h1>Add a Food</h1>
      <label for="name">Name:</label>
      {/* <br><br> */}
      <input
        type="string"
        className="form-control"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label for="type">Type:</label>
      <input
        type="string"
        className="form-control"
        placeholder="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      {/* <br><br> */}
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
