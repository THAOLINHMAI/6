import React from 'react';
import { BookOpen, Search, Sparkles, RefreshCw, Volume2, VolumeX, Award } from 'lucide-react';

interface HeaderProps {
  onOpenTheory: () => void;
  onOpenGlossary: () => void;
  onResetQuiz: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  inQuiz?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTheory,
  onOpenGlossary,
  onResetQuiz,
  soundEnabled,
  onToggleSound,
  inQuiz = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-blue-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & App Info */}
          <div 
            id="header-brand" 
            onClick={onResetQuiz} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 animate-pulse text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black bg-gradient-to-r from-blue-700 via-indigo-700 to-orange-600 bg-clip-text text-transparent">
                  GIA SƯ KHTN LỚP 6
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200">
                  <Award className="w-3 h-3 text-orange-600" /> Kết Nối Tri Thức
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Tác giả: <span className="text-blue-700 font-bold">GIÁO HÀ AI</span> • SGK & SBT KHTN 6
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="btn-theory-review"
              onClick={onOpenTheory}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors cursor-pointer"
              title="Xem tóm tắt lý thuyết trọng tâm 10 chương"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Tóm tắt</span> Lý thuyết
            </button>

            <button
              id="btn-glossary-lookup"
              onClick={onOpenGlossary}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors cursor-pointer"
              title="Tra cứu thuật ngữ khoa học SGK trang 193 - 196"
            >
              <Search className="w-4 h-4 text-orange-600" />
              <span className="hidden sm:inline">Tra cứu</span> Thuật ngữ
            </button>

            <button
              id="btn-toggle-sound"
              onClick={onToggleSound}
              type="button"
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                soundEnabled 
                  ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' 
                  : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
              }`}
              title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {inQuiz && (
              <button
                id="btn-new-quiz-header"
                onClick={onResetQuiz}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                title="Quay lại màn hình chọn bài"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden md:inline">Tạo bài mới</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
