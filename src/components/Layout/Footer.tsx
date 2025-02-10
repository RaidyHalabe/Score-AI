import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <div className="w-full bg-[#1a1a1a] rounded-2xl p-8 border border-[#252525]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 2 - Links Rápidos */}
          <div className="md:col-span-2">
            <h3 className="text-green-500 font-medium mb-4">Produto</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#A3A3A3] hover:text-green-500 text-sm transition-colors">
                  Aplicativo Score AI
                </a>
              </li>
              <li>
                <a href="#" className="text-[#A3A3A3] hover:text-green-500 text-sm transition-colors">
                  Plataforma Score AI
                </a>
              </li>
              <li>
                <a href="#" className="text-[#A3A3A3] hover:text-green-500 text-sm transition-colors">
                  Preços da API
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Redes Sociais */}
          <div>
            <h3 className="text-green-500 font-medium mb-4">Jurídico e Segurança</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#A3A3A3] hover:text-green-500 text-sm transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-[#A3A3A3] hover:text-green-500 text-sm transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-[#A3A3A3] hover:text-green-500 text-sm transition-colors">
                  Relatar vulnerabilidades
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#252525] flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#A3A3A3] text-sm mb-4 md:mb-0">
            © 2024 Score AI. Todos os direitos reservados.
          </p>
        </div>

        {/* Redes Sociais */}
        <div className="flex space-x-4 mt-8">
          <a href="#" className="p-2 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors">
            <Github className="w-5 h-5 text-[#A3A3A3] hover:text-green-500" />
          </a>
          <a href="#" className="p-2 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors">
            <Twitter className="w-5 h-5 text-[#A3A3A3] hover:text-green-500" />
          </a>
          <a href="#" className="p-2 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors">
            <Linkedin className="w-5 h-5 text-[#A3A3A3] hover:text-green-500" />
          </a>
        </div>
      </div>
    </div>
  );
}; 