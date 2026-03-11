import { useState, useEffect } from 'react';

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl text-center w-full h-full flex flex-col justify-center">
      <h2 className="text-4xl font-bold text-white">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </h2>
      <p className="text-gray-300 mt-2">{time.toLocaleDateString()}</p>
    </div>
  );
};

export default ClockWidget;