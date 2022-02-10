import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Pagination from "../Pagination";
import upArrow from "../../assets/uparrow.png";
import downArrow from "../../assets/downarrow.png";

const Favourites = () => {
  const [currGenre, setCurrGenre] = useState("All Genre");
  const [fav, setFav] = useState([]);
  const [genres, setGenre] = useState([]);
  const [rating, setRating] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);
  const [currPage, setCurrPage] = useState(1);

  let genreIds = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  //Genres
  useEffect(() => {
    let allgenre = fav.map((movie) => genreIds[movie.genre_ids[0]]);
    allgenre = new Set(allgenre);
    setGenre(["All Genre", ...allgenre]);
    console.log(allgenre);
  }, [fav]);

  // localstorage
  useEffect(() => {
    let oldFav = localStorage.getItem("imdb");
    oldFav = JSON.parse(oldFav) || [];
    setFav([...oldFav]);
  }, []);

  const remove = (movie) => {
    let arr = fav.filter((m) => m.id != movie.id);
    setFav([...arr]);
    localStorage.setItem("imdb", JSON.stringify(arr));
  };

  let filteredMovies = [];

  filteredMovies =
    currGenre == "All Genre"
      ? fav
      : fav.filter((movie) => genreIds[movie.genre_ids[0]] == currGenre);

  //Searching
  filteredMovies = filteredMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting
  if (rating == 1) {
    filteredMovies = filteredMovies.sort(
      (o1, o2) => o1.vote_average - o2.vote_average
    );
  } else if (rating == -1) {
    filteredMovies = filteredMovies.sort(
      (o1, o2) => o2.vote_average - o1.vote_average
    );
  }

  //Sorting
  if (popularity == 1) {
    filteredMovies = filteredMovies.sort(
      (o1, o2) => o1.popularity - o2.popularity
    );
  } else if (popularity == -1) {
    filteredMovies = filteredMovies.sort(
      (o1, o2) => o2.popularity - o1.popularity
    );
  }

  //Pagination
  let maxPage = Math.ceil(filteredMovies.length / rows);
  let si = (currPage - 1) * rows;
  let ei = Number(si) + Number(rows);

  filteredMovies = filteredMovies.slice(si, ei);

  let goBack = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  let goAhead = () => {
    if (currPage < maxPage) {
      setCurrPage(currPage + 1);
    }
  };

  return (
    <>
      <div className="mt-4 px-2 flex justify-center flex-wrap space-x-2  ">
        {genres.map((genre) => (
          <button
            key={genre}
            className={
              currGenre == genre
                ? "m-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold"
                : "m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold"
            }
            onClick={() => {
              setCurrPage(1);
              setCurrGenre(genre);
            }}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-2 text-center p-1 m-2"
        />
        <input
          type="number"
          placeholder="rows"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
          className="border border-2 text-center p-1 m-2"
        />
      </div>

      <div>
        <div className="flex flex-col m-4">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="flex flex-row">
                          <img
                            className=" w-[15px] h-[15px] mr-1 cursor-pointer"
                            alt="upArrow"
                            src={upArrow}
                            onClick={() => {
                              setPopularity(0);
                              setRating(1);
                            }}
                          />
                          <div>Rating</div>
                          <img
                            className="cursor-pointer ml-1 w-[15px] h-[15px]"
                            alt="upArrow"
                            src={downArrow}
                            onClick={() => {
                              setPopularity(0);
                              setRating(-1);
                            }}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className=" px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="flex flex-row">
                          <img
                            className="cursor-pointer w-[15px] h-[15px] mr-1"
                            alt="upArrow"
                            src={upArrow}
                            onClick={() => {
                              setPopularity(1);
                              setRating(0);
                            }}
                          />
                          <div>Popularity</div>
                          <img
                            className="cursor-pointer ml-1 w-[15px] h-[15px]"
                            alt="upArrow"
                            src={downArrow}
                            onClick={() => {
                              setPopularity(-1);
                              setRating(0);
                            }}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Genre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Remove
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMovies.map((movie) => (
                      <tr key={movie.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {movie.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {movie.vote_average}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {movie.popularity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {genreIds[movie.genre_ids[0]]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => remove(movie)}
                            className="text-pink-600 hover:text-red-900 cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Pagination pageNumber={currPage} goAhead={goAhead} goPrev={goBack} />
      </div>
    </>
  );
};

export default Favourites;
