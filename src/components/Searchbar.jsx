import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate  } from 'react-router-dom'

const Searchbar = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = (data) => {
    navigate('/display', { state: { food: data.food } })
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[80vw] m-auto p-4 flex flex-col items-center justify-center gap-4">
        <input
          placeholder='Search From Item'
          {...register("food", { required: true })}
          className='h-10 px-4 py-2 border border-gray-400 rounded w-[55vw]'
        />

        {errors.food && (
          <div className='text-red-600 text-sm'>Food field cannot be empty</div>
        )}

        <input
          type="submit"
          className="h-10 w-[5vw] flex justify-center items-center bg-purple-500 text-white rounded cursor-pointer"
        />
      </form>
    </div>
  )
}

export default Searchbar
