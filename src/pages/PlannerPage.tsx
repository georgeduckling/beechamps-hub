import { useState, useRef } from 'react';
import { CategorySlug, MonthKey, Program } from '../types';
import programsData from '../data/programs.json';
import { usePlannerContext } from '../context/PlannerContext';
import AssignMonthsModal, { getCategoryColor } from '../components/AssignMonthsModal';
import InquiryModal from '../components/InquiryModal';

const programs = programsData as Program[];

const MONTHS: { key: MonthKey; label: string }[] = [
  { key: 'sep', label: 'Září' },
  { key: 'oct', label: 'Říjen' },
  { key: 'nov', label: 'Listopad' },
  { key: 'dec', label: 'Prosinec' },
  { key: 'jan', label: 'Leden' },
  { key: 'feb', label: 'Únor' },
  { key: 'mar', label: 'Březen' },
  { key: 'apr', label: 'Duben' },
  { key: 'may', label: 'Květen' },
  { key: 'jun', label: 'Červen' },
  { key: 'jul', label: 'Červenec' },
  { key: 'aug', label: 'Srpen' },
];

const MONTH_SHORT: Record<MonthKey, string> = {
  sep: 'Zář', oct: 'Říj', nov: 'Lis', dec: 'Pro',
  jan: 'Led', feb: 'Úno', mar: 'Bře', apr: 'Dub',
  may: 'Kvě', jun: 'Čvn', jul: 'Čvc', aug: 'Srp',
};

const CATEGORY_FILTERS = [
  { key: 'all', label: 'Vše' },
  { key: 'sport', label: 'Sport' },
  { key: 'vzdelavani', label: 'Vzdělávání' },
  { key: 'projektove-dny', label: 'Projektové' },
  { key: 'akce-a-pobyty', label: 'Pobyty' },
] as const;

const CATEGORY_LABELS: Record<CategorySlug, string> = {
  sport: 'Sport',
  vzdelavani: 'Vzdělávání',
  'projektove-dny': 'Projektové dny',
  'akce-a-pobyty': 'Akce a pobyty',
};

