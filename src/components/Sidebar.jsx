import React, { useState } from "react";
import { Link } from "react-router-dom";


function Sidebar({ topAnime }) {

  
  return (
     <div className="flex flex-col lg:flex lg:flex-row w-full">
      <div className="flex justify-center items-center">
        <h2 className="text-yellow-300 font-bold text-3xl">Top Animes 👉</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4 p-8 rouded-xl">
      {topAnime.map((anime) => (
        
          <div
            key={anime?.mal_id}
            className=" mb-25 flex-col "
          >
          <Link to={`/anime/${anime.mal_id}`} key={anime?.mal_id} >
            <div className="p-2 rounded-2xl transition delay-150 duration-300 ease-in-out">
              <img
                className="w-full h-full object-cover object-center rounded-xl"
                src={anime?.images?.jpg.image_url}
                alt={anime?.title}
              />
            </div>
            </Link>
            <div className="flex flex-col text-white text-center">
              <span className="text-sm mb-1 leading-6 text-wrap">
                {anime?.title}
              </span>
              <h3><span className="text-xl text-violet-500 font-bold">Score :</span> {anime?.score}🌟</h3>
            </div>
          </div>
        
      ))}
      </div>
    </div>
    
  );
}

export default Sidebar;
