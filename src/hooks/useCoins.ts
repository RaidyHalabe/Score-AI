import { useState } from 'react';
import { storage } from '../services/localStorage';

export const useCoins = () => {
  const [coins, setCoins] = useState(storage.getCoins() || 100);

  const handleBuyCoins = (amount: number) => {
    const newTotal = coins + amount;
    setCoins(newTotal);
    storage.saveCoins(newTotal);
  };

  const handleSpendCoins = (amount: number): boolean => {
    if (coins >= amount) {
      const newTotal = coins - amount;
      setCoins(newTotal);
      storage.saveCoins(newTotal);
      return true;
    }
    return false;
  };

  return {
    coins,
    setCoins,
    handleBuyCoins,
    handleSpendCoins
  };
}; 