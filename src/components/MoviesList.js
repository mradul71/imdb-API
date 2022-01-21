import React, {useEffect, useState} from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {movieSelectors} from '../features/movies/movieSlice'
import { useDispatch } from 'react-redux';
import { allMovies } from "../features/movies/movieSlice";
import './movieList.css';

function MoviesList() {
    const [screenSize, setScreenSize] = useState(null);
    const [loading, setLoading] = useState(false);
    let movies = useSelector((state) => movieSelectors.selectAll(state));
    
    const dispatch = useDispatch(); 

    const fetchAllMovies = async () => {
        setLoading(true);
        await dispatch(allMovies());
        setLoading(false);
     }
    
    useEffect(() => {
        if(movies.length === 0){
            console.log("empty")
            fetchAllMovies();
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
