import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const NavBar = () => {
  return (
    <div className="pl-12 py-4 flex space-x-8 border items-center">
      <Link to="/">
        <img className="w-[50px] md:w-[80px]" src={logo} alt="img" />
      </Link>
      <Link to={"/"} className="text-blue-400 font-bold text-xl md:text-3xl">
        Movies
      </Link>
      <Link
        to={"/Favourites"}
        className="text-blue-400 font-bold text-xl md:text-3xl"
      >
        Favourites
      </Link>
    </div>
  );
};

export default NavBar;
