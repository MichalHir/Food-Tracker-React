import React, { useContext, useEffect, useState } from 'react'
import FoodContext from './FoodContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function SearchFood() {
  const { foods, setFoods } = useContext(FoodContext)
  const [name, setName] = useState('')
  const [foodTypes, setFoodTypes] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([]) // Array for multiple types
  const [host, setHost] = useState('http://127.0.0.1:8000/')

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
  }, [])
  const navigate = useNavigate()

  const filteredFoods = foods.filter((food) => {
    const matchesName = food.name.toLowerCase().startsWith(name.toLowerCase())
    const matchesType =
      selectedTypes.length === 0 || // If no type is selected, include all foods
      food.typesOfFood.some((typeId) => {
        const foodType = foodTypes.find((f) => f.id === typeId)
        return selectedTypes.includes(foodType?.type)
      })
    return matchesName && matchesType
  })
  const mapFoodTypesInfoToNames = (foodInfo) => {
    return foodInfo
      .map((typeId) => {
        const foodType = foodTypes.find((f) => f.id === typeId)
        return foodType ? foodType.type : null
      })
      .filter(Boolean)
      .join(', ')
  }
  const handleTypeChange = (e) => {
    const options = e.target.options
    const selectedValues = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value)
      }
    }
    setSelectedTypes(selectedValues)
  }
  const goToHomePage = () => {
    navigate('/')
  }
  return (
    <div className="form-container">
      {localStorage.getItem('token') ? (
        <>
          <h1>Search a Food</h1>
          <label for="name">Search by Name:</label>
          <input
            type="text"
            placeholder="Enter food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="type">Search by Type:</label>
          <select
            id="type"
            name="type"
            value={selectedTypes} // Array of selected types
            onChange={handleTypeChange}
            multiple
          >
            {foodTypes.map((type) => (
              <option key={type.id} value={type.type}>
                {type.type}
              </option>
            ))}
          </select>
          <br /> <br />
          <label htmlFor="foods">Food List:</label>
          <select id="foods" name="foods" multiple value={name}>
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food) => (
                <option key={food.id}>
                  {food.name} -{' '}
                  {food.typesOfFood.length > 0
                    ? mapFoodTypesInfoToNames(food.typesOfFood)
                    : 'No types available'}
                </option>
              ))
            ) : (
              <option disabled>No foods found</option>
            )}
          </select>
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

export default SearchFood
