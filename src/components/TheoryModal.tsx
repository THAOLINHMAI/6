import React, { useState } from 'react';
import { X, BookOpen, Search, CheckCircle2, ChevronRight, Sparkles, Filter } from 'lucide-react';
import { LESSON_SUMMARIES, CHAPTERS_DATA } from '../data/chaptersData';
import { SubjectTopic } from '../types';

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TheoryModal: React.FC<TheoryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);

  if (!isOpen) return null;

  const filteredLessons = LESSON_SUMMARIES.filter(lesson => {
    const matchSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.summaryPoints.some(pt => pt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lesson.keyTerms.some(term => term.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchTopic = selectedTopic === 'all' || lesson.topic === selectedTopic;
    return matchSearch && matchTopic;
  });

  const activeLesson = LESSON_SUMMARIES.find(l => l.id === selectedLessonId) || filteredLessons[0] || LESSON_SUMMARIES[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-5xl h-[88vh] max-h-[850px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-emerald-800 to-teal-800 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                Tóm Tắt Lý Thuyết Trọng Tâm KHTN 6
              </h3>
              <p className="text-xs text-emerald-200">
                Theo chương trình SGK Kết Nối Tri Thức Với Cuộc Sống • Giáo Hà AI biên soạn
              </p>
            </div>
          </div>

          <button
            id="btn-close-theory-modal"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Topic Filters */}
        <div className="p-3 sm:p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="input-search-theory"
              type="text"
              placeholder="Tìm kiếm bài học, hiện tượng, định nghĩa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'vat_li', label: 'Vật lí' },
              { id: 'hoa_hoc', label: 'Hoá học' },
              { id: 'sinh_hoc', label: 'Sinh học' },
              { id: 'thien_van', label: 'Thiên văn' },
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTopic(t.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedTopic === t.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body: Sidebar + Main Viewer */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Lessons List Sidebar */}
          <div className="w-1/3 min-w-[200px] sm:min-w-[280px] border-r border-slate-200 overflow-y-auto p-2 sm:p-3 space-y-1.5 bg-slate-50/40">
            {filteredLessons.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                Không tìm thấy bài học phù hợp
              </div>
            ) : (
              filteredLessons.map(lesson => {
                const isActive = activeLesson?.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-xl text-xs transition-all flex items-start justify-between gap-2 border ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-950 border-emerald-300 font-bold shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100/70 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="block line-clamp-1">{lesson.title}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block font-normal">
                        {lesson.chapterTitle.split(':')[0]} • Trang {lesson.pageSGK}
                      </span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                  </button>
                );
              })
            )}
          </div>

          {/* Lesson Detail Reader */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
            {activeLesson ? (
              <div>
                
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {activeLesson.chapterTitle}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    SGK KHTN 6 - Trang {activeLesson.pageSGK}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                  {activeLesson.title}
                </h2>

                {/* Key Points */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Kiến thức cốt lõi cần nhớ:
                  </h4>
                  <div className="space-y-2.5">
                    {activeLesson.summaryPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="grow">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Terms Pill Box */}
                {activeLesson.keyTerms && activeLesson.keyTerms.length > 0 && (
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200">
                    <h5 className="text-xs font-bold text-teal-900 uppercase tracking-wide mb-2">
                      Thuật ngữ & Từ khoá quan trọng:
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {activeLesson.keyTerms.map((term, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-teal-200 text-teal-800 shadow-xs"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                Vui lòng chọn bài học từ danh sách bên trái
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
