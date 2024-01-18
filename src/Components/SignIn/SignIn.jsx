import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import Navbar from "../../Components/Navbar/Navbar";
const SignIn = () => {
  const [show, setShow] = useState(true);
  const hideModal = () => {
    setShow(!show);
  };
  return (
    <div className="form_navbar_container">
      <form className="sign_in_form">
        <h1>Sign In Form</h1>
        <input type="text" name="name" placeholder="UserName" />
        <br />
        <input type="password" name="password" placeholder="Password" />
        <br />
        <button className="Sign_Button" type="submit" onClick={hideModal}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
