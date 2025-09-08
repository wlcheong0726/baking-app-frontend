import { Routes, Route } from 'react-router-dom'
import './App.css'

import NavBar from "./components/common/NavBar";
import { HomePage, BlogsPage, RecipesPage } from './pages'

function App() {
  return (
    <>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>

          <Route path="/blogs/*" element={<BlogsPage />}></Route>

          <Route path="/recipes" element={<RecipesPage />}></Route>
        </Routes>
    </>
  )
}

export default App
