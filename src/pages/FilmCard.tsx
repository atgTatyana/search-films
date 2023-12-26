import { useAppSelector } from "../store/hooks"
import { IFilmCard } from "../slices/filmsSlice"

export const FilmCard = () => {
  const { filmCard, loading, error } = useAppSelector((state) => state.films)

  return (
    <>
      {filmCard && (filmCard as IFilmCard) && (
        <div className="film-card">
          <img src={filmCard.Poster} alt="" height="300px" />
          <div>
            <div style={{ color: "rgb(91, 91, 219)", fontSize: "1.3em" }}>
              {filmCard.Title}
            </div>
            <div>{filmCard.Year}</div>
            <div>
              <span style={{ color: "rgb(91, 91, 219)" }}>Genre: </span>
              {filmCard.Genre}
            </div>
            <div>
              <span style={{ color: "rgb(91, 91, 219)" }}>Duration: </span>
              {filmCard.Runtime}
            </div>
            <div>
              <span style={{ color: "rgb(91, 91, 219)" }}>Director: </span>
              {filmCard.Director}
            </div>
            <div>
              <span style={{ color: "rgb(91, 91, 219)" }}>Actors: </span>
              {filmCard.Actors}
            </div>
            <div>
              <span style={{ color: "rgb(91, 91, 219)" }}>Rating: </span>
              {filmCard.imdbRating}
            </div>
            <div>
              <span style={{ color: "rgb(91, 91, 219)" }}>Plot: </span>
              {filmCard.Plot}
            </div>
          </div>
        </div>
      )}

      <div style={{ margin: "35px" }}>
        {loading && <h4>Loading...</h4>}
        {error && <h4 style={{ color: "red" }}>Error! {error}</h4>}
      </div>
    </>
  )
}
