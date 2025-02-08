import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <div className="w-full bg-[#1a1a1a] rounded-2xl p-8 border border-[#252525]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1 - Sobre */}
          <div>
            <h3 className="text-green-500 font-medium mb-4">Sobre o DeepSeek</h3>
            <p className="text-gray-400 text-sm">
              Uma plataforma de IA de código aberto que rivaliza com o Model o1 da OpenAI. 
              Disponível na web, aplicativo e API.
            </p>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h3 className="text-green-500 font-medium mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 text-sm transition-colors">
                  Documentação
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 text-sm transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 text-sm transition-colors">
                  Comunidade
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Redes Sociais */}
          <div>
            <h3 className="text-green-500 font-medium mb-4">Conecte-se</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-green-500" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors"
              >
                <Twitter className="w-5 h-5 text-gray-400 hover:text-green-500" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-green-500" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#252525] flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 DeepSeek. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-green-500 text-sm transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-green-500 text-sm transition-colors">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 