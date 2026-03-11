import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DailyFuel.module.css';
import QuoteBox from './QuoteBox';
import WeatherCard from './WeatherCard';

const DailyFuel = () => {
  // ── States ──
  const [quote, setQuote] = useState({ text: "Fetching wisdom...", author: "Loading" });
  const [weather, setWeather] = useState({
    temp: "--°C",
    humidity: "--%",
    sunrise: "--:-- AM",
    sunset: "--:-- PM"
  });

  // ── Fetch Quote Function ──
  const fetchQuote = async () => {
    try {
      setQuote({ text: "Fetching wisdom...", author: "Loading" }); // Loading state
      const response = await axios.get('https://dummyjson.com/quotes/random');
      setQuote({
        text: `"${response.data.quote}"`,
        author: `— ${response.data.author}`
      });
    } catch (error) {
      console.error("Quote fetch error:", error);
      // Fallback agar internet slow ho
      setQuote({
        text: '"Code is like humor. When you have to explain it, it\'s bad."',
        author: '— Cory House'
      });
    }
  };

  // ── Fetch Weather Function (For Bhopal) ──
  const fetchWeather = async () => {
    try {
      // wttr.in is an amazing free API that doesn't require an API key
      const response = await axios.get('https://wttr.in/Bhopal?format=j1');
      const current = response.data.current_condition[0];
      const astronomy = response.data.weather[0].astronomy[0];

      setWeather({
        temp: `${current.temp_C}°C`,
        humidity: `${current.humidity}%`,
        sunrise: astronomy.sunrise,
        sunset: astronomy.sunset
      });
    } catch (error) {
      console.error("Weather fetch error:", error);
      // Fallback data
      setWeather({ temp: "24°C", humidity: "62%", sunrise: "6:32 AM", sunset: "6:48 PM" });
    }
  };

  // ── On Mount (Page Load) ──
  useEffect(() => {
    fetchQuote();
    fetchWeather();
  }, []);

  return (
    <div className={styles.container}>
      
      {/* ── HEADER ── */}
      <div className={styles.sh}>
        <div className={styles.shTitle}>
          {/* FIX: Pink Dot Class added here! */}
          <div className={`${styles.shDot} ${styles.sdPink}`}></div>
          Daily Fuel
        </div>
        {/* Refresh button fetches a new quote */}
        <div className={styles.nextBtn} onClick={fetchQuote} title="Get New Quote">↻</div>
      </div>

      <div className={styles.inspireWrap}>
        
        {/* ── 1. QUOTE COMPONENT (Dynamic) ── */}
        <QuoteBox 
          text={quote.text} 
          author={quote.author} 
        />

        {/* ── 2. WEATHER COMPONENTS (Dynamic) ── */}
        <div className={styles.inspireBottom}>
          <WeatherCard icon="🌤" value={weather.temp} label="Bhopal" colorClass="cYellow" />
          <WeatherCard icon="💧" value={weather.humidity} label="Humidity" colorClass="cCyan" />
          <WeatherCard icon="🌅" value={weather.sunrise} label="Sunrise" colorClass="cOrange" />
          <WeatherCard icon="🌙" value={weather.sunset} label="Sunset" colorClass="cPurple" />
        </div>

      </div>
    </div>
  );
};

export default DailyFuel;