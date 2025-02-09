export const CONSTANTS = {
  API: {
    BASE_URL: 'https://ai.tigoostudios.com/api',
    ENDPOINTS: {
      GAMES: '/games/today'
    }
  },
  STORAGE_KEYS: {
    CHATS: 'score_ai_chats',
    FOLDERS: 'score_ai_folders',
    SETTINGS: 'score_ai_settings',
    THEME: 'score_ai_theme',
    LANGUAGE: 'score_ai_language'
  },
  UI: {
    MAX_CHAT_TITLE_LENGTH: 50,
    MAX_FOLDER_NAME_LENGTH: 30,
    DEBOUNCE_DELAY: 300
  }
} as const; 