import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import SkeletonLoader from './SkeletonLoader'
import StatsSection from './StatsSection'
import FeaturedSection from './FeaturedSection'

function Header(props) {
  const navigate = useNavigate();

  const handleBrowseAll = () => {
    // Navigate to browse page
    navigate('/browse');
  };

  const AnimeCard = ({ anime, showScore = true, showRank = false, showType = true }) => (
    <div className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
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
          {showScore && anime?.score && (
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-yellow-400 font-bold text-sm">⭐ {anime.score}</span>
            </div>
          )}

          {/* Status Badge */}
          {anime?.status && (
            <div className="absolute top-2 left-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${anime.status === 'Currently Airing' ? 'bg-green-500/20 border border-green-500/30 text-green-400' :
                anime.status === 'Finished Airing' ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400' :
                  'bg-gray-500/20 border border-gray-500/30 text-gray-400'
                }`}>
                {anime.status === 'Currently Airing' ? 'Airing' :
                  anime.status === 'Finished Airing' ? 'Finished' : anime.status}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-purple-400 transition-colors duration-300 mb-2">
          {anime?.title}
        </h3>
        <div className="flex items-center justify-between">
          {showType && (
            <span className="text-gray-400 text-xs">
              {anime?.type || 'Unknown'}
            </span>
          )}
          {showRank && anime?.rank && (
            <span className="text-purple-400 text-xs font-medium">
              #{anime.rank}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ title, icon, subtitle, gradient }) => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${gradient} rounded-xl flex items-center justify-center`}>
          <span className="text-white font-bold text-lg">{icon}</span>
        </div>
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${gradient} bg-clip-text text-transparent`}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Rate Limit Warning Banner */}
      <div className="bg-yellow-500/10 border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-yellow-400 text-sm text-center">
              <span className="font-semibold">API Rate Limit Notice:</span> We're using the Jikan API with rate limiting.
              Please be patient if data takes a moment to load.
            </p>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <header className='bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row justify-between items-center py-6 space-y-4 sm:space-y-0'>
            {/* Logo */}
            <Link to={'/'} className="group">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent'>
                  Anime<span className='text-white'>TV</span>
                </h1>
              </div>
            </Link>

            {/* Search Form */}
            <div className='w-full sm:w-auto max-w-md'>
              <form className='flex space-x-2' onSubmit={props.HandleSearch}>
                <div className="relative flex-1">
                  <input
                    className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
                    type="search"
                    placeholder='Search for an anime...'
                    required
                    value={props.search}
                    onChange={(e) => props.setSearch(e.target.value)}
                    disabled={props.isSearching}
                  />
                  {props.isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <LoadingSpinner size="sm" text="" />
                    </div>
                  )}
                </div>
                <button
                  className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                  type='submit'
                  disabled={props.isSearching}
                >
                  {props.isSearching ? 'Searching...' : 'Search'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Discover Amazing Anime
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Explore thousands of anime titles, from classics to the latest releases.
            Find your next favorite series with our comprehensive collection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl px-6 py-3">
              <span className="text-purple-400 font-semibold">🔥 Trending Now</span>
            </div>
            <div className="bg-pink-500/20 border border-pink-500/30 rounded-xl px-6 py-3">
              <span className="text-pink-400 font-semibold">⭐ Top Rated</span>
            </div>
            <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-xl px-6 py-3">
              <span className="text-cyan-400 font-semibold">📺 Currently Airing</span>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <FeaturedSection topAnime={props.topAnime} />

        {/* Stats Section */}
        <StatsSection />

        {/* Trending Anime Section */}
        <section>
          <SectionHeader
            title="🔥 Trending Now"
            icon="🔥"
            subtitle="What's hot this season"
            gradient="bg-gradient-to-r from-orange-500 to-red-500"
          />
          {props.isLoading ? (
            <SkeletonLoader type="card" count={8} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {props.trendingAnime.map((anime) => (
                <AnimeCard key={anime?.mal_id} anime={anime} showScore={true} showRank={false} />
              ))}
            </div>
          )}
        </section>

        {/* Top Anime Section */}
        <section>
          <SectionHeader
            title="⭐ Top Rated"
            icon="⭐"
            subtitle="Highest rated anime of all time"
            gradient="bg-gradient-to-r from-yellow-500 to-orange-500"
          />
          {props.isLoading ? (
            <SkeletonLoader type="card" count={10} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {props.topAnime.map((anime) => (
                <AnimeCard key={anime?.mal_id} anime={anime} showScore={true} showRank={true} />
              ))}
            </div>
          )}
        </section>

        {/* Currently Airing Section */}
        <section>
          <SectionHeader
            title="📺 Currently Airing"
            icon="📺"
            subtitle="Anime airing this season"
            gradient="bg-gradient-to-r from-green-500 to-emerald-500"
          />
          {props.isLoading ? (
            <SkeletonLoader type="card" count={6} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {props.upcomingAnime.map((anime) => (
                <AnimeCard key={anime?.mal_id} anime={anime} showScore={true} showRank={false} />
              ))}
            </div>
          )}
        </section>

        {/* Upcoming Releases Section */}
        <section>
          <SectionHeader
            title="🚀 Coming Soon"
            icon="🚀"
            subtitle="Upcoming anime releases"
            gradient="bg-gradient-to-r from-blue-500 to-purple-500"
          />
          {props.isLoading ? (
            <SkeletonLoader type="card" count={6} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {props.seasonalAnime.map((anime) => (
                <AnimeCard key={anime?.mal_id} anime={anime} showScore={false} showRank={false} />
              ))}
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="text-center py-12">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Use our powerful search to discover anime by title, genre, or any keyword you have in mind.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => document.querySelector('input[type="search"]')?.focus()}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Searching
              </button>
              <button
                onClick={handleBrowseAll}
                className="px-8 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 border border-gray-600/50"
              >
                Browse All
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Header