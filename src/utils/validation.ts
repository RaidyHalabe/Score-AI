export const validation = {
  isValidChatTitle: (title: string): boolean => {
    return title.trim().length >= 3 && title.trim().length <= 50;
  },

  isValidFolderName: (name: string): boolean => {
    return name.trim().length >= 2 && name.trim().length <= 30;
  },

  sanitizeInput: (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  }
}; 