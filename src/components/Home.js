import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchAllMovies } from '../features/imdb.service';
import MoviesList from './MoviesList';

function Home() {

    const dispatch = useDispatch(); 

    const [search, setSearch] = useState("");
      
      const triggerSearch = (e) => {
        e.preventDefault();
        dispatch(fetchAllMovies(search));
        setSearch("");
      }
    
      useEffect(() => {
        dispatch(fetchAllMovies(search));
      }, [dispatch]);

    return (
      <>
      <div>
        <div className='searching'>
            <input className='search-field' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button variant="primary" className='search-button' onClick={triggerSearch}>Search</Button>
        </div>
        <MoviesList />
      </div>
      </>
    )
}

export default Home
