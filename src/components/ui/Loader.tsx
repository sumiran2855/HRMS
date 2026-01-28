import React from 'react';

interface LoaderProps {
  fullScreen?: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  fullScreen = false,
  text = 'Loading...'
}) => {
  const loaderContent = (
    <div className="flex items-center justify-center gap-3">
      <div 
        className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-bounce shadow-lg shadow-blue-500/50"
        style={{ animationDelay: '0ms', animationDuration: '0.6s' }}
      ></div>
      <div 
        className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce shadow-lg shadow-purple-500/50"
        style={{ animationDelay: '150ms', animationDuration: '0.6s' }}
      ></div>
      <div 
        className="h-4 w-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 animate-bounce shadow-lg shadow-orange-500/50"
        style={{ animationDelay: '300ms', animationDuration: '0.6s' }}
      ></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-white/80 backdrop-blur-2xl dark:bg-gray-950/90"
        role="status"
        aria-label="Loading..."
      >
        {loaderContent}
        {text && (
          <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4" role="status" aria-label="Loading...">
      {loaderContent}
      {text && <p className="text-sm font-medium text-gray-600">{text}</p>}
    </div>
  );
};

export default Loader;
