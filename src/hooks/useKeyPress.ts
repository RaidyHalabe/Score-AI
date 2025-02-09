import { useEffect, useCallback } from 'react';

export const useKeyPress = (
  targetKey: string,
  handler: () => void,
  deps: any[] = []
) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        handler();
      }
    },
    [targetKey, handler]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, ...deps]);
}; 