import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CategorySlug, Program } from '../types';
import programsData from '../data/programs.json';
import AssignMonthsModal, { getCategoryColor } from '../components/AssignMonthsModal';
import Footer from '../components/Footer';

const programs = programsData as Program[];

const CATEGORY_META: Record<CategorySlug, { label: string; color: string; emoji: string; title: string; description: string }> = {
  sport: { label: 'Sport', color: '#F5A623', emoji: '🏆', title: 'Sportovní programy', description: 'Sportovní programy pro MŠ a ZŠ vedené profesionálními instruktory. Nabízíme atletiku, míčové sporty, plavání, gymnastiku a mnoho dalšího. Každý program je přizpůsoben věku a schopnostem dětí.' },
  vzdelavani: { label: 'Vzdělávání', color: '#2ECC71', emoji: '📚', title: 'Vzdělávací programy', description: 'Interaktivní vzdělávací workshopy rozšiřující školní výuku zábavnou formou. Od vědeckých pokusů po programování a divadelní tvorbu. Každý workshop je připraven zkušenými pedagogy a lektory.' },
  'projektove-dny': { label: 'Projektové dny', color: '#3498DB', emoji: '🎯', title: 'Projektové dny', description: 'Celodenní tematické projekty, při nichž děti řeší reálné výzvy v týmech. Propojujeme různé předměty do smysluplného celku. Ideální pro rozvoj kritického myšlení a spolupráce.' },
  'akce-a-pobyty': { label: 'Akce a pobyty', color: '#E74C3C', emoji: '🌍', title: 'Akce a pobyty', description: 'Vícedenní pobyty, školy v přírodě, lyžařské kurzy a letní tábory. Nezapomenutelné zážitky mimo školní lavice pod dohledem zkušených vedoucích. Kompletní organizaci včetně dopravy zajistíme.' },
};

const VALID_SLUGS = Object.keys(CATEGORY_META) as CategorySlug[];

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  if (!slug || !VALID_SLUGS.includes(slug as CategorySlug)) {
    return (
      <div className="min-h-screen bg-[#FDF9F3] flex items-center justify-center pt-[68px]">
        <div className="text-center">
          <h1 className="font-syne font-bold text-[#0D1B2E] text-4xl mb-4">404 – kategorie nenalezena</h1>
          <button onClick={() => navigate('/')} className="text-[#F5A623] hover:underline cursor-pointer">← Zpět na úvod</button>
        </div>
      </div>
    );
  }

  const categorySlug = slug as CategorySlug;
  const meta = CATEGORY_META[categorySlug];
  const categoryPrograms = programs.filter(p => p.category === categorySlug);

  return (
    <div className="pt-[68px]">
      {/* Hero */}
      <section className="bg-[#0D1B2E] relative overflow-hidden py-16 px-6">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-15 pointer-events-none" style={{ background: `radial-gradient(circle, ${meta.color}, transparent)`, transform: 'translate(20%, -20%)' }} />
        <div className="max-w-7xl mx-auto">
          <button onClick={() => navigate('/')} className="text-white/60 hover:text-white text-sm mb-6 flex items-center gap-1 cursor-pointer focus:outline-none">
            ← Zpět
          </button>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4" style={{ backgroundColor: meta.color + '25' }}>
            {meta.emoji}
          </div>
          <h1 className="font-syne font-bold text-white text-4xl mb-4">{meta.title}</h1>
          <p className="text-white/70 max-w-2xl leading-relaxed">{meta.description}</p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="bg-[#FDF9F3] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPrograms.map(program => {
              const color = getCategoryColor(program.category);
              return (
                <div key={program.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                  <div className="h-[140px] flex items-center justify-center text-5xl" style={{ backgroundColor: color + '20' }}>
                    {program.emoji}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-syne font-bold text-[#0D1B2E] text-lg mb-2">{program.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{program.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">👶 {program.ageRange}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">⏱ {program.duration}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">👨‍🏫 {program.instructors}</span>
                    </div>
                    <button
                      onClick={() => setSelectedProgram(program)}
                      className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-colors cursor-pointer focus:outline-none focus:ring-2"
                      style={{ backgroundColor: color }}
                    >
                      + Přidat do plánovače
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AssignMonthsModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onDone={() => navigate('/planovac')}
      />

      <Footer />
    </div>
  );
}
