import React from 'react'
import Searchbar from './Searchbar'
import { useLocation, useNavigate, Link, NavLink } from 'react-router-dom'
import { useEffect, useState, createContext } from 'react'
import "./Display.css"
// import dishContext from './DishContext'

// const dishContext = createContext(0);


const Display = () => {
  const location = useLocation()
  const [items, setItems] = useState([])
  // const [selectedDish, setSelectedDish] = useState("Chicken");
  // const [recipes , setRecipes] = useState([])
  const { food } = location.state || {}
  
  useEffect(() => {
    const fetchData = async () => {
      const d = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
      const j = await d.json()
      console.log(j)
      setItems(j.meals)
    }
  
    fetchData()
  }, [food])
  
  return items? (
    <div className="w-[80vw] h-[calc(100vh-2rem)] m-auto border border-purple-600 p-4 overflow-scroll">
      <Searchbar/>
      <div className='flex justify-center'>
        <div className="mt-4">You searched for: <strong>{food}</strong></div>
      </div>
      

      <div className="cards flex flex-wrap justify-center">
        {items && items.map((item) => (
          <Link key={item.idMeal} to={`/dish/${item.idMeal}`} className="card w-[250px] m-4 p-2 border rounded shadow">
            <img src={item.strMealThumb} alt={item.strMeal} className='w-full h-auto rounded' />
            <h3 className='text-center mt-2'>{item.strMeal}</h3>
          </Link>
        ))}
      </div>
      </div>
  ) : <div className='text-red-700 w-[80vw] h-[calc(100vh-2rem)] m-auto border border-purple-600 p-4 overflow-scroll'>
    <Searchbar/>
    Item you want is either not in the database or you have made a spelling error. Please try again after correcting your mistake or searching something else
  </div>
}

export default Display
