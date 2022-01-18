import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllMovies = createAsyncThunk(
    'movie/fetchAllMovies',
    async (search) => {
        if(search===""){
            const data = await axios.get(
                `https://imdb-api.com/en/API/Top250Movies/${process.env.REACT_APP_KEY}`
            );
            return data.data.items;
        }
        else{
            const data = await axios.get(
                `https://imdb-api.com/en/API/SearchTitle/${process.env.REACT_APP_KEY}/${search}`
            );
            return data.data.results;
        }
    }
);

export const fetchOneMovie = createAsyncThunk(
    'movie/fetchOneMovie',
    async (id) => {
        const data = await axios.get(
            `https://imdb-api.com/en/API/Title/${process.env.REACT_APP_KEY}/${id}/FullCast,Posters,Images,Ratings,`
        );
      return data.data;
    }
);

const initialState = {
    movies: [],
    oneMovie: {}
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
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
            return {...state, movies: payload};
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

export const {cleanPreviousMovieDetails} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies
export const getMovieDetails = (state) => state.movies.oneMovie
export default movieSlice.reducer;