export default function PlannerPage() {
  const { assignments, removeFromMonth, clearAll, getMonthsForProgram, selectedProgramCount } = usePlannerContext();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | CategorySlug>('all');
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredPrograms = programs.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'all' || p.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const groupedPrograms = (['sport', 'vzdelavani', 'projektove-dny', 'akce-a-pobyty'] as CategorySlug[])
    .map(cat => ({
      category: cat,
      programs: filteredPrograms.filter(p => p.category === cat),
    }))
    .filter(g => g.programs.length > 0);

  const assignedPrograms = programs.filter(p => assignments[p.id] && assignments[p.id].size > 0);

  return (
    <div className="pt-[68px] min-h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 68px)' }}>
        {/* Sidebar */}
        <div className="w-[340px] flex-shrink-0 bg-[#0D1B2E] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="font-syne font-bold text-white text-lg mb-1">Nabídka programů</h2>
            <p className="text-white/50 text-xs mb-3">Klikněte na program pro přiřazení měsíců</p>
            <input
              ref={searchRef}
              type="text"
              placeholder="Hledat program..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F5A623] mb-3"
            />
            <div className="flex flex-wrap gap-1">
              {CATEGORY_FILTERS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key as 'all' | CategorySlug)}
                  className="px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer focus:outline-none"
                  style={activeFilter === f.key
                    ? { backgroundColor: '#F5A623', color: '#0D1B2E' }
                    : { backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {groupedPrograms.map(({ category, programs: catPrograms }) => {
              const color = getCategoryColor(category);
              return (
                <div key={category}>
                  <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: color + '20', color }}>
                    {CATEGORY_LABELS[category]}
                  </div>
                  {catPrograms.map(program => {
                    const months = getMonthsForProgram(program.id);
                    const isAssigned = months.length > 0;
                    return (
                      <button
                        key={program.id}
                        onClick={() => setSelectedProgram(program)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer text-left border-b border-white/5 focus:outline-none"
                        style={isAssigned ? { borderLeft: `3px solid ${color}` } : {}}
                      >
                        <div className="w-8 h-8 rounded flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: color + '20' }}>
                          {program.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium truncate">{program.title}</div>
                          <div className="text-white/40 text-xs">{program.ageRange} · {program.duration}</div>
                          {isAssigned && (
                            <div className="text-xs mt-0.5" style={{ color }}>✓ Vybráno ({months.length}×)</div>
                          )}
                        </div>
                        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2" style={isAssigned ? { backgroundColor: color, borderColor: color } : { borderColor: 'rgba(255,255,255,0.3)' }}>
                          {isAssigned && <span className="text-white text-xs">✓</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main calendar area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#FDF9F3]">
          <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <div>
              <h1 className="font-syne font-bold text-[#0D1B2E] text-xl">Roční plánovač</h1>
              <p className="text-gray-500 text-sm">{selectedProgramCount} programů vybráno</p>
            </div>
            <button
              onClick={() => setInquiryOpen(true)}
              disabled={selectedProgramCount === 0}
              className="bg-[#0D1B2E] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#F5A623] hover:text-[#0D1B2E] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#0D1B2E]"
            >
              📬 Odeslat poptávku
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MONTHS.map(({ key: monthKey, label }) => {
                const monthPrograms = programs.filter(p => assignments[p.id] && assignments[p.id].has(monthKey));
                return (
                  <div key={monthKey} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <h3 className="font-syne font-semibold text-[#0D1B2E] text-sm">{label}</h3>
                      {monthPrograms.length > 0 && (
                        <span className="bg-[#0D1B2E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {monthPrograms.length}
                        </span>
                      )}
                    </div>
                    <div className="p-3 space-y-2">
                      {monthPrograms.map(program => {
                        const color = getCategoryColor(program.category);
                        return (
                          <div
                            key={program.id}
                            className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5 group"
                          >
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></span>
                            <span className="text-sm flex-1 truncate">{program.emoji} {program.title}</span>
                            <button
                              onClick={() => removeFromMonth(program.id, monthKey)}
                              className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 text-sm leading-none focus:outline-none"
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                      <button
                        onClick={() => {
                          searchRef.current?.focus();
                          searchRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full text-center text-xs text-gray-400 hover:text-[#F5A623] py-1 transition-colors cursor-pointer focus:outline-none"
                      >
                        + Přidat program
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#1a2a3a] border-t border-white/10 px-6 py-3 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-white text-sm font-medium">Vybrané programy</span>
            {assignedPrograms.length > 0 && (
              <button
                onClick={clearAll}
                className="text-white/40 hover:text-white/80 text-xs transition-colors cursor-pointer focus:outline-none"
              >
                Vymazat vše
              </button>
            )}
          </div>

          <div className="flex-1 overflow-x-auto">
            {assignedPrograms.length === 0 ? (
              <p className="text-white/40 text-sm">Zatím nic nevybráno. Klikněte na program vlevo →</p>
            ) : (
              <div className="flex gap-2 pb-1">
                {assignedPrograms.map(program => {
                  const months = Array.from(assignments[program.id]).map((m: MonthKey) => MONTH_SHORT[m]);
                  const color = getCategoryColor(program.category);
                  return (
                    <div
                      key={program.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs flex-shrink-0"
                      style={{ backgroundColor: color + '20', border: `1px solid ${color}40` }}
                    >
                      <span>{program.emoji}</span>
                      <span className="text-white font-medium">{program.title}</span>
                      <span className="text-white/50">{months.join(', ')}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={() => setInquiryOpen(true)}
            disabled={selectedProgramCount === 0}
            className="flex-shrink-0 bg-[#F5A623] text-[#0D1B2E] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#FFD166] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
          >
            📬 Odeslat poptávku najednou
          </button>
        </div>
      </div>

      <AssignMonthsModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />

      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
