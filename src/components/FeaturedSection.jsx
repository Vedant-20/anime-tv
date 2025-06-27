import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedSection = ({ topAnime }) => {
    if (!topAnime || topAnime.length === 0) return null;

    // Get the top 3 anime for featured section
    const featuredAnime = topAnime.slice(0, 3);

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                        Featured Anime
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Discover the most popular and highly-rated anime that everyone is talking about
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredAnime.map((anime, index) => (
                        <div
                            key={anime?.mal_id}
                            className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                        >
                            <Link to={`/anime/${anime.mal_id}`}>
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        src={anime?.images?.jpg.large_image_url || anime?.images?.jpg.image_url}
                                        alt={anime?.title}
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Featured Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                            #{index + 1} Featured
                                        </span>
                                    </div>

                                    {/* Score Badge */}
                                    {anime?.score && (
                                        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                                            <span className="text-yellow-400 font-bold text-lg">⭐ {anime.score}</span>
                                        </div>
                                    )}

                                    {/* Rank Badge */}
                                    {anime?.rank && (
                                        <div className="absolute bottom-4 right-4 bg-purple-600/80 backdrop-blur-sm rounded-lg px-3 py-2">
                                            <span className="text-white font-bold text-sm">Rank #{anime.rank}</span>
                                        </div>
                                    )}
                                </div>
                            </Link>

                            <div className="p-6">
                                <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-purple-400 transition-colors duration-300 mb-3">
                                    {anime?.title}
                                </h3>

                                <div className="space-y-2 mb-4">
                                    {anime?.type && (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-400 text-sm">Type:</span>
                                            <span className="text-purple-400 text-sm font-medium">{anime.type}</span>
                                        </div>
                                    )}

                                    {anime?.episodes && (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-400 text-sm">Episodes:</span>
                                            <span className="text-cyan-400 text-sm font-medium">{anime.episodes}</span>
                                        </div>
                                    )}

                                    {anime?.status && (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-400 text-sm">Status:</span>
                                            <span className={`text-sm font-medium px-2 py-1 rounded-full ${anime.status === 'Currently Airing' ? 'bg-green-500/20 text-green-400' :
                                                anime.status === 'Finished Airing' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {anime.status}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <Link to={`/anime/${anime.mal_id}`}>
                                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/browse">
                        <button className="px-8 py-4 bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 border border-gray-600/50">
                            View All Featured Anime
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection; 