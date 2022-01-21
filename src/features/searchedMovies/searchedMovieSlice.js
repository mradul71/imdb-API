import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {fetchSearchMovies} from "../../services/imdb.service";
export const searchesAdapter = createEntityAdapter({
    selectId: (movie) => movie.id,
})

//thunks
export const searchMovies = createAsyncThunk(
    'movie/searchMovies',
    async (search) => {
        const data = await fetchSearchMovies(search);
        return data;
    }
);


const searchedMovieSlice = createSlice({
    name: "searchedMovies",
    initialState: searchesAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [searchMovies.pending]: ()=>{
            console.log("Search results pending...");
        },
        [searchMovies.fulfilled]: (state, {payload})=>{
            console.log("Search results fetched successfully :) ");
            searchesAdapter.setAll(state, payload);
        },
        [searchMovies.rejected]: ()=>{
            console.log("Search results fetching Failed :( ");
        }
    }
})
export const searchSelectors= searchesAdapter.getSelectors(state => state.searchedMovies);
export default searchedMovieSlice.reducer;