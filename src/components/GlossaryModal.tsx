import React, { useState } from 'react';
import { X, Search, BookMarked, Sparkles } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { SubjectTopic } from '../types';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const filteredTerms = GLOSSARY_TERMS.filter(item => {
    const matchesSearch = 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (cat: SubjectTopic) => {
    switch (cat) {
      case 'vat_li':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800">Vật lí</span>;
      case 'hoa_hoc':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">Hoá học</span>;
      case 'sinh_hoc':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-100 text-green-800">Sinh học</span>;
      case 'thien_van':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800">Thiên văn</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800">Chung</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl h-[85vh] max-h-[800px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-teal-800 to-emerald-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-200">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                Bảng Tra Cứu Thuật Ngữ KHTN 6
              </h3>
              <p className="text-xs text-teal-200">
                Trích SGK KHTN 6 (Trang 193 - 196) • Kết nối tri thức với cuộc sống
              </p>
            </div>
          </div>

          <button
            id="btn-close-glossary-modal"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Category Filter */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="input-search-glossary"
              type="text"
              placeholder="Gõ từ khoá thuật ngữ (ví dụ: Quang hợp, Lực hấp dẫn, Tự dưỡng...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'sinh_hoc', label: 'Sinh học' },
              { id: 'hoa_hoc', label: 'Hoá học' },
              { id: 'vat_li', label: 'Vật lí' },
              { id: 'thien_van', label: 'Thiên văn' },
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-teal-700 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Term List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Không tìm thấy thuật ngữ nào khớp với từ khoá "{searchTerm}"
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredTerms.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-teal-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h4 className="text-sm font-bold text-slate-900">
                        {item.term}
                      </h4>
                      {getCategoryBadge(item.category)}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Sách giáo khoa</span>
                    <span className="font-semibold text-teal-700">Trang {item.page}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
