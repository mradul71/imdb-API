import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

export const fetchAllMovies = async () => {
    const response = await axios.get(
        `https://imdb-api.com/en/API/Top250Movies/${process.env.REACT_APP_KEY}`
    )
    return response.data.items;
};

export const fetchOneMovie = async (id) => {
    const response = await axios.get(
        `https://imdb-api.com/en/API/Title/${process.env.REACT_APP_KEY}/${id}/FullCast,Posters,Images,Ratings,`
    );
    return response.data;
};

export const fetchSearchMovies = async (search) => {
    const response = await axios.get(
        `https://imdb-api.com/en/API/SearchTitle/${process.env.REACT_APP_KEY}/${search}`
    );
    return response.data.results;
};
