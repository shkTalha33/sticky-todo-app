import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AddTask from './AddTask'
import ShowTask from './ShowTask'
export default function index() {
  return (
    <>
       <Routes>
        <Route path='/'>
            <Route path='sticky' element={<AddTask />}/>
            <Route path='sticky' element={<ShowTask />}/>
        </Route>
       </Routes>
    </>
  )
}
