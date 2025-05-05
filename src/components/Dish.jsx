import { React, useContext, useEffect, useState } from 'react'
import "./Display.css"
import { useParams } from 'react-router-dom'
import Searchbar from './Searchbar'
import youtubeIcon from '../assets/icons8-youtube.svg'; // adjust the relative path
// import dishContext from './DishContext'


const Dish = () => {
  const { id } = useParams()
  const [dish, setDish] = useState(null)
  const [ingredients, setIngredients]= useState([])

  useEffect(() => {
    const fetchDish = async () => {
      const d = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      const j = await d.json()
      setDish(j.meals[0])
      
      let arr = [];
      const meal = j.meals[0];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
          arr.push(`${ingredient} - ${measure}`);
        }
      }
      setIngredients(arr);
    }
    fetchDish()
  }, [id])

  useEffect(() => {
    console.log(dish)
  }, [dish])

  useEffect(() => {
    console.log(ingredients)
  }, [ingredients])
  
  
  
  return dish ? (
    <div className="w-[80vw] h-[calc(100vh-2rem)] m-auto border border-purple-600 p-4 overflow-auto">
      <Searchbar/>
      <div className="info w-[60vw] m-auto">
        <div className="flex justify-center m-3 font-extrabold text-yellow-500 text-xl">
          <a href={dish.strYoutube} target="_blank" rel="noopener noreferrer">{dish.strMeal}</a>
          <img src={youtubeIcon} alt="YouTube icon" className="w-6 h-6 inline ml-2" />
        </div>

        <div className="thumbnail flex justify-center gap-6">
          <img src={dish.strMealThumb} alt= {dish.strMeal} className="w-[250px] h-[full] rounded-xl"/>
          <div className="flex flex-col items-center justify-center">
            {ingredients.map(ing => {
              return <div className="w-[350px]">{ing}</div>
            })}
          </div>
        </div>

        <div className="m-[20px]">
          <p className="text-blue-700 font-bold">Instructions:</p> {dish.strInstructions}
        </div>

      </div>
    </div> 
  ) : <div className='text-red-700 w-[80vw] h-[calc(100vh-2rem)] m-auto border border-purple-600 p-4'>
  <Searchbar/>
  Item you want is either not in the database or you have made a spelling error. Please try again after correcting your mistake or searching something else
</div>
}

export default Dish
