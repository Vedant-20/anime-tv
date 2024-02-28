import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";

import Details from "./components/Details";

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");
  

  const GetTopAnime = async () => {
    const temp = await fetch(`https://api.jikan.moe/v4/top/anime`).then((res) =>
      res.json()
    );
    console.log("TEmp Data", temp.data.slice(0, 5));

    setTopAnime(temp.data.slice(0, 5));
  };

  const HandleSearch = (e) => {
    e.preventDefault();

    FetchAnime(search);
  };

  const FetchAnime = async (query) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&order_by=title&sort=asc`
    ).then((res) => res.json());

    console.log(temp.data);
    setAnimeList(temp.data);
  };

  useEffect(() => {
    GetTopAnime();

    console.log("Anime top check");
  }, []);

  

  return (
    <BrowserRouter>
    <Header
          HandleSearch={HandleSearch}
          search={search}
          setSearch={setSearch}
        />
      

      <Sidebar topAnime={topAnime} />
      
      <Routes>
      
        
        

        <Route path="/" element={<Home animeList={animeList} />} />
        
        <Route path="/anime/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
