import { useEffect, useState } from 'react';
import { fetchGroupedContests } from '../../../utils/api';

const ContestWidget = () => {
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    fetchGroupedContests().then(setGrouped);
  }, []);

  return (
    <div className="p-5 glass-card rounded-[2.5rem] h-full overflow-hidden flex flex-col">
      <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4">Categorized Contests</h3>
      
      <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pr-2">
        {Object.entries(grouped).map(([platform, list]) => (
          <div key={platform}>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[1px] flex-1 bg-white/10"></span>
              <span className="text-[10px] font-bold text-gray-500 uppercase">{platform}</span>
              <span className="h-[1px] flex-1 bg-white/10"></span>
            </div>
            {list.map((c, i) => (
              <div key={i} className="flex justify-between items-center py-1 group">
                <p className="text-sm text-white/90 truncate w-40 group-hover:text-blue-400 transition-colors">{c.event}</p>
                <p className="text-[10px] text-gray-500 font-mono">
                  {new Date(c.start).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContestWidget;