import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function Details() {
  const [animeDetails, setAnimeDetails] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    episodes,
    type,
    genres,
    studios,
    year
  } = animeDetails;

  const { id } = useParams();

  const getAnimeDetails = async (anime) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
      if (!response.ok) {
        throw new Error('Failed to fetch anime details');
      }
      const temp = await response.json();
      setAnimeDetails(temp.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching anime details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCharacters = async (anime) => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${anime}/characters`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }
      const data = await response.json();
      setCharacters(data.data);
    } catch (err) {
      console.error("Error fetching characters:", err);
    }
  };

  useEffect(() => {
    getAnimeDetails(id);
    getCharacters(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading anime details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Anime</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link to="/">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className='bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className="flex items-center justify-between">
            <Link to={'/'}>
              <button className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
              </button>
            </Link>
            <div className="text-right">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Anime Details
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            {title}
          </h1>
          {score && (
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl px-4 py-2">
                <span className="text-yellow-400 font-bold text-lg">⭐ {score}</span>
              </div>
              {rank && (
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl px-4 py-2">
                  <span className="text-purple-400 font-bold text-lg">Rank #{rank}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Image Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
              <img
                className="w-full h-auto object-cover"
                src={images?.jpg.large_image_url || images?.jpg.image_url}
                alt={title}
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aired?.string && (
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-semibold">Aired:</span>
                    <span className="text-gray-300">{aired.string}</span>
                  </div>
                )}

                {rating && (
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-semibold">Rating:</span>
                    <span className="text-gray-300">{rating}</span>
                  </div>
                )}

                {type && (
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-semibold">Type:</span>
                    <span className="text-gray-300">{type}</span>
                  </div>
                )}

                {episodes && (
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-semibold">Episodes:</span>
                    <span className="text-gray-300">{episodes}</span>
                  </div>
                )}

                {duration && (
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-semibold">Duration:</span>
                    <span className="text-gray-300">{duration}</span>
                  </div>
                )}

                {status && (
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-semibold">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'Currently Airing' ? 'bg-green-500/20 text-green-400' :
                        status === 'Finished Airing' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                      }`}>
                      {status}
                    </span>
                  </div>
                )}

                {source && (
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-semibold">Source:</span>
                    <span className="text-gray-300">{source}</span>
                  </div>
                )}

                {season && year && (
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-semibold">Season:</span>
                    <span className="text-gray-300">{season} {year}</span>
                  </div>
                )}

                {popularity && (
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-semibold">Popularity:</span>
                    <span className="text-gray-300">#{popularity}</span>
                  </div>
                )}

                {scored_by && (
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 font-semibold">Scored by:</span>
                    <span className="text-gray-300">{scored_by.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {genres && genres.length > 0 && (
                <div className="mt-6">
                  <span className="text-purple-400 font-semibold block mb-2">Genres:</span>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre, index) => (
                      <span key={index} className="bg-purple-500/20 border border-purple-500/30 text-purple-400 px-3 py-1 rounded-full text-sm">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Studios */}
              {studios && studios.length > 0 && (
                <div className="mt-6">
                  <span className="text-purple-400 font-semibold block mb-2">Studios:</span>
                  <div className="flex flex-wrap gap-2">
                    {studios.map((studio, index) => (
                      <span key={index} className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-3 py-1 rounded-full text-sm">
                        {studio.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Synopsis Section */}
        {synopsis && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
            <p className="text-gray-300 leading-relaxed">
              {showMore ? synopsis : synopsis.substring(0, 300) + "..."}
              <button
                className="ml-2 text-purple-400 hover:text-purple-300 underline font-medium transition-colors duration-300"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show Less" : "Read More"}
              </button>
            </p>
          </div>
        )}

        {/* Trailer Section */}
        {trailer?.embed_url && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Trailer</h2>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src={trailer.embed_url}
                title={`${title} Trailer`}
                className="w-full h-full"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Characters Section */}
        {characters && characters.length > 0 && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Characters</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {characters.slice(0, 16).map((character, index) => {
                const { role } = character;
                const { images, name, mal_id } = character.character;
                return (
                  <div
                    className="group bg-gray-700/50 border border-gray-600/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105"
                    key={index}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        src={images?.jpg.image_url}
                        alt={name}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                        {name}
                      </h4>
                      <p className="text-purple-400 text-xs mt-1">{role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {characters.length > 16 && (
              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
                  Showing first 16 characters of {characters.length} total
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
