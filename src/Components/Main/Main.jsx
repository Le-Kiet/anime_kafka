import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Main.css'
import axios from 'axios';
const Main = () => {
    const [movies,setMovies]=useState([]);
    const movie= movies[Math.floor(Math.random()*movies.length)]
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=992e91e1f851cd7691a7432786eaf18c&language=en-US&page=1`).then((response)=>{
             setMovies(response.data.results)
             console.log(response.data.results)
        })
    },[])
  return (
    <>
    <Link to={`/movie/${movie?.id}`} style={{ textDecoration: 'none' }}>
    <div className="Container_Main">
      <div className="movie__intro">
       <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title}></img>
      </div> 
      <div className="movie__detail">
       <div className='movie_original_title'>{movie?.original_title}</div>
       </div>
      </div>
       </Link>
    </>
  )
}

export default Main