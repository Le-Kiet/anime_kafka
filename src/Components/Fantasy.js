import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import styled from "styled-components";

function Fantasy({ rendered }) {
  const { favoriteAnime, isSearch, searchResults } = useGlobalContext();

  // const genre = "favorite";
  // const genre2 = "shounen";
  // React.useEffect(() => {
  //   if (isSearch && rendered === genre) {
  //     searchByGenre(genre);
  //   } else if (isSearch && rendered === genre2) {
  //     searchByGenre(genre);
  //   }
  // }, [isSearch, rendered, searchByGenre, genre, genre2]);
  const conditionalRender = () => {
    if (!isSearch && rendered === "favorite") {
      return favoriteAnime?.map((anime) => {
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
  // const renderByGenre = () => {
  //   if (searchResults) {
  //     return searchResults.map((anime) => (
  //       <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
  //         <img src={anime.images.jpg.large_image_url} alt="" />
  //         <text>{anime.title}</text>
  //       </Link>
  //     ));
  //   } else {
  //     return null;
  //   }
  // };
  // const renderByGenre = (genre) => {
  //   // if (!isSearch && rendered === genre) {
  //   //   return upcomingAnime
  //   //     .filter((anime) => anime.genre.includes(genre))
  //   //     .map((anime) => (
  //   //       <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
  //   //         <img src={anime.images.jpg.large_image_url} alt="" />
  //   //       </Link>
  //   //     ));
  //   // }
  //   if (isSearch && rendered === genre) {
  //     return searchResults.map((anime) => (
  //       <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
  //         <img src={anime.images.jpg.large_image_url} alt="" />
  //       </Link>
  //     ));
  //   } else {
  //     return searchResults
  //       .filter((anime) => anime.genre.includes(genre))
  //       .map((anime) => (
  //         <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
  //           <img src={anime.images.jpg.large_image_url} alt="" />
  //         </Link>
  //       ));
  //   }
  // };

  return (
    <PopularStyled>
      <div className="upcoming-anime">{conditionalRender()}</div>
    </PopularStyled>
  );
}

const PopularStyled = styled.div`
  .upcoming-anime {
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

export default Fantasy;
