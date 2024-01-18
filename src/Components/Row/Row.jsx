import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import axios from 'axios';
import './Row.css'
const Row = ({title,fetchURL}) => {
    const[movies,setMovies]=useState([])
    useEffect(()=>{
        axios.get(fetchURL).then((response)=>{
            setMovies(response.data.results)
        });
    },[fetchURL])
    
  return (
    <div class='Row_Wrapper'>
         <h3 className='Title_Rows'>{title}</h3>
        <div class='Row_Container'>
        <ScrollMenu>
            {movies.map((item,id)=>(
                <Link to={`/movie/${item?.id}`} style={{ textDecoration: 'none' }}>
                <div class='Image_Rows'>
                    <img  class="Row_Poster"src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title}></img>
                <div className='Title_Movie'>
                    {item?.title}
                </div>
                </div>
                </Link>
            ))}
        </ScrollMenu>  
        </div>
         
    </div>
  )
}

export default Row