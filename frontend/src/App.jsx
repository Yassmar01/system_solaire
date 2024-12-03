import { useEffect, useState } from 'react'
import Login from './Pages/Login'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import UserContext from './context/Context'
function App() {



    return (
        <UserContext>

            <RouterProvider router={router} />
        </UserContext>


    )
}

export default App
