import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface IFilm {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface IFilmCard {
  Poster: string
  Title: string
  Year: string
  Genre: string
  Runtime: string
  Director: string
  Actors: string
  imdbRating: string
  Plot: string
}

export interface FilmsState {
  films: IFilm[]
  loading: boolean
  error: string
  filmsFavorites: IFilm[]
  search: string
  filmCard: IFilmCard | null
}

const initialState = {
  films: [],
  loading: false,
  error: "",
  filmsFavorites: [],
  search: "",
  filmCard: null,
} as FilmsState

export const fetchFilms = createAsyncThunk(
  "films/fetchFilms",
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await fetch(url)

      if (!response.ok) {
        return rejectWithValue("Loading films error!")
      }

      return await response.json()
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    addInFavorites: (state, action) => {
      const index = state.filmsFavorites.findIndex(
        (film) => film.imdbID === action.payload,
      )
      if (index === -1) {
        const film = state.films.filter(
          (film) => film.imdbID === action.payload,
        )
        state.filmsFavorites.push(film[0])
      }
    },

    setSearch: (state, action) => {
      state.search = action.payload
    },

    deleteFromFavorites: (state, action) => {
      state.filmsFavorites = state.filmsFavorites.filter(
        (film) => film.imdbID !== action.payload,
      )
    },
  },

  // extraReducers - работает с асинхронными вещами
  extraReducers: (builder) => {
    builder
      // это отправили запрос - видим loading..., обнулили ошибки
      .addCase(fetchFilms.pending, (state) => {
        state.loading = true
        state.error = ""
      })

      // пришли данные с сервера без ошибки - записываем в стейт, loading отключаем
      .addCase(fetchFilms.fulfilled, (state, action) => {
        if (action.payload.Response === "False") {
          state.error = action.payload.Error
          state.films = []
        } else {
          action?.payload?.Search
            ? (state.films = action.payload.Search)
            : (state.filmCard = action.payload)
          state.error = ""
        }
        state.loading = false
      })

      // произошла ошибка - loading отключаем, и передаем в стейт ошибку
      .addCase(fetchFilms.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { addInFavorites, setSearch, deleteFromFavorites } =
  filmsSlice.actions
export default filmsSlice.reducer
