import { createContext } from 'react'

const FoodContext = createContext()

export default FoodContext

// import React, { createContext, useState, useEffect } from 'react'
// import axios from 'axios'
// import { createContext, useEffect, useState } from 'react'

// const FoodContext = createContext()

// export const FoodProvider = ({ children }) => {
//   //   const [foods, setFoods] = useState([])
//   const [foods, setFoods] = useState([
//     { id: '1', name: 'rice', type: 'carbs' },
//     { id: '2', name: 'chicken', type: 'protein' },
//     { id: 'f20d', name: 'bread', type: ['carbs'] },
//   ])

//   useEffect(() => {
//     const fetchFoods = async () => {
//       try {
//         const response = await axios.get('http://localhost:3005/foods')
//         setFoods(response.data.foods) // Ensure the API returns an array of foods
//       } catch (error) {
//         console.error('Error fetching foods:', error)
//       }
//     }
//     fetchFoods()
//   }, [])

//   return (
//     <FoodContext.Provider value={{ foods }}>{children}</FoodContext.Provider>
//   )
// }

// export default FoodContext
