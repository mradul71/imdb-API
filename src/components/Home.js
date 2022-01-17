import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Card, Col, Row } from 'react-bootstrap';
import './home.css'

function Home() {

    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [searchedMovies, setSearchedMovies] = useState([]);
    const fetchMovies = async () => {
        const data = await axios.get(
          `https://imdb-api.com/en/API/Top250Movies/k_43my2mp2`
        );
        setMovies(data.data.items);
        setSearchedMovies([]);
      };
    
      const fetchMoviesSearch = async (search) => {
        setMovies([]);
        const data = await axios.get(
          'https://imdb-api.com/en/API/SearchTitle/k_43my2mp2/'+search
        );
        console.log(data.data.results);
        setSearchedMovies(data.data.results);
      };

      const triggerSearch = async () => {
        await fetchMoviesSearch(search);
      }
    
      useEffect(() => {
        fetchMovies();
      }, []);

    return (
        <div className='movies'>
        
            <div className='searching'>
                <input className='search-field' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button variant="primary" className='search-button' onClick={triggerSearch}>Search</Button>
                {movies.length > 0 ? <h1 className='result'>Top 250 Movies</h1> : null}
                {searchedMovies.length > 0 ? <h1 className='result'>Results for: {search}</h1> : null}
            </div>
            
            <Row xs={1} md={4} className="g-4 row">
            {searchedMovies && 
          searchedMovies.map((c) => (
            <Col className='col'>
                <Card className='card'>
                    <Card.Img className='card-image' variant="top" src={c.image} />
                    <Card.Body>
                    <Card.Title className="card-title">{c.title}</Card.Title>
                    <Card.Text className='card-text-search'>
                        <div className='year'>Year: {c.description}</div>
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            </Col>
            ))}
        
          {movies && 
          movies.map((c) => (
              
            <Col className='col'>
                <Card className='card'>
                    <Card.Img className='card-image' variant="top" src={c.image} />
                    <Card.Body>
                    <Card.Title className="card-title">{c.title}</Card.Title>
                    <Card.Text className='card-text'>
                        <div className='year'>Year: {c.year}</div>
                        <div className='rating'>Rating: {c.imDbRating}</div>
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>
        </div>
    )
}

export default Home
