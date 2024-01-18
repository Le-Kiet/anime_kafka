import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SignIn from "./SignIn/SignIn";
function AnimeItem() {
  const { id } = useParams();

  //state
  const [anime, setAnime] = React.useState({});
  const [characters, setCharacters] = React.useState([]);
  const [showMore, setShowMore] = React.useState(false);

  //destructure anime
  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;
  const [show, setShow] = useState(true);
  const [showmod, setShowmd] = useState(false);
  const [showbt, setShowbt] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    const data = window.localStorage.getItem("Show_button");
    if (data !== null) {
      setShow(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("Show_button", JSON.stringify(show));
  }, [show]);

  const hideSign = () => {
    setShow(!show);
    setShowmd(true);
    setShowbt(true);
  };
  const LogOut = () => {
    setShowbt(!showbt);
    window.localStorage.removeItem("Show_button");

    window.location.reload(false);
  };
  //get anime based on id
  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    console.log(data, "data");
    setAnime(data.data);
  };

  //get characters
  const getCharacters = async (anime) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${anime}/characters`
    );
    const data = await response.json();
    setCharacters(data.data);
    console.log(data.data);
  };

  //initial render
  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, []);

  return (
    <AnimeItemStyled>
      <div className="Wrapper_Navbar">
        <div className="Container_Navbar">
          <div
            className="Nav"
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Link to={`/`} style={{ textDecoration: "none", marginLeft: 40 }}>
              <h1 className="web_header" style={{ marginLeft: 40 }}>
                Anime Big Data
              </h1>
            </Link>
            <div className="Search"></div>
            {show && (
              <div className="filter-btn airing-filter">
                <button
                  style={{
                    color: "black",
                    background: "white",
                    padding: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                    borderRadius: 30,
                    fontSize: 16,
                    marginRight: 30,
                    //             display: flex;
                    // align-items: center;
                    // gap: 0.5rem;
                    // padding: 0.7rem 1.5rem;
                    // outline: none;
                    // border-radius: 30px;
                    // font-size: 1.2rem;
                    // background-color: #fff;
                    // cursor: pointer;
                    // transition: all 0.4s ease-in-out;
                    // font-family: inherit;
                    // border: 5px solid #e5e7eb;
                  }}
                  onClick={hideSign}
                >
                  Sign In
                </button>
              </div>
            )}
            {showmod && <SignIn />}
            {!show && (
              <button className="Log_Out" onClick={LogOut}>
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
      <h1 className="anime_title">{title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            <img src={images?.jpg.large_image_url} alt="" />
          </div>
          <div className="anime-details">
            {/* <p><span>Aired:</span><span>{aired?.string}</span></p>
                        <p><span>Rating:</span><span>{rating}</span></p> */}
            <p>
              <span>Rank:</span>
              <span>{rank}</span>
            </p>
            <p>
              <span>Score:</span>
              <span>{score}</span>
            </p>
            <p>
              <span>Scored By:</span>
              <span>{scored_by}</span>
            </p>
            <p>
              <span>Popularity:</span>
              <span>{popularity}</span>
            </p>
            <p>
              <span>Episodes:</span>
              <span>{anime.episodes}</span>
            </p>
            <p>
              <span>Duration:</span>
              <span>{anime.duration}</span>
            </p>
            <p>
              <span style={{ paddingTop: 10 }}>Genres:</span>
              {anime.genres &&
                anime.genres.map((genre) => (
                  <div className="genres-container">
                    <span key={genre.id}>{genre.name}</span>
                  </div>
                ))}
            </p>
            <p className="description">
              {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
              <button
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                {showMore ? "Show Less" : "Read More"}
              </button>
            </p>
            {/* <p><span>Status:</span><span>{status}</span></p>
                        <p><span>Source:</span><span>{source}</span></p>
                        <p><span>Season:</span><span>{season}</span></p> */}
            {/* <p><span>Duration:</span><span>{duration}</span></p> */}
          </div>
        </div>
      </div>
      <h3 className="title">Trailer</h3>
      <div className="trailer-con">
        {trailer?.embed_url ? (
          <iframe
            src={trailer?.embed_url}
            title="Inline Frame Example"
            width="800"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <h3>Trailer not available</h3>
        )}
      </div>
      <h3 className="title">Characters</h3>
      <div className="characters">
        {characters?.map((character, index) => {
          const { role } = character;
          const { images, name, mal_id } = character.character;
          return (
            <Link to={`/character/${mal_id}`} key={index}>
              <div className="character">
                <img src={images?.jpg.image_url} alt="" />
                <h4>{name}</h4>
                <p>{role}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </AnimeItemStyled>
  );
}

const AnimeItemStyled = styled.div`
  padding: 0.5rem 18rem;
  background-color: #ededed;
  .Wrapper_Navbar {
    position: relative;
  }
  .Container_Navbar {
    /* display:flexbox; */
    justify-content: space-between;
  }
  .Nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-style: none none solid none;
    border-color: #ededed;
  }
  .anime_title {
    display: inline-block;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.4s ease-in-out;
    &:hover {
      transform: skew(-3deg);
    }
  }
  .genres-container {
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
  }
  .title {
    display: inline-block;
    margin: 3rem 0;
    font-size: 2rem;
    cursor: pointer;
    background: linear-gradient(to right, #a855f7 23%, #27ae60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    margin-top: 2rem;
    color: #6c7983;
    line-height: 1.7rem;
    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #27ae60;
      font-weight: 600;
    }
  }

  .trailer-con {
    display: flex;
    justify-content: center;
    align-items: center;
    iframe {
      outline: none;
      border: 5px solid #e5e7eb;
      padding: 1.5rem;
      border-radius: 10px;
      background-color: #ffffff;
    }
  }

  .details {
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid #e5e7eb;
    .detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      img {
        border-radius: 7px;
      }
    }
    .anime-details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        display: flex;
        gap: 1rem;
      }
      p span:first-child {
        font-weight: 600;
        color: #454e56;
      }
    }
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    padding: 2rem;
    border-radius: 20px;
    border: 5px solid #e5e7eb;
    .character {
      padding: 0.4rem 0.6rem;
      border-radius: 7px;
      background-color: #ededed;
      transition: all 0.4s ease-in-out;
      img {
        width: 100%;
      }
      h4 {
        padding: 0.5rem 0;
        color: #454e56;
      }
      p {
        color: #27ae60;
      }
      &:hover {
        transform: translateY(-5px);
      }
    }
  }
`;

export default AnimeItem;
