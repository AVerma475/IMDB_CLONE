import axios from "axios";
import React, { useState, useEffect } from "react";
import Image from "../../assets/banner.jpeg";

const Banner = () => {
  const [movies, setMovies] = useState({});

  useEffect(
    () =>
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=c5f44ff0e872f9a0876567d85bf9767f&page=1`
        )
        .then((res) => setMovies(res.data.results[0])),
    []
  );
  return (
    <div>
      <div
        className={`bg-[url(https://image.tmdb.org/t/p/original/${movies.poster_path})] h-[40vh] md:h-[60vh] bg-center bg-cover flex items-end`}
      >
        <div className="text-xl md:text-3xl text-white text-bold p-6 bg-gray-900 bg-opacity-50 w-full flex justify-center">
          {movies.title}
        </div>
      </div>
    </div>
  );
};

export default Banner;
