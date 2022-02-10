import axios from "axios";
import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import Pagination from "../Pagination";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hover, setHover] = useState("");
  const [fav, setFav] = useState([]);

  const add = (movie) => {
    let arr = [...fav, movie];
    setFav([...arr]);
    console.log(arr);
    localStorage.setItem("imdb", JSON.stringify(arr));
  };

  const remove = (movie) => {
    let arr = fav.filter((m) => m.id != movie.id);
    setFav([...arr]);
    localStorage.setItem("imdb", JSON.stringify(arr));
  };

  const goAhead = () => {
    setPageNumber((prev) => prev + 1);
  };

  const goPrev = () => {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  };

  useEffect(
    () =>
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=c5f44ff0e872f9a0876567d85bf9767f&page=${pageNumber}`
        )
        .then((res) => {
          setMovies(res.data.results);
          let oldFav = localStorage.getItem("imdb");
          oldFav = JSON.parse(oldFav);
          setFav([...oldFav]);
        }),
    [pageNumber]
  );
  return (
    <>
      <div className="mb-8">
        <div className="mt-8 mb-8 font-bold text-2xl text-center">
          Trending Movies
        </div>

        {movies.length === 0 ? (
          <div className="flex justify-center">
            <Oval
              height="100"
              width="100"
              secondaryColor="grey"
              color="grey"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {movies.map((movie) => (
              <div
                key={movie.id}
                onMouseEnter={() => setHover(movie.id)}
                onMouseLeave={() => setHover("")}
                className={`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] bg-cover bg-center h-[25vh] w-[150px] md:h-[30vh] md:w-[250px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110
            ease-out-duration-800 relative`}
              >
                {hover == movie.id && (
                  <>
                    {!fav.find((m) => m.id == movie.id) ? (
                      <div
                        onClick={() => add(movie)}
                        className="absolute top-2 right-2 p-2 bg-gray-800 text-xl flex justify-center rounded-xl cursor-pointer"
                      >
                        😍;
                      </div>
                    ) : (
                      <div
                        onClick={() => remove(movie)}
                        className="absolute top-2 right-2 p-2 bg-gray-900 text-xl rounded-xl cursor-pointer"
                      >
                        ❌;
                      </div>
                    )}
                  </>
                )}
                <div className="w-full bg-gray-900 text-white text-center py-2 rounded-b-xl">
                  {movie.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination pageNumber={pageNumber} goAhead={goAhead} goPrev={goPrev} />
    </>
  );
};

export default Movies;
