interface GameResponse {
  res2: string;
}

export async function fetchGamesInfo(): Promise<string> {
  try {
    const response = await fetch('https://ai.tigoostudios.com/api/games/today', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: "Quantos times jogam hoje?"
      })
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar jogos: ${response.status}`);
    }

    const data: GameResponse = await response.json();
    return data.res2;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
} 