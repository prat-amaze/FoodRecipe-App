// App.jsx
import Searchbar from './components/Searchbar'
import Display from './components/Display'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dish from './components/Dish';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div className="w-[80vw] h-[calc(100vh-2rem)] m-auto border border-purple-600 p-4 "><Searchbar/></div>,
    },
    {
      path: "/display",
      element: <Display />,
    },
    {
      path: "/dish/:id",
      element: <Dish />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}/>;
    </>
  )
}

export default App
