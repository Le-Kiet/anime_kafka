import React, { useEffect, useState } from "react";
// import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
const Navbar = (a) => {
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
  return (
    <div className="Wrapper_Navbar">
      <div className="Container_Navbar">
        <div className="Nav">
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <h1>PHIMTMD</h1>
          </Link>
          <div className="Search"></div>
          <div className="tag_film">
            <Link to={`/searchmovie`} style={{ textDecoration: "none" }}>
              <h4>Search</h4>
            </Link>
            <Link to={`/horrormovie`} style={{ textDecoration: "none" }}>
              <h4>Horror</h4>
            </Link>
            <Link to={`/actionmovie`} style={{ textDecoration: "none" }}>
              <h4>Action</h4>
            </Link>
            <Link to={`/comedymovie`} style={{ textDecoration: "none" }}>
              <h4>Comedy</h4>
            </Link>
          </div>
          {/* <div className='User_icon'>
               <User/>
          </div> */}
          {show && (
            <div className="Button_Navbar">
              {/* <Link to={`/signin`}> */}
              <button className="Sign_in" onClick={hideSign}>
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
  );
};

export default Navbar;
