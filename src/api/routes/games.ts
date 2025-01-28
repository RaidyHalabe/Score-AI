import express from 'express';
const router = express.Router();

router.get('/games/today', async (_req, res) => {
  try {
    const games = [
      {
        id: '1',
        homeTeam: 'Flamengo',
        awayTeam: 'Vasco',
        time: '16:00',
        date: new Date().toISOString().split('T')[0]
      },
      {
        id: '2',
        homeTeam: 'São Paulo',
        awayTeam: 'Palmeiras',
        time: '19:30',
        date: new Date().toISOString().split('T')[0]
      }
    ];

    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
});

export default router; 