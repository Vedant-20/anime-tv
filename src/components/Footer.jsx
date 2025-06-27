import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800/50 backdrop-blur-lg border-t border-gray-700/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              AnimeTV
            </h3>
          </div>

          <p className="text-gray-400 text-sm mb-4">
            Discover and explore the world of anime with our comprehensive collection
          </p>

          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="text-gray-500">Built with</span>
            <div className="flex items-center space-x-1">
              <span className="text-red-500 animate-pulse">❤️</span>
              <span className="text-gray-400">&</span>
              <span className="text-yellow-400 font-semibold">JavaScript</span>
            </div>
            <span className="text-gray-500">by</span>
            <a
              href="https://github.com/Vedant-20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-semibold"
            >
              Vedant Warjurkar
            </a>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <p className="text-gray-500 text-xs">
              Powered by Jikan API • Data from MyAnimeList
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer