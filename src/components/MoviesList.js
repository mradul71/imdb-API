import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAllMovies } from '../features/movies/movieSlice'
import './movieList.css';

function MoviesList() {
    const movies = useSelector(getAllMovies)
    console.log(movies);
    return (
        <>
        {
            movies.length <=0 ? 
            <div className='loading'>Loading...</div>
            :
            (
            <div className='movies'>
                <Row xs={1} md={4} className="g-4 row">
            
                {movies && movies.map((c) => (
                    <Link className='links' to={`/movie/${c.id}`}>
                        <Col className='col'>
                            <Card className='card'>
                                <Card.Img className='card-image' variant="top" src={c.image} />
                                <Card.Body>
                                <Card.Title className="card-title">{c.title}</Card.Title>
                                <Card.Text className='card-text'>
                                    <div className='year'>Year: {c.year || c.description}</div>
                                    {c.imDbRating ? <div className='rating'>Rating: {c.imDbRating}</div> : null}
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
