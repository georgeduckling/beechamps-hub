import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const CATEGORIES = [
  { slug: 'sport', emoji: '🏆', color: '#F5A623', label: 'Sport', title: 'Sportovní programy', description: 'Atletika, míčové sporty, plavání, gymnastika a mnoho dalšího. Každý program je přizpůsoben věku a schopnostem dětí.' },
  { slug: 'vzdelavani', emoji: '📚', color: '#2ECC71', label: 'Vzdělávání', title: 'Vzdělávací programy', description: 'Interaktivní workshopy rozšiřující školní výuku zábavnou formou. Od vědeckých pokusů po programování a divadlo.' },
  { slug: 'projektove-dny', emoji: '🎯', color: '#3498DB', label: 'Projektové dny', title: 'Projektové dny', description: 'Celodenní tematické projekty, při nichž děti řeší reálné výzvy v týmech. Propojujeme různé předměty.' },
  { slug: 'akce-a-pobyty', emoji: '🌍', color: '#E74C3C', label: 'Akce a pobyty', title: 'Akce a pobyty', description: 'Vícedenní pobyty, školy v přírodě, lyžařské kurzy a letní tábory. Nezapomenutelné zážitky mimo školní lavice.' },
];

const TESTIMONIALS = [
  { name: 'Mgr. Jana Nováková', role: 'Ředitelka ZŠ Praha 4', text: 'Bee Champs Hub nám ušetřil desítky hodin administrativy. Plánování celého roku zvládneme za odpoledne. Lektoři jsou skvělí a děti se vždy těší.' },
  { name: 'Bc. Tomáš Dvořák', role: 'Zástupce ředitele MŠ Brno', text: 'Výborná platforma pro plánování mimoškolních aktivit. Vše na jednom místě, přehledné a jednoduché. Spolupráce s Bee Champs je profesionální.' },
  { name: 'PaedDr. Marie Horáčková', role: 'Ředitelka ZŠ Ostrava', text: 'Oceňuji zejména roční plánovač. Vidíme přesně, co máme naplánováno na celý rok. Děti i rodiče jsou nadšení z pestrosti programů.' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const categoriesRef = useRef<HTMLDivElement>(null);

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0D1B2E] flex items-center" style={{ height: 'calc(100vh - 68px)', marginTop: '68px' }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #F5A623, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #3498DB, transparent)', transform: 'translate(-30%, 30%)' }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle, #2ECC71, transparent)' }} />

        {/* SVG hex grid */}
        <svg className="absolute right-0 top-0 h-full opacity-5 pointer-events-none" viewBox="0 0 400 600" style={{ animation: 'pulse 4s ease-in-out infinite' }}>
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 4 }, (_, col) => {
              const x = col * 70 + (row % 2) * 35 + 20;
              const y = row * 60 + 30;
              return <polygon key={`${row}-${col}`} points={`${x},${y-25} ${x+22},${y-12} ${x+22},${y+12} ${x},${y+25} ${x-22},${y+12} ${x-22},${y-12}`} fill="none" stroke="#F5A623" strokeWidth="1" />;
            })
          )}
        </svg>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-[#F5A623] rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-[#F5A623] rounded-full" style={{ animation: 'pulse 2s ease-in-out infinite' }}></span>
              <span className="text-[#F5A623] text-sm font-medium">Platforma pro MŠ a ZŠ</span>
            </div>

            <h1 className="font-syne font-extrabold text-white mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}>
              Plánujte <span className="text-[#F5A623]">celý školní rok</span> na jednom místě
            </h1>

            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Bee Champs Hub je platforma pro české školy k výběru a plánování mimoškolních programů. 26 programů, 4 kategorie, jeden systém.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <button
                onClick={() => navigate('/planovac')}
                className="bg-[#F5A623] text-[#0D1B2E] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#FFD166] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              >
                🗓 Otevřít roční plánovač
              </button>
              <button
                onClick={scrollToCategories}
                className="border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-white/60 hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
              >
                Prohlédnout nabídku →
              </button>
            </div>

            <div className="flex flex-wrap gap-12">
              {[
                { num: '240+', label: 'Realizovaných akcí' },
                { num: '85', label: 'Zapojených škol' },
                { num: '98%', label: 'Spokojených ředitelů' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="font-syne font-bold text-[#F5A623] text-3xl">{num}</div>
                  <div className="text-white/60 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" ref={categoriesRef} className="bg-[#FDF9F3] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#F5A623] font-syne text-sm font-semibold uppercase tracking-widest mb-3">Co nabízíme</p>
            <h2 className="font-syne font-bold text-[#0D1B2E] text-4xl mb-4">Čtyři kategorie, jeden systém</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Vyberte si z našich čtyř kategorií programů a sestavte ideální školní rok pro vaše děti.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                to={`/kategorie/${cat.slug}`}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg cursor-pointer group"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4" style={{ backgroundColor: cat.color + '20' }}>
                  {cat.emoji}
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: cat.color }}>{cat.label}</p>
                <h3 className="font-syne font-bold text-[#0D1B2E] text-xl mb-3">{cat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{cat.description}</p>
                <span className="text-sm font-medium" style={{ color: cat.color }}>Zobrazit programy →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#0D1B2E] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-syne font-bold text-white text-4xl mb-4">Jak to funguje</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Vyberte programy', desc: 'Procházejte naší nabídku 26 programů ve čtyřech kategoriích.' },
              { num: '02', title: 'Přiřaďte měsíce', desc: 'Každému programu přiřaďte měsíce, kdy ho chcete realizovat.' },
              { num: '03', title: 'Odešlete poptávku', desc: 'Jedním klikem odešlete poptávku na všechny vybrané programy.' },
              { num: '04', title: 'Domluvíme vše za vás', desc: 'Postaráme se o organizaci, lektory, materiály i dopravu.' },
            ].map(step => (
              <div key={step.num} className="relative">
                <div className="text-8xl font-syne font-bold text-white/5 absolute top-0 left-0 leading-none">{step.num}</div>
                <div className="relative pt-8 pl-2">
                  <h3 className="font-syne font-bold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#FDF9F3] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-syne font-bold text-[#0D1B2E] text-4xl mb-4">Co říkají ředitelé škol</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-[#F5A623]">★</span>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F5A623] rounded-full flex items-center justify-center text-[#0D1B2E] font-bold text-sm">
                    {t.name.charAt(t.name.indexOf(' ') + 1)}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0D1B2E] text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D1B2E] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-5xl mb-6">🐝</div>
          <h2 className="font-syne font-bold text-white text-4xl mb-6">Naplánujte celý rok za 15 minut</h2>
          <button
            onClick={() => navigate('/planovac')}
            className="bg-[#F5A623] text-[#0D1B2E] px-10 py-4 rounded-xl font-semibold text-lg hover:bg-[#FFD166] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
          >
            🗓 Otevřít roční plánovač
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
