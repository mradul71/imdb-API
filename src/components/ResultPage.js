import React, { useEffect, useState } from 'react';
import axios from "axios";

function Home() {

    const [movies, setMovies] = useState([]);
    const fetchMoviesSearch = async () => {
        const data = await axios.get(
          `https://imdb-api.com/en/API/SearchTitle/k_w3jugmpf/${search}`
        );
        console.log(data.data.items);
        setMovies(data.data.items);
      };
    
      useEffect(() => {
        fetchMoviesSearch();
      }, []);

    return (
        <div className='movies'>
        
            {movies &&
          movies.map((c) => (
            <div key={c.id}>
                
              <p>id={c.id}</p>
              <img src={c.image} />
              <p>title={c.title}</p>
              <p>date={c.year}</p>
              <p>media_type="movie"</p>
              <p>vote_average={c.imDbRating}</p>
            </div>
          ))}
        </div>
    )
}

export default Home
