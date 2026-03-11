import { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';
import { fetchPlatformData } from '../../../utils/api';

const StreakWidget = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchPlatformData().then(setData);
  }, []);

  if (!data) return <div className="glass-card animate-pulse h-full rounded-[2.5rem]"></div>;

  return (
    <div className="p-6 glass-card rounded-[2.5rem] h-full flex flex-col justify-between">
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Platform Streaks</h3>
      
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(data).map(([name, info]) => (
          <div key={name} className="flex flex-col items-center bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
            <img src={info.logo} alt={name} className="w-6 h-6 mb-2 grayscale group-hover:grayscale-0" />
            <div className="flex items-center gap-1">
              <Flame size={16} className={info.streak > 0 ? "text-orange-500 fill-orange-500" : "text-gray-600"} />
              <span className="text-xl font-black text-white">{info.streak}</span>
            </div>
            <p className="text-[8px] uppercase font-bold text-gray-500 mt-1">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakWidget;