import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router'
import UserContext from '../context/AdminContext'


function App() {
    return (
        <>
            <UserContext>
                <RouterProvider router={router} />
            </UserContext>
        </>
    )
}
export default App
