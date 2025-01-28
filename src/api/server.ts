import express from 'express';
import cors from 'cors';
import gamesRouter from './routes/games';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', gamesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 