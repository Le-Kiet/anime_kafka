import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import styled from "styled-components";
import Sidebar from "./Sidebar";

function Popular({ rendered }) {
  const { popularAnime, isSearch, search, handleChange, searchResults } =
    useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rendered === "popular") {
      return popularAnime?.slice(0, 5).map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="" />
            <text>{anime.title}</text>
          </Link>
        );
      });
    } else {
      return searchResults?.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="" />
            <text>{anime.title}</text>
          </Link>
        );
      });
    }
  };

  return (
    <PopularStyled>
      {search.length > 0 ? <h1>Searching for {search}</h1> : <h1>Popular</h1>}
      <div className="popular-anime">{conditionalRender()}</div>
    </PopularStyled>
  );
}

const PopularStyled = styled.div`
  .popular-anime {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    border-top: 5px solid #e5e7eb;
    a {
      height: 500px;
      border-radius: 7px;
      border: 5px solid #e5e7eb;
    }
    a img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`;

export default Popular;
