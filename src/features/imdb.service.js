import {createAsyncThunk} from "@reduxjs/toolkit"
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