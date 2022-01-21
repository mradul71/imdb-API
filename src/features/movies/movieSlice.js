import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {fetchAllMovies, fetchOneMovie} from "../../services/imdb.service";

export const moviesAdapter = createEntityAdapter({
    selectId: (movie) => movie.id,
})

//thunks
export const allMovies = createAsyncThunk(
    'movie/allMovies',
    async () => {
        const data = await fetchAllMovies();
        return data;
    }
);
export const oneMovie = createAsyncThunk(
    'movie/oneMovie',
    async (id) => {
        const data = await fetchOneMovie(id);
        return data;
    }
);

const movieSlice = createSlice({
    name: "movies",
    initialState: moviesAdapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [allMovies.pending]: ()=>{
            console.log("Pending...");
        },
        [allMovies.fulfilled]: (state, {payload})=>{
            console.log("Fetched successfully :) ");
            moviesAdapter.setAll(state, payload);
        },
        [allMovies.rejected]: ()=>{
            console.log("Fetching Failed :( ");
        },
        [oneMovie.pending]: (s)=>{
            console.log("Updating Pending...");
        },
        [oneMovie.fulfilled]: (state, {payload})=>{
            console.log("Updated successfully :) ");
            moviesAdapter.setOne(state, payload);
        },
        [oneMovie.rejected]: ()=>{
            console.log("Updation failed :(");
        }
    }
})
export const movieSelectors= moviesAdapter.getSelectors(state => state.movies);
export default movieSlice.reducer;