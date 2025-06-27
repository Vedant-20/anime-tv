import React from 'react';

const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-12 h-12",
        lg: "w-16 h-16",
        xl: "w-24 h-24"
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-8">
            <div className={`${sizeClasses[size]} relative`}>
                <div className="absolute inset-0 rounded-full border-4 border-gray-700/30"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 border-b-cyan-500 border-l-emerald-500 animate-spin"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></div>
            </div>
            {text && (
                <p className="text-gray-300 font-medium text-lg animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner; 