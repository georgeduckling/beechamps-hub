import { Link, useNavigate } from 'react-router-dom';
import { usePlannerContext } from '../context/PlannerContext';

export default function Navbar() {
  const { selectedProgramCount } = usePlannerContext();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-[#0D1B2E]/97 backdrop-blur-md flex items-center px-6">
      <div className="flex items-center flex-1">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#F5A623] rounded flex items-center justify-center text-xl">🐝</div>
          <span className="font-syne font-semibold text-white text-lg">Bee Champs <span className="text-[#F5A623]">Hub</span></span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-6 mr-6">
        <Link to="/kategorie/sport" className="text-white/80 hover:text-white text-sm transition-colors">Sport</Link>
        <Link to="/kategorie/vzdelavani" className="text-white/80 hover:text-white text-sm transition-colors">Vzdělávání</Link>
        <Link to="/kategorie/projektove-dny" className="text-white/80 hover:text-white text-sm transition-colors">Projektové dny</Link>
        <Link to="/kategorie/akce-a-pobyty" className="text-white/80 hover:text-white text-sm transition-colors">Akce</Link>
      </div>

      <div className="relative">
        <button
          onClick={() => navigate('/planovac')}
          className="relative border border-[#F5A623] text-[#F5A623] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#F5A623] hover:text-[#0D1B2E] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
        >
          🗓 Roční plánovač
          {selectedProgramCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#F5A623] text-[#0D1B2E] rounded-full text-xs flex items-center justify-center font-bold">
              {selectedProgramCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
