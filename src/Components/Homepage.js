import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/global";
import Popular from "./Popular";
import styled from "styled-components";
import Upcoming from "./Upcoming";
import Airing from "./Airing";
import Fantasy from "./Fantasy";
import Sidebar from "./Sidebar";
import SignIn from "./SignIn/SignIn";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Row from "./Row/Row";
function Homepage() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const genres = [
    "fantasy",
    "horror",
    "slice of life",
    "sci-fi",
    "comedy",
    "shounen",
  ];

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  const {
    handleSubmit,
    airingAnime,
    upcomingAnime,
    favoriteAnime,
    search,
    handleChange,
    getUpcomingAnime,
    getAiringAnime,
    getFantasyAnime,
    getShounenAnime,
  } = useGlobalContext();

  const [rendered, setRendered] = React.useState("popular");
  const [genreQuery, setGenreQuery] = React.useState("");
  const switchComponent = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "airing":
        return <Airing rendered={rendered} />;
      case "upcoming":
        return <Upcoming rendered={rendered} />;
      case "favorite":
        return <Fantasy rendered={rendered} />;

      default:
        return <Popular rendered={rendered} />;
    }
  };
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
  const handleGenreSearch = (e) => {
    e.preventDefault();
    if (genreQuery) {
      setRendered("fantasy");
      getFantasyAnime(genreQuery);
    }
  };
  //login
  const [isSignIn, setIsSignIn] = useState(false);
  const handleSignIn = () => {
    setIsSignIn(false);
  };
  const handleSignOut = () => {
    setIsSignIn(true);
    closeDialog();
  };
  //login
  //dialog
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirm = () => {
    console.log("Tên đăng nhập:", username);
    console.log("Mật khẩu:", password);
    handleClose();
    handleSignIn();
  };
  //dialog
  //profile dialog
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const openDialog = () => {
    setIsProfileOpen(true);
  };

  const closeDialog = () => {
    setIsProfileOpen(false);
  };
  const handleProfileClose = () => {
    setIsProfileOpen(false);
  };

  const handleProfileConfirm = () => {
    closeDialog();
    handleProfileClose();
  };
  //profile dialog
  //multiple combobox

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleGenreChange = (event) => {
    const genre = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    }
  };

  const allGenres = [
    "Action",
    "Comedy",
    "Romance",
    "Fantasy",
    "School life",
    "Harem",
    "Sport",
    "Sci-fi",
    "Slice of Life",
    "Shounen",
  ];
  //multiple combobox

  return (
    <HomepageStyled style={{ marginTop: 10 }}>
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
              <h1 style={{ marginLeft: 40 }}>Anime Big Data</h1>
            </Link>
            <header>
              <div className="search-container">
                {/* <div className="filter-btn popular-filter">
                  <button
                    className="nav_button"
                    onClick={() => {
                      setRendered("popular");
                    }}
                  >
                    Popular<i className="fas fa-fire"></i>
                  </button>
                </div> */}
                <form action="" className="search-form" onSubmit={handleSubmit}>
                  <div className="input-control">
                    <input
                      type="text"
                      placeholder="Search Anime"
                      value={search}
                      onChange={handleChange}
                    />
                    <button type="submit">Search</button>
                  </div>
                </form>
                <div className="filter-btn airing-filter">
                  <button
                    className="nav_button"
                    onClick={() => {
                      setRendered("airing");
                      getAiringAnime();
                    }}
                  >
                    Airing
                  </button>
                </div>
                <div className="filter-btn upcoming-filter">
                  <button
                    className="nav_button"
                    onClick={() => {
                      setRendered("upcoming");
                      getUpcomingAnime();
                    }}
                  >
                    Upcoming
                  </button>
                </div>
                <div className="filter-btn airing-filter">
                  <button
                    className="nav_button"
                    onClick={() => {
                      setRendered("favorite");
                      getFantasyAnime();
                    }}
                  >
                    Favorite
                  </button>
                </div>
                {/* <div className="filter-btn airing-filter ">
                  <button className="nav_button genres-button">Genres</button>
                </div> */}
                <div className="dropdown-menu">
                  <button className="dropdown-toggle">
                    <span className="dropdown-text">Genres</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                  <ul className="dropdown-menu-list">
                    {genres.map((genre, index) => (
                      <li key={index} onClick={() => handleGenreSelect(genre)}>
                        {genre}
                      </li>
                    ))}
                  </ul>
                  {/* <div className="dropdown-menu-grid">
                    {genres.map((genre, index) => (
                      <div
                        key={index}
                        className="dropdown-menu-item"
                        onClick={() => handleGenreSelect(genre)}
                      >
                        {genre}
                      </div>
                    ))}
                  </div> */}
                </div>
                <div>
                  {isSignIn && (
                    <div>
                      <button onClick={handleOpen}>SignIn</button>
                      {open && (
                        <div className="dialog-overlay">
                          <div className="dialog">
                            <div className="dialog-content">
                              <h2>Tiêu đề Dialog</h2>
                              <div className="form-group">
                                <label htmlFor="username">Tên đăng nhập:</label>
                                <input
                                  type="text"
                                  id="username"
                                  value={username}
                                  onChange={handleUsernameChange}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="password">Mật khẩu:</label>
                                <input
                                  type="password"
                                  id="password"
                                  value={password}
                                  onChange={handlePasswordChange}
                                />
                              </div>

                              <div className="dialog-actions">
                                <button onClick={handleClose}>Hủy</button>
                                <button onClick={handleConfirm}>
                                  Xác nhận
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {isSignIn ? (
                  <div></div>
                ) : (
                  <div>
                    <button onClick={openDialog}>
                      <i className="fa fa-user"></i> Profile
                    </button>

                    {isProfileOpen && (
                      <div className="dialog-overlay">
                        <div className="dialog">
                          <div className="dialog-content">
                            <h2>Profile Dialog</h2>
                            <p>Thông tin về hồ sơ của bạn.</p>
                            <div className="dropdown-combobox">
                              <div
                                className="selected-genres"
                                onClick={handleToggleOpen}
                              >
                                {selectedGenres.length > 0 ? (
                                  <span>
                                    Thể loại yêu thích:
                                    {selectedGenres.map((genre, index) => (
                                      <React.Fragment key={genre}>
                                        {index > 0 && ", "}
                                        <span className="selected-genre">
                                          {genre}
                                        </span>
                                      </React.Fragment>
                                    ))}
                                  </span>
                                ) : (
                                  <div className="placeholder">
                                    Chọn thể loại yêu thích
                                  </div>
                                )}
                              </div>
                              {isOpen && (
                                <div className="genres">
                                  {allGenres.map((genre) => (
                                    <label className="option" key={genre}>
                                      <input
                                        type="checkbox"
                                        value={genre}
                                        checked={selectedGenres.includes(genre)}
                                        onChange={handleGenreChange}
                                      />
                                      {genre}
                                    </label>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="dialog-actions">
                              <button onClick={handleSignOut}>Sign Out</button>
                              <button onClick={handleProfileConfirm}>
                                Xác nhận
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* {show && (
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
                      SignIn
                    </button>
                  </div>
                )}
                {showmod && <SignIn />}
                {!show && (
                  <button className="Log_Out" onClick={LogOut}>
                    Log Out
                  </button>
                )} */}
              </div>
            </header>
          </div>
        </div>
      </div>
      <Sidebar />

      {switchComponent()}
      <div className="table">
        <div className="table-row">
          <div className="table_left table-cell">
            <h1 style={{ marginLeft: "40px", marginTop: "20px" }}>Airing</h1>
            <div className="airing-anime">
              {airingAnime?.slice(0, 10).map((anime) => {
                return (
                  <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="" />
                    <text>{anime.title}</text>
                  </Link>
                );
              })}
            </div>
            <h1 style={{ marginLeft: "40px", marginTop: "20px" }}>Upcoming</h1>
            <div className="airing-anime">
              {upcomingAnime?.slice(0, 10).map((anime) => {
                return (
                  <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="" />
                    <text>{anime.title}</text>
                  </Link>
                );
              })}
            </div>
            <h1 style={{ marginLeft: "40px", marginTop: "20px" }}>Favorite</h1>

            <div className="airing-anime">
              {favoriteAnime?.slice(0, 10).map((anime) => {
                return (
                  <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="" />
                    <text>{anime.title}</text>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="table_right table-cell">
            <h1 style={{ marginTop: 95 }}></h1>

            <div className="airing-anime">
              <h1>Recent History</h1>
              {airingAnime?.slice(0, 5).map((anime) => {
                return (
                  <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img src={anime.images.jpg.large_image_url} alt="" />
                    <text>{anime.title}</text>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </HomepageStyled>
  );
}

const HomepageStyled = styled.div`
  background-color: #ededed;
  padding: 0.5rem 2rem;
  .dropdown-menu {
  }
  /*tablecell */
  .table {
    display: table;
    table-layout: fixed;
    width: 100%;
  }
  .table-cell {
    display: table-cell;
    padding: 10px;
    vertical-align: top;
  }
  .table-row {
    display: table-row;
  }

  .table_left {
    display: tablecell;
    width: 80%;
  }
  .table_right {
    display: tablecell;
    width: 20%;
  }
  /* dialog */
  .option-label {
    display: inline-block;
    margin-left: 5px;
  }
  .option {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999; /* Đặt giá trị z-index cao để dialog nổi lên trước */
    .option input {
      width: 10%;
    }
  }

  .dialog {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 400px;
    z-index: 10000; /* Đặt giá trị z-index cao hơn overlay để dialog nổi lên trước */
  }

  .dialog-content {
    padding: 20px;
  }

  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .dialog-actions button {
    margin-left: 10px;
  }
  .dropdown-toggle {
    display: inline;
    background-color: #fff;
    border: none;
    outline: none;
    padding: 10px 40px;
    cursor: pointer;
  }
  .form-group {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  input:focus {
    outline: none;
    border-color: #6d9eeb;
    box-shadow: 0 0 5px rgba(109, 158, 235, 0.5);
  }
  /* dialog */

  .dropdown-menu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 1;
  }
  .dropdown-menu:hover .dropdown-menu-grid {
    display: grid;
  }

  .dropdown-menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    background-color: #f5f5f5;
    border-radius: 5px;
    cursor: pointer;
  }
  .dropdown-menu-item:hover {
    background-color: #e0e0e0;
  }
  .dropdown-menu-list {
    display: none;
    position: absolute;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    min-width: 120px;
    z-index: 1;
    margin-left: 30px;
    li {
      padding: 30px;
      font-size: 20px;
      margin-left: -20px;
    }
  }

  .dropdown-menu-list li {
    list-style: none;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 10px;
  }

  .dropdown-menu-list li:hover {
    background-color: #a0ddfa;
  }
  .dropdown-menu .dropdown-toggle:hover {
    background-color: #a0ddfa;
    button {
      color: white;
    }
  }
  .dropdown-menu:hover .dropdown-menu-list {
    display: block;
  }
  .airing-anime {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 3rem;
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
  .genres-button:hover {
    background-color: #a0ddfa;
  }
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
  .nav_button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.5rem;
    outline: none;
    border-radius: 30px;
    font-size: 1.2rem;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    font-family: inherit;
    border: 5px solid #e5e7eb;
  }
  header {
    padding: 2rem 5rem;
    width: 60%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;
    @media screen and (max-width: 1530px) {
      width: 95%;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .search-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.5rem;
        outline: none;
        border-radius: 30px;
        font-size: 1.2rem;
        background-color: #fff;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        font-family: inherit;
        border: 5px solid #e5e7eb;
      }
      form {
        position: relative;
        width: 100%;
        .input-control {
          position: relative;
          transition: all 0.4s ease-in-out;
        }
        .input-control input {
          width: 100%;
          padding: 0.7rem 1rem;
          border: none;
          outline: none;
          border-radius: 30px;
          font-size: 1.2rem;
          background-color: #fff;
          border: 5px solid #e5e7eb;
          transition: all 0.4s ease-in-out;
        }
        .input-control button {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
`;

export default Homepage;
