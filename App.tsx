import React from 'react';
import FeatureCard from './components/FeatureCard';
import type { FeatureCardProps } from './types';

const BuildingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
);

const featureCardsData: FeatureCardProps[] = [
    {
        title: 'Clearwater',
        description: 'Check permit details in the Clearwater area.',
        icon: <BuildingIcon />,
        href: '/clearwater.html'
    },
    {
        title: 'Pinellas County',
        description: 'Search for permits in Pinellas County.',
        icon: <BuildingIcon />,
        href: '/pinellas.html'
    },
    {
        title: 'Hillsborough County',
        description: 'Find permit data for Hillsborough County.',
        icon: <BuildingIcon />,
        href: '/hillsborough.html'
    },
    {
        title: 'Manatee County',
        description: 'Access permit information in Manatee County.',
        icon: <BuildingIcon />,
        href: '/manatee.html'
    },
    {
        title: 'Pasco County',
        description: 'Look up permits within Pasco County.',
        icon: <BuildingIcon />,
        href: '/pasco.html'
    },
];


const App: React.FC = () => {
    return (
        <div className="relative min-h-screen w-full bg-slate-900 text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-lighten filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-lighten filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-lighten filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-yellow-500 rounded-full mix-blend-lighten filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
            </div>

            <div className="absolute top-4 right-4 z-20 sm:top-6 sm:right-6">
                <button
                  aria-label="Logout"
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors duration-300"
                >
                    Logout
                </button>
            </div>

            <main className="relative z-10 flex flex-col items-center min-h-screen p-4 sm:p-6 lg:p-8">
                <header className="text-center my-12 max-w-4xl mt-16 sm:mt-20">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 pb-2">
                        Permit Data Reports
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-slate-300">
                        Generate building permit reports in minutes
                    </p>
                </header>

                <div className="w-full max-w-2xl flex flex-col items-stretch gap-6">
                    {featureCardsData.map((card, index) => (
                        <FeatureCard key={index} {...card} />
                    ))}
                </div>

                <div className="text-center mt-16 max-w-4xl">
                    <p className="text-lg text-slate-300">
                        Need an AI automation system? Send an email to <a href="mailto:plibertad@bplexleads.com" className="text-cyan-400 hover:underline font-medium">plibertad@bplexleads.com</a>
                    </p>
                </div>

                <div className="w-full max-w-4xl mt-48 mb-4">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-center text-sm text-slate-400">
                        <a href="#" className="hover:text-cyan-400 hover:underline transition-colors">Guide & Documentation</a>
                        <a href="#" className="hover:text-cyan-400 hover:underline transition-colors">Contact the Dev</a>
                        <a href="#" className="hover:text-cyan-400 hover:underline transition-colors">Projects by the Dev</a>
                        <a href="#" className="hover:text-cyan-400 hover:underline transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-cyan-400 hover:underline transition-colors">Privacy Policy</a>
                    </div>
                </div>

                <footer className="w-full max-w-6xl mt-auto py-6 text-slate-400 text-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-700/50 pt-6">
                        <span>Made by @venthewise</span>
                        <span>© {new Date().getFullYear()} Permit Data Reports. All rights reserved.</span>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default App;