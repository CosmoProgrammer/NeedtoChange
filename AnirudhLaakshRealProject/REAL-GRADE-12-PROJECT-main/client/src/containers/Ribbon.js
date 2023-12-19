import { React } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Ribbon = () => {
  //let isLoggedIn = JSON.parse(localStorage.getItem("authenticated"));if (!isLoggedIn) {

  return (
    <div align="right">
      <button>
        <Link to="/configpage">Config</Link>
      </button>
    </div>
  );
};

export default Ribbon;
