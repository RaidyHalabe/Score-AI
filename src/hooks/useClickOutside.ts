import { useEffect } from 'react';

export const useClickOutside = (
  refs: React.RefObject<HTMLElement>[],
  handler: () => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refs.every(ref => ref.current && !ref.current.contains(event.target as Node))) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handler, ...dependencies]);
}; 