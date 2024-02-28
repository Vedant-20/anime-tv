import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";


import Details from "./components/Details";

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  

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
    navigate('/explore');
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
    <>
    {/* <Header
          HandleSearch={HandleSearch}
          search={search}
          setSearch={setSearch}
          topAnime={topAnime}
        /> */}
      
        
      
      
      <Routes>
        <Route path="/" element={<Header
          HandleSearch={HandleSearch}
          search={search}
          setSearch={setSearch}
          topAnime={topAnime}
        />}/>
      
        
        

        <Route path="/explore" element={<Home animeList={animeList} />} />
        
        
        <Route path="/anime/:id" element={<Details />} />
      </Routes>
      {/* <Sidebar topAnime={topAnime} /> */}
    </>
  );
}

export default App;
