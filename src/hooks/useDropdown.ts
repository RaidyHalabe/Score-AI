import { useState } from 'react';

interface DropdownPosition {
  top: number;
  left: number;
}

export const useDropdown = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({ top: 0, left: 0 });

  const handleDropdownClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    setDropdownPosition({
      top: rect.top,
      left: rect.right + 10
    });
    
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return {
    activeDropdown,
    dropdownPosition,
    setActiveDropdown,
    handleDropdownClick
  };
}; 