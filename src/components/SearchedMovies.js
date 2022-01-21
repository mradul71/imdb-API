import React, {useEffect, useState} from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import {searchSelectors} from '../features/searchedMovies/searchedMovieSlice'
import { useDispatch } from 'react-redux';
import './movieList.css';
import { searchMovies } from '../features/searchedMovies/searchedMovieSlice';

function SearchedMovies() {
    const {search} = useParams();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch(); 
    const fetchSearchedMovie = async (s) => {
        setLoading(true);
        await dispatch(searchMovies(s));
        setLoading(false);
     }
    
    useEffect(() => {
        fetchSearchedMovie(search);
      }, [search]);
    let movies = useSelector((state) => searchSelectors.selectAll(state));
    console.log(movies);
    return (
        <>
        {
            movies.length <=0 ? 
            <Spinner variant='light' style={{display: "flex", marginLeft: "auto", marginRight: "auto"}} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
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
                                    <div className='year'><p>Year: {c.description}</p></div>
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

export default SearchedMovies
