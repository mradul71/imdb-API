import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {fetchAllMovies, fetchOneMovie} from "../imdb.service";

export const moviesAdapter = createEntityAdapter({
    selectId: (movie) => movie.id,
})

const movieSlice = createSlice({
    name: "movies",
    initialState: moviesAdapter.getInitialState({loading: false}),
    reducers: {
        cleanPreviousMovieDetails: (state)=>{
            state.oneMovie = {};
        }
    },
    extraReducers: {
        [fetchAllMovies.pending]: ()=>{
            console.log("Pending...");
        },
        [fetchAllMovies.fulfilled]: (state, {payload})=>{
            console.log("Fetched successfully :) ");
            moviesAdapter.setAll(state, payload);
        },
        [fetchAllMovies.rejected]: ()=>{
            console.log("Rejected :( ");
        },
        [fetchOneMovie.fulfilled]: (state, {payload})=>{
            console.log("Fetched successfully :) ");
            return {...state, oneMovie: payload};
        }
    }
})
//stuck how to perform that one movie detail part
//till now i have done that movie adapter will have entities of all movies
//but how to add and get a single movie if present in the adapter

export const {cleanPreviousMovieDetails} = movieSlice.actions;
export const getAllMovies = moviesAdapter.getSelectors(
    (state) => state.movies
)
export const getMovieDetails = (state) => state.movies.oneMovie
export default movieSlice.reducer;