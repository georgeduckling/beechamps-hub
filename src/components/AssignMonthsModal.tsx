import { Program, MonthKey, CategorySlug } from '../types';
import { usePlannerContext } from '../context/PlannerContext';

interface Props {
  program: Program | null;
  onClose: () => void;
  onDone?: () => void;
}

export function getCategoryColor(category: CategorySlug): string {
  const colors: Record<CategorySlug, string> = {
    sport: '#F5A623',
    vzdelavani: '#2ECC71',
    'projektove-dny': '#3498DB',
    'akce-a-pobyty': '#E74C3C',
  };
  return colors[category];
}

const MONTHS: { key: MonthKey; label: string }[] = [
  { key: 'sep', label: 'Zář' },
  { key: 'oct', label: 'Říj' },
  { key: 'nov', label: 'Lis' },
  { key: 'dec', label: 'Pro' },
  { key: 'jan', label: 'Led' },
  { key: 'feb', label: 'Úno' },
  { key: 'mar', label: 'Bře' },
  { key: 'apr', label: 'Dub' },
  { key: 'may', label: 'Kvě' },
  { key: 'jun', label: 'Čvn' },
  { key: 'jul', label: 'Čvc' },
  { key: 'aug', label: 'Srp' },
];

export default function AssignMonthsModal({ program, onClose, onDone }: Props) {
  const { toggleMonth, getMonthsForProgram } = usePlannerContext();

  if (!program) return null;

  const selectedMonths = getMonthsForProgram(program.id);
  const color = getCategoryColor(program.category);

  const handleClose = () => {
    onClose();
    onDone?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full mx-4 p-6 shadow-2xl"
        style={{ animation: 'modalIn 0.2s ease-out' }}
        onClick={e => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.95) translateY(-10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: color + '20' }}>
            {program.emoji}
          </div>
          <div>
            <h2 className="font-syne font-bold text-[#0D1B2E] text-lg">{program.title}</h2>
            <p className="text-sm text-gray-500">{program.ageRange} · {program.duration}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          Kdy chcete tento program realizovat? Můžete přidat do více měsíců.
        </p>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {MONTHS.map(({ key, label }) => {
            const isSelected = selectedMonths.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleMonth(program.id, key)}
                className="py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2"
                style={isSelected
                  ? { backgroundColor: color, color: 'white', border: `2px solid ${color}` }
                  : { backgroundColor: 'white', color: '#374151', border: '2px solid #D1D5DB' }
                }
              >
                {label}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleClose}
          className="w-full bg-[#0D1B2E] text-white py-3 rounded-lg font-medium hover:bg-[#1a2a3e] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0D1B2E]"
        >
          Zavřít
        </button>
      </div>
    </div>
  );
}
