import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import Nav from './components/Nav'
import Inicio from './pages/Inicio/Inicio'
import './App.css'

function App() {

  return (
    <>
      <Router>
            <Nav/>
            

           
                <Routes>
                    <Route path='/' element={<Inicio/>}/>
                    <Route />
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
