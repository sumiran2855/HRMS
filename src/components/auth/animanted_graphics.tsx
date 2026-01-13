"use client"

import { useEffect, useState } from "react"

export const AnimatedGraphic = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Background Grid Pattern with Enhanced Visibility */}
            <div className="absolute inset-0 opacity-15">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.3) 2px, transparent 2px),
                            linear-gradient(90deg, rgba(255,255,255,0.3) 2px, transparent 2px)
                        `,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* Animated Circles with Enhanced Design */}
            <div className="relative w-80 h-80">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white/25 animate-spin shadow-2xl" style={{ animationDuration: '20s' }}>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/60 rounded-full shadow-lg shadow-white/40" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/60 rounded-full shadow-lg shadow-white/40" />
                </div>

                {/* Middle Ring */}
                <div className="absolute inset-8 rounded-full border-2 border-white/35 animate-spin shadow-xl" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/70 rounded-full shadow-md shadow-white/50" />
                    <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white/70 rounded-full shadow-md shadow-white/50" />
                    <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-white/70 rounded-full shadow-md shadow-white/50" />
                </div>

                {/* Inner Ring */}
                <div className="absolute inset-16 rounded-full border-2 border-white/45 animate-spin shadow-lg" style={{ animationDuration: '10s' }}>
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/80 rounded-full shadow-md shadow-white/60" />
                </div>

                {/* Center Icon with Enhanced Design */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border-2 border-white/30 shadow-2xl">
                        <svg className="w-12 h-12 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Floating Elements with Enhanced Styling */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl animate-bounce flex items-center justify-center shadow-xl border border-white/30" style={{ animationDuration: '3s' }}>
                    <svg className="w-5 h-5 text-white/80 drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22,4 12,14.01 9,11.01" />
                    </svg>
                </div>

                <div className="absolute bottom-8 left-4 w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl animate-bounce flex items-center justify-center shadow-xl border border-white/30" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                    <svg className="w-5 h-5 text-white/80 drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                </div>

                <div className="absolute top-1/3 -left-3 w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full animate-pulse shadow-lg border border-white/30" style={{ animationDuration: '2s' }} />
                <div className="absolute bottom-1/4 -right-3 w-5 h-5 bg-white/25 backdrop-blur-sm rounded-full animate-pulse shadow-lg border border-white/30" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
            </div>

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};