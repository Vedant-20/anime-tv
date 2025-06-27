import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'

function Home({ animeList, isLoading, error, isBrowsePage = false, onLoadData }) {
    useEffect(() => {
        // If this is a browse page and no anime are loaded, trigger the fetch
        if (isBrowsePage && animeList.length === 0 && !isLoading && onLoadData) {
            onLoadData();
        }
    }, [isBrowsePage, animeList.length, isLoading, onLoadData]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <LoadingSpinner size="xl" text={isBrowsePage ? "Loading anime collection..." : "Searching for anime..."} />
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
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {isBrowsePage ? 'Error Loading Anime' : 'Search Error'}
                    </h2>
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
            <header className='bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link to={'/'}>
                                <button className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2'>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    <span>Back to Home</span>
                                </button>
                            </Link>
                            <div className="hidden sm:block">
                                <h1 className='text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent'>
                                    {isBrowsePage ? 'Browse All Anime' : 'Search Results'}
                                </h1>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-400 text-sm">
                                {isBrowsePage ? `Showing ${animeList.length} popular anime` : `Found ${animeList.length} results`}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isBrowsePage ? (
                    // Browse Page Content
                    <>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                                Browse Popular Anime
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                Discover the most popular and highly-rated anime from our extensive collection.
                                From classics to modern masterpieces, find your next favorite series.
                            </p>
                        </div>

                        {animeList.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">No Anime Available</h2>
                                <p className="text-gray-400 mb-6">Please try refreshing the page or check back later.</p>
                                <button
                                    onClick={() => onLoadData && onLoadData()}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    Load Anime
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {animeList.map((anime) => (
                                    <div
                                        key={anime?.mal_id}
                                        className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                                    >
                                        <Link to={`/anime/${anime.mal_id}`}>
                                            <div className="relative aspect-[3/4] overflow-hidden">
                                                <img
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    src={anime?.images?.jpg.image_url}
                                                    alt={anime?.title}
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                {/* Score Badge */}
                                                {anime?.score && (
                                                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                                                        <span className="text-yellow-400 font-bold text-sm">⭐ {anime.score}</span>
                                                    </div>
                                                )}

                                                {/* Rank Badge */}
                                                {anime?.rank && (
                                                    <div className="absolute top-2 left-2 bg-purple-600/80 backdrop-blur-sm rounded-lg px-2 py-1">
                                                        <span className="text-white font-bold text-xs">#{anime.rank}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>

                                        <div className="p-4">
                                            <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-purple-400 transition-colors duration-300 mb-2">
                                                {anime?.title}
                                            </h3>

                                            <div className="space-y-1">
                                                {anime?.type && (
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-400 text-xs">Type:</span>
                                                        <span className="text-purple-400 text-xs font-medium">{anime.type}</span>
                                                    </div>
                                                )}

                                                {anime?.status && (
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-400 text-xs">Status:</span>
                                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${anime.status === 'Currently Airing' ? 'bg-green-500/20 text-green-400' :
                                                            anime.status === 'Finished Airing' ? 'bg-blue-500/20 text-blue-400' :
                                                                'bg-gray-500/20 text-gray-400'
                                                            }`}>
                                                            {anime.status}
                                                        </span>
                                                    </div>
                                                )}

                                                {anime?.episodes && (
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-400 text-xs">Episodes:</span>
                                                        <span className="text-cyan-400 text-xs font-medium">{anime.episodes}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    // Search Results Content
                    <>
                        {animeList.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">No Results Found</h2>
                                <p className="text-gray-400 mb-6">Try searching with different keywords</p>
                                <Link to="/">
                                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                                        Search Again
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {animeList.map((anime) => (
                                    <div
                                        key={anime?.mal_id}
                                        className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                                    >
                                        <Link to={`/anime/${anime.mal_id}`}>
                                            <div className="relative aspect-[3/4] overflow-hidden">
                                                <img
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    src={anime?.images?.jpg.image_url}
                                                    alt={anime?.title}
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                {/* Score Badge */}
                                                {anime?.score && (
                                                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                                                        <span className="text-yellow-400 font-bold text-sm">⭐ {anime.score}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>

                                        <div className="p-4">
                                            <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-purple-400 transition-colors duration-300 mb-2">
                                                {anime?.title}
                                            </h3>

                                            <div className="space-y-1">
                                                {anime?.type && (
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-400 text-xs">Type:</span>
                                                        <span className="text-purple-400 text-xs font-medium">{anime.type}</span>
                                                    </div>
                                                )}

                                                {anime?.status && (
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-400 text-xs">Status:</span>
                                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${anime.status === 'Currently Airing' ? 'bg-green-500/20 text-green-400' :
                                                            anime.status === 'Finished Airing' ? 'bg-blue-500/20 text-blue-400' :
                                                                'bg-gray-500/20 text-gray-400'
                                                            }`}>
                                                            {anime.status}
                                                        </span>
                                                    </div>
                                                )}

                                                {anime?.episodes && (
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-400 text-xs">Episodes:</span>
                                                        <span className="text-cyan-400 text-xs font-medium">{anime.episodes}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Home