import { useAppSelector, useAppDispatch } from "../store/hooks"
import { useNavigate } from "react-router-dom"
import { fetchFilms, addInFavorites, setSearch } from "../slices/filmsSlice"
import { IFilm } from "../slices/filmsSlice"

export const Search = () => {
  const dispatch = useAppDispatch()
  const { films, loading, error, search } = useAppSelector(
    (state) => state.films,
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = import.meta.env.VITE_FILMS_URL + search
    console.log(url)
    dispatch(fetchFilms(url))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch(setSearch(value))
  }

  const navigate = useNavigate()
  const handleFilmCard = (id: string) => {
    const url = import.meta.env.VITE_FILM_ID_URL + id
    console.log(url)
    dispatch(fetchFilms(url))
    navigate(`/${id}`)
  }

  const handleFavorites = () => {
    navigate(`/favorites`)
  }

  return (
    <>
      <div className="header">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="film"
            style={{ color: "rgb(91, 91, 219)", fontSize: "1.3em" }}
          >
            Enter movie title:
          </label>
          <input
            id="film"
            type="text"
            name="film"
            value={search}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>
        <button className="favorites-button" onClick={handleFavorites}>
          Show Favorites
        </button>
      </div>

      <div style={{ margin: "35px" }}>
        {loading && <h4>Loading...</h4>}
        {error && <h4 style={{ color: "red" }}>Error! {error}</h4>}
      </div>

      <ul>
        {films?.length ? (
          films.map((film: IFilm) => (
            <div className="film" key={film.imdbID}>
              <hr style={{ width: "580px", marginLeft: "0" }} />
              <li className="film-data">
                <span
                  style={{ fontWeight: "600", cursor: "pointer" }}
                  onClick={() => handleFilmCard(film.imdbID)}
                >
                  {film.Title}, {film.Year}
                </span>
                <img src={film.Poster} alt="" height="150px" />
                <button onClick={() => dispatch(addInFavorites(film.imdbID))}>
                  Add in Favorites
                </button>
              </li>
            </div>
          ))
        ) : (
          <>{!error && <li key={crypto.randomUUID()}>No such films!</li>}</>
        )}
      </ul>
    </>
  )
}
