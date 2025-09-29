import React from 'react';
import type { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, href }) => {
  return (
    <a
      href={href}
      className="group relative block bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10"
    >
      <div className="flex justify-center items-center mb-4 text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </a>
  );
};

export default FeatureCard;
