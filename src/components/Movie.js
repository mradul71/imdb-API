import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './movie.css'
import ItemsCarousel from "react-items-carousel";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from 'react-redux';
import {fetchOneMovie} from "../features/imdb.service"
import { cleanPreviousMovieDetails, getMovieDetails } from '../features/movies/movieSlice';

function Movie() {
    const [activeActor, setActiveActor] = useState(0);
    const [activeSimilar, setActiveSimilar] = useState(0);
    const {id} = useParams();
    const dispatch = useDispatch();
    const movie = useSelector(getMovieDetails)
    const [screenSize, setScreenSize] = useState(1090);

    useEffect(() => {
        dispatch(fetchOneMovie(id));
        window.scrollTo(0, 0);
        return dispatch(cleanPreviousMovieDetails());
      }, [dispatch, id]);

      useEffect(() => {
        const updateWindowDimensions = () => {
          setScreenSize(window.innerWidth);
        };
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions) 
      }, []);

    return (
        <>
        {
            Object.keys(movie).length === 0 ? 
            <div className='loading'>Loading...</div>
            :
            (
        <div className='movie' key={movie.id}>
            <div className='upper'>
                <div className='movie-title'>
                    <div className='name'>{movie.title}</div>
                    <div className='extra'>
                        <div className='year'>{movie.year}&ensp;</div>
                        <div className='runtime'>&ensp;{movie.runtimeStr}</div>
                    </div>
                </div>
                <div className='movie-rating'>
                    <div className='imdb-head'>IMdb Rating</div>
                    <div className='rating-val'>{movie.imDbRating}/10</div>
                </div>
            </div>
            <div className='grp'>
                <div className='movie-image'>
                    <img src={movie.image} />
                </div>
                <div className='right'>
                    <div className='plot'>
                        <p>{movie.plot}</p>
                    </div>
                    <hr />
                    <div className='director'>
                        <span className='headings'>Director</span>&ensp;&ensp;{movie.directors}
                    </div>
                    <hr />
                    <div className='writers'>
                        <span className='headings'>Writers</span>&ensp;&ensp;{movie.writers}
                    </div>
                    <hr />
                </div>
            </div>

            <div className='main-headings'>
                <span className='head-name'>Actors</span><ArrowForwardIosIcon className='icon' />
            </div>

            <div className='actors'>
                <ItemsCarousel className='actors-div'
                    autoPlay
                    infiniteLoop={true}
                    gutter={12}
                    timeout={1}
                    activePosition={"center"}
                    chevronWidth={60}
                    disableSwipe={false}
                    alwaysShowChevrons={false}
                    numberOfCards={screenSize<=970 ? (screenSize <= 740 ? (screenSize <= 595 ? 3 : 4) : 5) : 6}
                    slidesToScroll={4}
                    outsideChevron={true}
                    showSlither={false}
                    firstAndLastGutter={false}
                    activeItemIndex={activeActor}
                    requestToChangeActive={(value) => setActiveActor(value)}
                    rightChevron={<ArrowForwardIosIcon className='icon' />}
                    leftChevron={<ArrowBackIosNewIcon className='icon' />}
                >
                    {
                    movie.actorList.length <= 0 ? <div className='loading'>Loading...</div> :
                    movie.actorList.map((actor)=> {
                        if(actor.image !== "https://imdb-api.com/images/original/nopicture.jpg" &&
                            actor.asCharacter.includes("uncredited")!==true){
                                return (
                                    <div key={actor.id} className='actor'>
                                        <div className='actor-image'>
                                            <img src={actor.image} />
                                        </div>
                                        <div className='actor-title'>
                                            <div className='real-name'>{actor.name}</div>
                                            <div className='role-name'>{actor.asCharacter}</div>
                                        </div>
                                    </div>
                            )
                            }
                    })
                    }
                </ItemsCarousel>
            </div>

            <div className='main-headings'>
                <span className='head-name'>Similars</span><ArrowForwardIosIcon className='icon' />
            </div>
            <div className='similars'>
                <ItemsCarousel className='similars-div'
                    autoPlay
                    infiniteLoop={true}
                    gutter={12}
                    timeout={1}
                    activePosition={"center"}
                    chevronWidth={60}
                    disableSwipe={false}
                    alwaysShowChevrons={false}
                    numberOfCards={screenSize<=970 ? (screenSize <= 710 ? (screenSize <= 595 ? 2 : 3) : 4) : 5}
                    slidesToScroll={4}
                    outsideChevron={true}
                    showSlither={false}
                    firstAndLastGutter={false}
                    activeItemIndex={activeSimilar}
                    requestToChangeActive={(value) => setActiveSimilar(value)}
                    rightChevron={<ArrowForwardIosIcon className='icon' />}
                    leftChevron={<ArrowBackIosNewIcon className='icon' />}
                >
                    {
                    movie.similars.length <= 0 ? <div className='loading'>Loading...</div> :
                    movie.similars.map((similar)=> (
                        <Link className='links' to={`/movie/${similar.id}`}>
                            <div key={similar.id} className='similar'>
                                <div className='similar-image'>
                                    <img className='similar-image' src={similar.image} />
                                </div>
                                <div className='similar-title'>
                                    {similar.title}
                                </div>
                            </div>
                        </Link>
                    ))
                    }
                </ItemsCarousel>
            </div>
        </div>
                )
            }
        </>
    )
}

export default Movie

