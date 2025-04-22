import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import Nav from './components/Nav'
import Home from './pages/Inicio/Home'
import Marcas from './pages/Inicio/Marcas'
import './App.css'

function App() {

  return (
    <>
      <Router>
            <Nav/>
            

           
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='marcas' element={<Marcas/>}/>
                    <Route />
                    <Route  />
                    <Route  />
                    <Route/>



                    </Routes>
                    
           
            </Router>
    </>
  )
}

export default App
