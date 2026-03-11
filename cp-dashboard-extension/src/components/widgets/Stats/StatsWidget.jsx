import { useEffect, useState } from 'react';
import { fetchLCStats, fetchCFStats, fetchCCStats } from '../../../utils/api';

const StatsWidget = ({ lcUser, cfUser, ccUser }) => {
  const [stats, setStats] = useState({ lc: null, cf: null, cc: null });

  useEffect(() => {
    Promise.all([
      fetchLCStats(lcUser), 
      fetchCFStats(cfUser),
      fetchCCStats(ccUser)
    ]).then(([lc, cf, cc]) => {
      setStats({ lc, cf, cc });
    });
  }, [lcUser, cfUser, ccUser]);

  return (
    <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] h-full flex flex-col justify-between shadow-2xl">
      <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Coding Profile Stats</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {/* LeetCode */}
        <div className="text-center">
          <p className="text-orange-400 text-[10px] font-bold mb-1">LeetCode</p>
          <p className="text-xl font-black text-white">{stats.lc?.totalSolved || '0'}</p>
          <p className="text-[8px] text-gray-500 uppercase">Solved</p>
        </div>

        {/* Codeforces */}
        <div className="text-center border-x border-white/10">
          <p className="text-blue-400 text-[10px] font-bold mb-1">Codeforces</p>
          <p className="text-xl font-black text-white">{stats.cf?.rating || 'N/A'}</p>
          <p className="text-[8px] text-gray-500 uppercase">{stats.cf?.rank || 'Rank'}</p>
        </div>

        {/* CodeChef */}
        <div className="text-center">
          <p className="text-brown-400 text-[10px] font-bold mb-1 text-yellow-600">CodeChef</p>
          <p className="text-xl font-black text-white">{stats.cc?.rating || 'N/A'}</p>
          <p className="text-[8px] text-gray-500 uppercase">{stats.cc?.stars || 'Stars'}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
        <span className="text-[10px] text-green-400 animate-pulse">● Live Tracking</span>
        <span className="text-[10px] text-gray-500">NIT Bhopal Student Profile</span>
      </div>
    </div>
  );
};

export default StatsWidget;