// Utilitário para streaming de resposta
export const streamResponse = (text: string, onChunk: (chunk: string) => void) => {
  const words = text.split(' ');
  let index = 0;

  const interval = setInterval(() => {
    if (index < words.length) {
      onChunk(words[index] + ' ');
      index++;
    } else {
      clearInterval(interval);
    }
  }, 50);

  return () => clearInterval(interval);
}; 