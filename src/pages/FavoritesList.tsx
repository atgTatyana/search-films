import { useAppSelector, useAppDispatch } from "../store/hooks"
import { deleteFromFavorites } from "../slices/filmsSlice"
import { IFilm } from "../slices/filmsSlice"

export const FavoritesList = () => {
  const dispatch = useAppDispatch()
  const { filmsFavorites } = useAppSelector((state) => state.films)

  return (
    <>
      <h3 style={{ margin: "40px 40px 0" }}>Favorites List</h3>
      <ul>
        {filmsFavorites?.length ? (
          filmsFavorites.map((film: IFilm) => (
            <div className="film" key={film.imdbID}>
              <hr style={{ width: "620px", marginLeft: "0" }} />
              <li className="film-data">
                <span style={{ fontWeight: "600" }}>
                  {film.Title}, {film.Year}
                </span>
                <img src={film.Poster} alt="" height="150px" />
                <button
                  onClick={() => dispatch(deleteFromFavorites(film.imdbID))}
                >
                  Delete from Favorites
                </button>
              </li>
            </div>
          ))
        ) : (
          <li key={crypto.randomUUID()}>There is no films in Favorites!</li>
        )}
      </ul>
    </>
  )
}
