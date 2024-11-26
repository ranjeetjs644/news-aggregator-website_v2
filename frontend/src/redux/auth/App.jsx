import React from 'react'
import Header from '../../components/Header.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home.jsx'
import Login from '../../pages/Login.jsx'
import Register from '../../pages/Register.jsx'


const App = () => {
    return (
        <>
            <main>
                <Router>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                    </Routes>
                </Router>
            </main>
        </>
    )
}

export default App
