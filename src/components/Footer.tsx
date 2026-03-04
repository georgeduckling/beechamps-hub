import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2E] border-t-2 border-[#F5A623]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐝</span>
              <span className="font-syne font-bold text-white text-lg">Bee Champs Hub</span>
            </div>
            <p className="text-white/60 text-sm">Platforma pro MŠ a ZŠ</p>
          </div>

          <div>
            <h4 className="font-syne font-semibold text-white mb-3">Kategorie</h4>
            <ul className="space-y-2">
              <li><Link to="/kategorie/sport" className="text-white/60 hover:text-white text-sm transition-colors">Sport</Link></li>
              <li><Link to="/kategorie/vzdelavani" className="text-white/60 hover:text-white text-sm transition-colors">Vzdělávání</Link></li>
              <li><Link to="/kategorie/projektove-dny" className="text-white/60 hover:text-white text-sm transition-colors">Projektové dny</Link></li>
              <li><Link to="/kategorie/akce-a-pobyty" className="text-white/60 hover:text-white text-sm transition-colors">Akce a pobyty</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-semibold text-white mb-3">Nástroje</h4>
            <ul className="space-y-2">
              <li><Link to="/planovac" className="text-white/60 hover:text-white text-sm transition-colors">Roční plánovač</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-semibold text-white mb-3">Kontakt</h4>
            <ul className="space-y-2">
              <li><span className="text-white/60 text-sm">info@beechamps.cz</span></li>
              <li><span className="text-white/60 text-sm">+420 777 123 456</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <p className="text-center text-white/40 text-sm">© 2025 Bee Champs Hub. Všechna práva vyhrazena.</p>
      </div>
    </footer>
  );
}
