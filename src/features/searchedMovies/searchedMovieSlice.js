import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {fetchSearchMovies} from "../imdb.service";
export const searchesAdapter = createEntityAdapter({
    selectId: (movie) => movie.id,
})

const searchedMovieSlice = createSlice({
    name: "searchedMovies",
    initialState: searchesAdapter.getInitialState({loading: false}),
    reducers: {},
    extraReducers: {
        [fetchSearchMovies.pending]: ()=>{
            console.log("Searchh results pending...");
        },
        [fetchSearchMovies.fulfilled]: (state, {payload})=>{
            console.log("Searchh results fetched successfully :) ");
            searchesAdapter.setAll(state, payload);
        },
        [fetchSearchMovies.rejected]: ()=>{
            console.log("Searchh results fetching Failed :( ");
        }
    }
})
export const searchSelectors= searchesAdapter.getSelectors(state => state.searchedMovies);
export default searchedMovieSlice.reducer;