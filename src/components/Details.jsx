import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'

function Details() {
  const [animeDetails, setAnimeDetails] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = React.useState(false);

  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = animeDetails;

  const { id } = useParams();

  const getAnimeDetails = async (anime) => {
    const temp = await fetch(`https://api.jikan.moe/v4/anime/${anime}`).then(
      (res) => res.json()
    );
    console.log("Anime Details Object", temp.data);
    setAnimeDetails(temp.data);
  };

  const getCharacters = async (anime) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${anime}/characters`
    );
    const data = await response.json();
    setCharacters(data.data);
  };

  useEffect(() => {
    getAnimeDetails(id);
    getCharacters(id);
  }, [id]);

  return (
    <>
    <header className='mybg flex justify-center items-center bg-black'>
    <Link to={'/'}>
    <button className=' mt-8 mb-8 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600' >Go To Home</button>
    </Link>
    
    </header>
    <div className="w-full h-screen">
      <h1 className="text-center text-3xl pink-text-gradient font-extrabold mt-16">
        {title}
      </h1>
      <div className="flex justify-center items-center mt-8">
        <img
          className="h-[700px] w-[1000px]"
          src={images?.jpg.large_image_url || images?.jpg.image_url}
          alt={title}
        />
      </div>
      <div className="flex flex-col justify-between items-start mt-8 lg:items-center">
        <p className="flex gap-4">
          <span className="pink-text-gradient text-2xl font-bold text-center">Aired:</span>
          <span className="text-xl green-text-gradient font-bold text-center">
            {aired?.string}
          </span>
        </p>
        <p className="flex gap-4">
          <span className="pink-text-gradient text-2xl font-bold text-center">Rating:</span>
          <span className="text-xl green-text-gradient font-bold text-center">{rating}</span>
        </p>
        <p className="flex gap-4">
          <span className="pink-text-gradient text-2xl font-bold text-center">Rank:</span>
          <span className="text-xl green-text-gradient font-bold text-center">{rank}</span>
        </p>
        <p className="flex gap-4">
          <span className="pink-text-gradient text-2xl font-bold text-center">Score:</span>
          <span className="text-xl green-text-gradient font-bold text-center">{score} 🌟</span>
        </p>
        <p className="flex gap-4">
          <span className="pink-text-gradient text-2xl font-bold">Scored By:</span>
          <span className="text-xl green-text-gradient font-bold">{scored_by}</span>
        </p>
        <p className="flex gap-4">
          <span className="pink-text-gradient text-2xl font-bold">Popularity:</span>
          <span className="text-xl green-text-gradient font-bold">{popularity}</span>
        </p>
        <p className="flex gap-4">
          <span className="pink-text-gradient text-2xl font-bold">Status:</span>
          <span className="text-xl green-text-gradient font-bold">{status}</span>
        </p>
        <p className="flex gap-4">
          <span className="pink-text-gradient text-2xl font-bold">Source:</span>
          <span className="text-xl green-text-gradient font-bold">{source}</span>
        </p>
        <p className="flex gap-4">
          <span className="pink-text-gradient text-2xl font-bold">Season:</span>
          <span className="text-xl green-text-gradient font-bold">{season}</span>
        </p>
        <p className="flex gap-4">
          <span className="pink-text-gradient text-2xl font-bold">Duration:</span>
          <span className="text-xl green-text-gradient font-bold">{duration}</span>
        </p>
      </div>
      
      <h3 className="text-4xl pink-text-gradient text-center mt-8">Synopsis : </h3>
      <p className="mt-8 text-yellow-400 text-center leading-7">
        {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
        <button
          className="bg-transparent border-none outline-none cursor-pointer text-xl text-blue-700 underline"
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {showMore ? "Show Less" : "Read More"}
        </button>
      </p>

      <h3 className="text-4xl pink-text-gradient text-center mt-8">Trailer</h3>
      <div className="flex justify-center items-center">
        {trailer?.embed_url ? (
          <iframe
            src={trailer?.embed_url}
            title="Inline Frame Example"
            width="800"
            height="450"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            
          ></iframe>
        ) : (
          <h3 className="green-text-gradient text-3xl">
            Trailer not available
          </h3>
        )}
      </div>
      <h3 className="text-4xl pink-text-gradient text-center mt-8">Characters</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 p-8 rouded-2xl">
        {characters?.map((character, index) => {
          const { role } = character;
          const { images, name, mal_id } = character.character;
          return (
            <div
              className="p-2 mybg rounded-2xl transition delay-150 duration-300 ease-in-out"
              key={index}
            >
              <img
                className="w-full rounded-md"
                src={images?.jpg.image_url}
                alt={name}
              />
              <h4 className="text-lime-400 text-center">{name}</h4>
              <p className="text-pink-500 text-sm text-center">{role}</p>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default Details;
