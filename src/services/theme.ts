type Theme = 'dark' | 'light';

export const themeService = {
  applyTheme: (theme: Theme) => {
    document.body.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('theme', theme);
  },

  getStoredTheme: (): Theme => {
    return (localStorage.getItem('theme') as Theme) || 'dark';
  },

  isDarkMode: (): boolean => {
    return !document.body.classList.contains('light-theme');
  }
}; 