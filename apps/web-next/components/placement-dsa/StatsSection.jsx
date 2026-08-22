import React from 'react';
import { motion } from 'framer-motion';
const StatsSection = ({ questions }) => {
    const statsVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        }
    };
    return (<motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6" variants={statsVariants} initial="hidden" animate="visible" transition={{ delay: 0.8, duration: 0.3 }}>
      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-4 flex items-center gap-4 hover:border-zinc-700 transition-colors">
        <div className="p-3 bg-blue-500/10 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M21 12V7a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h5"/><path d="M21 12H12a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"/></svg>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{questions.length}</div>
          <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Total Questions</div>
        </div>
      </div>

      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-4 flex items-center gap-4 hover:border-zinc-700 transition-colors">
        <div className="p-3 bg-green-500/10 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{questions.filter(q => q.difficulty === 'Easy').length}</div>
          <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Easy</div>
        </div>
      </div>

      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-4 flex items-center gap-4 hover:border-zinc-700 transition-colors">
        <div className="p-3 bg-yellow-500/10 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M12 2v20"/><path d="m2 12 20 0"/></svg>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{questions.filter(q => q.difficulty === 'Medium').length}</div>
          <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Medium</div>
        </div>
      </div>

      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800 p-4 flex items-center gap-4 hover:border-zinc-700 transition-colors">
        <div className="p-3 bg-red-500/10 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">{questions.filter(q => q.difficulty === 'Hard').length}</div>
          <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Hard</div>
        </div>
      </div>
    </motion.div>);
};
export default StatsSection;
