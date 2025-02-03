import { useState, useEffect } from 'react';

export const useThemeColors = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme as 'light' | 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Background and overlay settings
  const backgroundImage = theme === 'dark' 
    ? "url('/dark-theme-bg.jpg')" // Replace with your dark theme background image path
    : "url('/light-theme-bg.jpg')"; // Replace with your light theme background image path
  
  const overlayStyle = theme === 'dark' 
    ? { backgroundColor: "rgba(0, 0, 0, 0.7)" } // Dark overlay for dark theme
    : { backgroundColor: "rgba(255, 255, 255, 0.5)" }; // Lighter overlay for light theme

  return { 
    theme, 
    toggleTheme, 
    backgroundImage,
    overlayStyle 
  };
};
