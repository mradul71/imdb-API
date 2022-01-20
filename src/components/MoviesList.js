import React, {useEffect, useState} from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {movieSelectors} from '../features/movies/movieSlice'
import { useDispatch } from 'react-redux';
import { fetchAllMovies } from '../features/imdb.service';
import './movieList.css';

function MoviesList() {
    const [screenSize, setScreenSize] = useState(null);
    let movies = useSelector(movieSelectors.selectAll);
    
    const dispatch = useDispatch(); 
    
    useEffect(() => {
        if(movies.length === 0){
            console.log("empty")
            dispatch(fetchAllMovies(""));
        }
        else{
            console.log("filled")
        }
        const updateWindowDimensions = () => {
          setScreenSize(window.innerWidth);
        };
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions) 
      }, []);
    return (
        <>
        {
            movies.length <=0 ? 
            <div className='loading'>Loading...</div>
            :
            (
            <div className='movies'>
                <Row sm={2} xs={1} md={3} lg={4} className="g-4 row">
            
                {movies && movies.map((c) => (
                    <Link key={c.id} className='links' to={`/movie/${c.id}`}>
                        <Col key={c.id} className='col'>
                            <Card className='card'>
                                <Card.Img className='card-image' variant="top" src={c.image} />
                                <Card.Body>
                                <Card.Title className="card-title">{c.title}</Card.Title>
                                <Card.Text className='card-text'>
                                    <div className='year'><p>Year: {c.year || c.description}</p></div>
                                    {c.imDbRating ? <div className='rating'><p>Rating: {c.imDbRating}</p></div> : null}
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Link>
                    ))}
                </Row>
            </div>
            )
        }
        
        </>
    )
}

export default MoviesList
