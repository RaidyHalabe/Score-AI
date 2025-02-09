export const messageFormatter = {
  formatUserMessage: (content: string): string => {
    return content.trim();
  },

  formatBotMessage: (content: string): string => {
    // Remove múltiplos espaços em branco
    content = content.replace(/\s+/g, ' ');
    // Capitaliza primeira letra de cada frase
    content = content.replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
    return content.trim();
  },

  formatTimestamp: (date: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}; 