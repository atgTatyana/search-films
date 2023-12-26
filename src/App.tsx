import { Routes, Route } from "react-router-dom"
import "./App.css"
import { Search } from "./pages/Search"
import { FilmCard } from "./pages/FilmCard"
import { FavoritesList } from "./pages/FavoritesList"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />}></Route>
      <Route path="/:id" element={<FilmCard />}></Route>
      <Route path="/favorites" element={<FavoritesList />}></Route>
    </Routes>
  )
}

export default App
