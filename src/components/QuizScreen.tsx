import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  HelpCircle, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Clock, 
  AlertCircle,
  Sparkles,
  BookOpen,
  Check,
  X,
  Volume2,
  Smile,
  PartyPopper,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, QuizConfig, QuizResult } from '../types';
import { calculateQuizResult, soundFx } from '../utils/quizUtils';

interface QuizScreenProps {
  config: QuizConfig;
  questions: Question[];
  soundEnabled: boolean;
  onFinishQuiz: (result: QuizResult) => void;
  onCancelQuiz: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  config,
  questions,
  soundEnabled,
  onFinishQuiz,
  onCancelQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Instant answer reaction state ('correct' | 'wrong' | null)
  const [answerReaction, setAnswerReaction] = useState<'correct' | 'wrong' | null>(null);

  // Timer state
  const totalSeconds = (config.timeLimitMinutes || 15) * 60;
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      if (config.mode === 'exam') {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [config.mode]);

  // Reset hint/explanation & reaction when moving to new question
  useEffect(() => {
    setShowHint(false);
    setShowExplanation(false);
    setAnswerReaction(null);
  }, [currentIndex]);

  const currentQ = questions[currentIndex];
  const selectedOption = userAnswers[currentQ?.id];

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));

    const isCorrect = optionIndex === currentQ.correctAnswer;

    if (isCorrect) {
      setAnswerReaction('correct');
      if (soundEnabled) {
        soundFx.playApplause();
      }
      // Tung bông tung hoa hoành tráng (Multiple confetti bursts with flower colors)
      try {
        // Burst 1: Center floral burst
        confetti({
          particleCount: 90,
          spread: 90,
          origin: { y: 0.62 },
          colors: ['#3B82F6', '#F97316', '#F59E0B', '#EC4899', '#10B981', '#6366F1', '#EF4444'],
          ticks: 200
        });
        // Burst 2: Side flowers after 120ms
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0.1, y: 0.7 },
            colors: ['#F97316', '#FBBF24', '#3B82F6', '#EC4899']
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 0.9, y: 0.7 },
            colors: ['#F97316', '#FBBF24', '#3B82F6', '#EC4899']
          });
        }, 120);
      } catch {
        // ignore
      }
    } else {
      setAnswerReaction('wrong');
      if (soundEnabled) {
        soundFx.playOhOhVoice();
      }
    }
  };

  const handleToggleFlag = () => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleAutoSubmit = () => {
    const result = calculateQuizResult(
      config.student,
      config,
      questions,
      userAnswers,
      elapsedTime
    );
    onFinishQuiz(result);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    handleAutoSubmit();
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (['1', 'a', 'A'].includes(e.key)) handleSelectOption(0);
      if (['2', 'b', 'B'].includes(e.key)) handleSelectOption(1);
      if (['3', 'c', 'C'].includes(e.key)) handleSelectOption(2);
      if (['4', 'd', 'D'].includes(e.key)) handleSelectOption(3);
      if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ, userAnswers]);

  const getDifficultyBadge = (diff: string) => {
    if (diff === 'nhan_biet') {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">Nhận biết</span>;
    }
    if (diff === 'thong_hieu') {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Thông hiểu</span>;
    }
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Vận dụng</span>;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8">
      
      {/* Top Status Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-blue-100 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        
        {/* Student tag & Mode */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
            {config.student.className || '6'}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>{config.student.fullName}</span>
              <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-800 rounded-md border border-blue-200 font-bold">
                Lớp {config.student.className}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {config.mode === 'exam' ? '⏱️ Đề kiểm tra tính giờ' : '📝 Luyện tập tương tác'} • <span className="font-bold text-orange-600">{questions.length} câu</span>
            </p>
          </div>
        </div>

        {/* Timer & Submit */}
        <div className="flex items-center gap-3 ml-auto">
          {config.mode === 'exam' ? (
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold border ${
              timeLeft < 180 
                ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse' 
                : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}>
              <Clock className="w-4 h-4 text-orange-500" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          ) : (
            <div className="text-xs text-slate-600 font-semibold px-3 py-1 bg-slate-100 rounded-xl">
              Thời gian: {formatTime(elapsedTime)}
            </div>
          )}

          <button
            id="btn-submit-quiz-top"
            type="button"
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Nộp bài ({answeredCount}/{questions.length})</span>
          </button>
        </div>

      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
          <span>Câu {currentIndex + 1} / {questions.length}</span>
          <span className="text-blue-700">Đã trả lời: {answeredCount} câu ({Math.round((answeredCount / questions.length) * 100)}%)</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Question Box */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-sm relative">
            
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black text-blue-900 bg-blue-100 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  Câu {currentIndex + 1}
                </span>
                {getDifficultyBadge(currentQ.difficulty)}
                <span className="text-xs text-slate-500 font-semibold">
                  {currentQ.lessonTitle}
                </span>
              </div>

              <button
                id="btn-flag-question"
                type="button"
                onClick={handleToggleFlag}
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-xl border transition-colors cursor-pointer ${
                  flaggedQuestions[currentQ.id]
                    ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title="Đánh dấu để xem lại sau"
              >
                <Flag className="w-3.5 h-3.5 text-amber-600" />
                <span>{flaggedQuestions[currentQ.id] ? 'Đã đánh dấu' : 'Đánh dấu'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                {currentQ.content}
              </h3>
              {currentQ.sourceDoc && (
                <p className="text-[11px] text-slate-400 mt-1 italic">
                  Nguồn tham chiếu: {currentQ.sourceDoc}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const letter = ['A', 'B', 'C', 'D'][idx];

                // Practice mode instant validation styles
                let optionStyle = 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 bg-white text-slate-800';
                
                if (selectedOption !== undefined && isSelected) {
                  if (idx === currentQ.correctAnswer) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm font-bold ring-2 ring-emerald-400';
                  } else {
                    optionStyle = 'border-rose-400 bg-rose-50 text-rose-900 shadow-sm font-bold ring-2 ring-rose-300';
                  }
                } else if (selectedOption !== undefined && idx === currentQ.correctAnswer) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/60 text-emerald-900 font-bold';
                }

                return (
                  <div
                    key={idx}
                    id={`option-${currentQ.id}-${idx}`}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${optionStyle}`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isSelected 
                        ? idx === currentQ.correctAnswer ? 'bg-emerald-600 text-white' : 'bg-rose-500 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-sm pt-0.5 leading-relaxed grow">
                      {option}
                    </span>
                    {selectedOption !== undefined && isSelected && (
                      <span className="shrink-0 mt-0.5">
                        {idx === currentQ.correctAnswer ? (
                          <Check className="w-5 h-5 text-emerald-600 animate-bounce" />
                        ) : (
                          <X className="w-5 h-5 text-rose-500 animate-pulse" />
                        )}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Live Visual Reaction Box (Bung hoa & Nhạc vỗ tay hoành tráng khi ĐÚNG / Mặt khóc & Nói "Ố ồ" khi SAI) */}
            {answerReaction === 'correct' && (
              <div 
                id="reaction-correct-box"
                className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 text-white shadow-xl flex items-center justify-between gap-3 animate-in zoom-in-95 duration-200 border border-amber-300/40"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl sm:text-4xl animate-bounce">
                    🌸👏
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-sm sm:text-base text-amber-200 uppercase tracking-wide">
                        CHÍNH XÁC! XUẤT SẮC LẮM! 🎉🌸
                      </h4>
                    </div>
                    <p className="text-xs text-blue-100 mt-0.5 font-medium">
                      Âm thanh chúc mừng hoành tráng và muôn hoa tươi thắm chúc mừng em!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (soundEnabled) soundFx.playApplause();
                      try {
                        confetti({
                          particleCount: 70,
                          spread: 80,
                          origin: { y: 0.6 },
                          colors: ['#3B82F6', '#F97316', '#F59E0B', '#EC4899', '#10B981']
                        });
                      } catch {
                        // ignore
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    title="Vỗ tay & bung hoa tiếp"
                  >
                    <span>🌸 Bung hoa tiếp</span>
                  </button>
                </div>
              </div>
            )}

            {answerReaction === 'wrong' && (
              <div 
                id="reaction-wrong-box"
                className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white shadow-xl flex items-center justify-between gap-3 animate-in zoom-in-95 duration-200 border border-rose-300/40"
              >
                <div className="flex items-center gap-3">
                  {/* Crying Face Visual ("Mặt khóc") */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="text-4xl sm:text-5xl animate-bounce filter drop-shadow-md">
                      😭
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs sm:text-sm text-rose-950 bg-white/90 px-2.5 py-0.5 rounded-lg shadow-xs uppercase tracking-tight">
                        Ố Ồ! 😭
                      </span>
                      <h4 className="font-black text-xs sm:text-sm text-amber-100 uppercase tracking-tight">
                        Tiếc quá, chưa chính xác rồi!
                      </h4>
                    </div>
                    <p className="text-xs text-rose-50 mt-1 font-medium leading-relaxed">
                      Đừng nản lòng nhé! Em hãy đọc gợi ý của Giáo Hà AI bên dưới để nhớ bài lâu hơn!
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundFx.playOhOhVoice();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white text-rose-700 hover:bg-rose-50 text-xs font-extrabold shadow-sm transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                  title="Nói 'Ố ồ' lại"
                >
                  <Volume2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Nói "Ố ồ" 🔊</span>
                </button>
              </div>
            )}

            {/* Practice Mode Tools: Hint & Explanation */}
            {config.mode === 'practice' && (
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  {currentQ.hint && (
                    <button
                      id="btn-show-hint"
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý từ Giáo Hà AI'}</span>
                    </button>
                  )}

                  <button
                    id="btn-show-explanation"
                    type="button"
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>{showExplanation ? 'Ẩn lời giải chi tiết' : 'Xem đáp án & Lời giải'}</span>
                  </button>
                </div>

                {/* Hint box */}
                {showHint && currentQ.hint && (
                  <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 leading-relaxed animate-in fade-in">
                    <span className="font-bold block mb-1 text-amber-900 flex items-center gap-1">
                      💡 Gợi ý tư duy nhanh:
                    </span>
                    {currentQ.hint}
                  </div>
                )}

                {/* Explanation box */}
                {showExplanation && (
                  <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-slate-800 leading-relaxed animate-in fade-in space-y-1.5">
                    <div className="font-bold text-blue-950 text-sm flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Đáp án đúng: {['A', 'B', 'C', 'D'][currentQ.correctAnswer]}. {currentQ.options[currentQ.correctAnswer]}
                    </div>
                    <p className="text-slate-700">
                      <span className="font-bold text-blue-900">Giải thích chi tiết:</span> {currentQ.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
              <button
                id="btn-prev-question"
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                    : 'bg-white text-slate-700 hover:bg-blue-50 border-slate-300'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Câu trước</span>
              </button>

              <div className="hidden sm:block text-xs text-slate-400 font-medium">
                Phím tắt: Bấm 1-4 hoặc A-D để chọn đáp án
              </div>

              {currentIndex < questions.length - 1 ? (
                <button
                  id="btn-next-question"
                  type="button"
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="inline-flex items-center gap-1 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors cursor-pointer"
                >
                  <span>Câu tiếp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="btn-submit-final"
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="inline-flex items-center gap-1 px-5 py-2 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Hoàn thành & Nộp bài</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Sidebar Question Palette */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span>Bảng câu hỏi</span>
              <span className="text-xs font-bold text-blue-700">
                {answeredCount}/{questions.length} đã làm
              </span>
            </h4>

            {/* Grid of question buttons */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {questions.map((q, idx) => {
                const isCurrent = currentIndex === idx;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isFlagged = flaggedQuestions[q.id];

                let btnColor = 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border-transparent';
                if (isCurrent) {
                  btnColor = 'ring-2 ring-blue-600 font-black bg-blue-100 text-blue-900 border-blue-500';
                } else if (isAnswered) {
                  btnColor = 'bg-blue-600 text-white font-bold';
                } else if (isFlagged) {
                  btnColor = 'bg-amber-100 text-amber-900 border-amber-400 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    id={`palette-btn-${idx + 1}`}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl text-xs flex items-center justify-center relative transition-all border cursor-pointer ${btnColor}`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-blue-600 shrink-0" />
                <span>Đã trả lời</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-300 shrink-0" />
                <span>Chưa trả lời</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-amber-100 border border-amber-400 shrink-0" />
                <span>Đã đánh dấu xem lại</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <button
                id="btn-cancel-quiz"
                type="button"
                onClick={onCancelQuiz}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                Hủy bài kiểm tra / Quay lại
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Confirmation Modal for Submit */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Xác nhận nộp bài kiểm tra?
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Học sinh: <span className="font-bold text-slate-800">{config.student.fullName}</span> (Lớp {config.student.className})
              <br />
              Đã hoàn thành: <span className="font-bold text-emerald-700">{answeredCount}/{questions.length} câu</span>.
              {answeredCount < questions.length && (
                <span className="block mt-1 text-amber-700 font-semibold">
                  ⚠️ Em còn {questions.length - answeredCount} câu chưa chọn đáp án!
                </span>
              )}
            </p>

            <div className="flex items-center gap-3">
              <button
                id="btn-modal-cancel"
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
              >
                Làm tiếp
              </button>
              <button
                id="btn-modal-confirm-submit"
                type="button"
                onClick={handleConfirmSubmit}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                Đồng ý nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
