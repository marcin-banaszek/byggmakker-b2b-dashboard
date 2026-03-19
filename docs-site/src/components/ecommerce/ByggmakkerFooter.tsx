import * as React from "react"

export function ByggmakkerFooter() {
  return (
    <footer className="w-full bg-[#333333] text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Handle hos oss</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Finn varehus</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Frakt og levering</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Bytt og retur</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Prismatch</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Hjelp & Kontakt</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Kundeservice</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Kontakt oss</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Spørsmål og svar</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Garantier</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Om Byggmakker</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Bærekraft</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Jobb i Byggmakker</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Presse</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Personvern</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Følg oss</h4>
          <div className="flex gap-4 mb-4">
             {/* Social placeholders */}
             <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#cf0000] transition-colors cursor-pointer text-xs font-bold">FB</div>
             <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#cf0000] transition-colors cursor-pointer text-xs font-bold">IG</div>
             <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#cf0000] transition-colors cursor-pointer text-xs font-bold">IN</div>
          </div>
          <p className="text-xs text-gray-400 mt-6 leading-relaxed">
            Byggmakker er en av Norges ledende byggevarekjeder med varehus over hele landet.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-2xl font-black tracking-tighter text-[#cf0000] opacity-50 uppercase">
          Bygg<span className="text-white">Makker</span>
        </span>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Byggmakker Handel AS. Alle rettigheter reservert.
        </p>
      </div>
    </footer>
  )
}
