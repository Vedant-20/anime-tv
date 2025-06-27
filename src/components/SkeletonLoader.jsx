import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden animate-pulse">
                        <div className="aspect-[3/4] bg-gray-700/50"></div>
                        <div className="p-4 space-y-3">
                            <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-700/50 rounded w-1/2"></div>
                        </div>
                    </div>
                );

            case 'text':
                return (
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-700/50 rounded w-full"></div>
                        <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-700/50 rounded w-4/6"></div>
                    </div>
                );

            case 'image':
                return (
                    <div className="aspect-[3/4] bg-gray-700/50 rounded-2xl animate-pulse"></div>
                );

            case 'button':
                return (
                    <div className="h-12 bg-gray-700/50 rounded-xl animate-pulse w-32"></div>
                );

            case 'header':
                return (
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-700/50 rounded w-1/3"></div>
                        <div className="h-6 bg-gray-700/50 rounded w-1/2"></div>
                    </div>
                );

            default:
                return (
                    <div className="bg-gray-700/50 rounded-lg animate-pulse h-20"></div>
                );
        }
    };

    if (count === 1) {
        return renderSkeleton();
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}>
                    {renderSkeleton()}
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader; 