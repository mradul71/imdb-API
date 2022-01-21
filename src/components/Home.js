import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MoviesList from './MoviesList';

function Home() {
    let navigate = useNavigate();

    const [search, setSearch] = useState("");
      
    const triggerSearch = (e) => {
      navigate(`/search-results/${search}`);
      setSearch("");
    }

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
