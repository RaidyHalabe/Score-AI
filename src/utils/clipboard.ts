export const clipboard = {
  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      return false;
    }
  },

  readFromClipboard: async (): Promise<string> => {
    try {
      return await navigator.clipboard.readText();
    } catch (error) {
      console.error('Failed to read clipboard:', error);
      return '';
    }
  }
}; 