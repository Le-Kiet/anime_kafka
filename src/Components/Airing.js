import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
function Airing({ rendered }) {
  const { airingAnime, isSearch, searchResults } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rendered === "airing") {
      return airingAnime?.slice(0, 10).map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="" />
            <text>{anime.title}</text>
          </Link>
        );
      });
      return (
        <div class="Row_Wrapper">
          <div class="Row_Container">
            <ScrollMenu>
              {searchResults?.map((anime) => (
                <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                  <img src={anime.images.jpg.large_image_url} alt="" />
                  <span>{anime.title}</span>
                </Link>
              ))}
            </ScrollMenu>
          </div>
        </div>
      );
    } else {
      return (
        <ScrollMenu>
          {searchResults?.map((anime) => (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
              <img src={anime.images.jpg.large_image_url} alt="" />
              <span>{anime.title}</span>
            </Link>
          ))}
          {/* <div class="Row_Wrapper">
              <h3 className="Title_Rows">{title}</h3>
              <div class="Row_Container">
                <ScrollMenu>
                  {movies.map((item, id) => (
                    <Link
                      to={`/movie/${item?.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div class="Image_Rows">
                        <img
                          class="Row_Poster"
                          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                          alt={item?.title}
                        ></img>
                        <div className="Title_Movie">{item?.title}</div>
                      </div>
                    </Link>
                  ))}
                </ScrollMenu>
              </div>
            </div> */}
        </ScrollMenu>
      );
    }
  };

  return (
    <PopularStyled>
      <div className="airing-anime">{conditionalRender()}</div>
      <Sidebar />
    </PopularStyled>
  );
}

const PopularStyled = styled.div`
  .Row_Wrapper {
    color: white;
    font-family: bold;
    padding-top: 20px;
    display: flex;
  }
  .Row_Container {
    position: relative;
    display: flex;
    align-items: center;
    overflow-x: visible;
    overflow-y: hidden;
  }
  .Image_Rows {
    width: 200px;
    height: 190px;
    margin-right: 50px;
  }
  .Row_Poster {
    width: 300px;
    max-height: 100px;
    object-fit: contain;
  }
  .Row_Poster:hover {
    transform: scale(1.08);
  }
  .Title_Movie {
    width: 310px;
    align-items: center;
    color: white;
  }
  * {
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }

  .airing-anime {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 3rem;
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

export default Airing;
