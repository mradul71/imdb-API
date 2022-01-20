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
            state.loading = true;
            moviesAdapter.setAll(state, payload);
        },
        [fetchAllMovies.rejected]: ()=>{
            console.log("Fetching Failed :( ");
        },
        [fetchOneMovie.pending]: (s)=>{
            console.log("Updating Pending...");
        },
        [fetchOneMovie.fulfilled]: (state, {payload})=>{
            console.log("Updated successfully :) ");
            //can't update :(
            moviesAdapter.removeOne(state, payload.id);
            moviesAdapter.addOne(state, payload);
        },
        [fetchOneMovie.rejected]: ()=>{
            console.log("Updation failed :(");
        }
    }
})
export const movieSelectors= moviesAdapter.getSelectors(state => state.movies);
export const getMovieDetails = (state) => state.movies.oneMovie
export default movieSlice.reducer;