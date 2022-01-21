import {configureStore} from '@reduxjs/toolkit'
import moviesReducer from './movies/movieSlice'
import searchedMoviesReducer from './searchedMovies/searchedMovieSlice'

export const store = configureStore({
    reducer: {movies: moviesReducer, searchedMovies: searchedMoviesReducer}
});
