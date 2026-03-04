import { useState, FormEvent } from 'react';
import { usePlannerContext } from '../context/PlannerContext';
import { getCategoryColor } from './AssignMonthsModal';
import programsData from '../data/programs.json';
import { Program, MonthKey } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
}

const programs = programsData as Program[];

const MONTH_LABELS: Record<MonthKey, string> = {
  sep: 'Zář', oct: 'Říj', nov: 'Lis', dec: 'Pro',
  jan: 'Led', feb: 'Úno', mar: 'Bře', apr: 'Dub',
  may: 'Kvě', jun: 'Čvn', jul: 'Čvc', aug: 'Srp',
};

export default function InquiryModal({ open, onClose }: Props) {
  const { assignments, selectedProgramCount } = usePlannerContext();
  const [success, setSuccess] = useState(false);

  const [schoolName, setSchoolName] = useState('');
  const [schoolType, setSchoolType] = useState('');
  const [city, setCity] = useState('');
  const [childCount, setChildCount] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [contactName, setContactName] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gym, setGym] = useState('');
  const [outdoor, setOutdoor] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  if (!open) return null;

  const assignedPrograms = programs.filter(p => assignments[p.id] && assignments[p.id].size > 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!schoolName) errs.push('schoolName');
    if (!schoolType) errs.push('schoolType');
    if (!city) errs.push('city');
    if (!childCount) errs.push('childCount');
    if (!ageRange) errs.push('ageRange');
    if (!contactName) errs.push('contactName');
    if (!phone) errs.push('phone');
    if (!email) errs.push('email');
    setErrors(errs);
    if (errs.length === 0) setSuccess(true);
  };

  const hasError = (field: string) => errors.includes(field);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-xl max-w-2xl w-full mx-4 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {success ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="font-syne font-bold text-[#0D1B2E] text-2xl mb-3">Poptávka odeslána!</h2>
            <p className="text-gray-600 mb-6">Přijali jsme vaši poptávku na {selectedProgramCount} programů. Do 24 hodin se vám ozveme.</p>
            <button onClick={onClose} className="bg-[#0D1B2E] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1a2a3e] transition-colors cursor-pointer">Zavřít</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-syne font-bold text-[#0D1B2E] text-xl">Odeslat poptávku</h2>
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer leading-none">×</button>
            </div>

            {assignedPrograms.length > 0 && (
              <div className="bg-[#FDF9F3] rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-[#0D1B2E] text-sm mb-3">Váš výběr programů</h3>
                <div className="space-y-2">
                  {assignedPrograms.map(p => {
                    const months = Array.from(assignments[p.id]).map((m: MonthKey) => MONTH_LABELS[m]);
                    const color = getCategoryColor(p.category);
                    return (
                      <div key={p.id} className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></span>
                        <span>{p.emoji} {p.title}</span>
                        <span className="text-gray-400 ml-auto">{months.join(', ')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-syne font-semibold text-[#0D1B2E] mb-4">Škola</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Název školy *</label>
                  <input value={schoolName} onChange={e => setSchoolName(e.target.value)} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] ${hasError('schoolName') ? 'border-red-500' : 'border-gray-300'}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Typ instituce *</label>
                  <select value={schoolType} onChange={e => setSchoolType(e.target.value)} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] ${hasError('schoolType') ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="">Vyberte...</option>
                    <option>MŠ</option>
                    <option>ZŠ 1. stupeň</option>
                    <option>ZŠ 2. stupeň</option>
                    <option>MŠ + ZŠ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Město *</label>
                  <input value={city} onChange={e => setCity(e.target.value)} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] ${hasError('city') ? 'border-red-500' : 'border-gray-300'}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Průměrný počet dětí *</label>
                  <input value={childCount} onChange={e => setChildCount(e.target.value)} type="number" className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] ${hasError('childCount') ? 'border-red-500' : 'border-gray-300'}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Věkové rozmezí *</label>
                  <select value={ageRange} onChange={e => setAgeRange(e.target.value)} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] ${hasError('ageRange') ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="">Vyberte...</option>
                    <option>3–6</option>
                    <option>6–10</option>
                    <option>10–13</option>
                    <option>13–15</option>
                    <option>Různé</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-syne font-semibold text-[#0D1B2E] mb-4">Kontakt</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jméno a příjmení *</label>
                  <input value={contactName} onChange={e => setContactName(e.target.value)} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] ${hasError('contactName') ? 'border-red-500' : 'border-gray-300'}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pracovní pozice</label>
                  <input value={position} onChange={e => setPosition(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] ${hasError('phone') ? 'border-red-500' : 'border-gray-300'}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] ${hasError('email') ? 'border-red-500' : 'border-gray-300'}`} />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-syne font-semibold text-[#0D1B2E] mb-4">Doplňující informace</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tělocvična?</label>
                  <div className="flex gap-4">
                    {['Ano', 'Ne', 'Nevím'].map(v => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="gym" value={v} checked={gym === v} onChange={() => setGym(v)} className="cursor-pointer" />
                        <span className="text-sm">{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Venkovní hřiště?</label>
                  <div className="flex gap-4">
                    {['Ano', 'Ne', 'Nevím'].map(v => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="outdoor" value={v} checked={outdoor === v} onChange={() => setOutdoor(v)} className="cursor-pointer" />
                        <span className="text-sm">{v}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poznámky</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0D1B2E] text-white py-3 rounded-lg font-medium hover:bg-[#F5A623] hover:text-[#0D1B2E] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            >
              Odeslat poptávku na všechny programy
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
