import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {fetchAllMovies, fetchOneMovie, fetchSearchMovies} from "../imdb.service";

export const moviesAdapter = createEntityAdapter({
    selectId: (movie) => movie.id,
})
export const searchesAdapter = createEntityAdapter({
    selectId: (movie) => movie.id,
})

const movieSlice = createSlice({
    name: "movies",
    initialState: moviesAdapter.getInitialState({loading: false}),
    reducers: {},
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
        [fetchSearchMovies.pending]: ()=>{
            console.log("Searchh results pending...");
        },
        [fetchSearchMovies.fulfilled]: (state, {payload})=>{
            console.log("Searchh results fetched successfully :) ");
            searchesAdapter.setAll(state, payload);
        },
        [fetchSearchMovies.rejected]: ()=>{
            console.log("Searchh results fetching Failed :( ");
        },
        [fetchOneMovie.pending]: (s)=>{
            console.log("Updating Pending...");
        },
        [fetchOneMovie.fulfilled]: (state, {payload})=>{
            console.log("Updated successfully :) ");
            moviesAdapter.setOne(state, payload);
        },
        [fetchOneMovie.rejected]: ()=>{
            console.log("Updation failed :(");
        }
    }
})
export const movieSelectors= moviesAdapter.getSelectors(state => state.movies);
export const searchSelectors= searchesAdapter.getSelectors(state => state.searchedMovies);
export default movieSlice.reducer;