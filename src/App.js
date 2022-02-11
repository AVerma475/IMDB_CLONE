import React from "react";
import Banner from "./components/Banner";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import Pagination from "./components/Pagination";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites/index";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies />
              </>
            }
          />
          <Route
            path="/favourites"
            element={
              <>
                <Favourites />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
