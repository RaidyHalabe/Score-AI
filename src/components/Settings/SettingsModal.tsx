import { useState } from 'react';
import { X } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200); // Tempo da animação
  };

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      <div className={`bg-[#252525] p-4 rounded-2xl w-[525px] h-[263px] shadow-lg ${isClosing ? 'animate-fadeOut' : 'animate-scaleIn'}`}>
        <div className="bg-[#252525] rounded-lg w-full overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#353535]">
            <h2 className="text-base font-medium text-[#f5f5f5]">Settings</h2>
            <button 
              onClick={handleClose}
              className="p-1 hover:bg-[#353535] rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-[#f5f5f5] hover:text-white" />
            </button>
          </div>

          <div className="p-4">
            <div className="flex bg-[#2b2b2b] rounded-md mb-8">
              <button 
                className="flex-1 py-1.5 text-sm text-[#f5f5f5] bg-[#353535] rounded-md"
              >
                General
              </button>
              <button 
                className="flex-1 py-1.5 text-sm text-[#f5f5f5]"
              >
                Profile
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#f5f5f5]">Language</span>
                <select className="bg-[#2b2b2b] text-sm text-[#f5f5f5] px-4 py-1.5 rounded-md outline-none cursor-pointer">
                  <option value="system">System</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#f5f5f5]">Theme</span>
                <select className="bg-[#2b2b2b] text-sm text-[#f5f5f5] px-4 py-1.5 rounded-md outline-none cursor-pointer">
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 