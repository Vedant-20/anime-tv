import React from 'react';

const StatsSection = () => {
    const stats = [
        {
            icon: "🎬",
            number: "50,000+",
            label: "Anime Titles",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: "⭐",
            number: "9.5M+",
            label: "User Ratings",
            gradient: "from-yellow-500 to-orange-500"
        },
        {
            icon: "👥",
            number: "2M+",
            label: "Active Users",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: "📺",
            number: "24/7",
            label: "Updated Content",
            gradient: "from-green-500 to-emerald-500"
        }
    ];

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                        AnimeTV by the Numbers
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Join millions of anime fans discovering and rating their favorite shows
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105"
                        >
                            <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center text-2xl`}>
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-400 text-sm">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Powered by MyAnimeList
                        </h3>
                        <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                            All anime data is sourced from MyAnimeList, the world's largest anime and manga database,
                            ensuring accurate and up-to-date information.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg px-4 py-2">
                                <span className="text-purple-400">Real-time Updates</span>
                            </div>
                            <div className="bg-pink-500/20 border border-pink-500/30 rounded-lg px-4 py-2">
                                <span className="text-pink-400">Verified Data</span>
                            </div>
                            <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg px-4 py-2">
                                <span className="text-cyan-400">Community Driven</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection; 