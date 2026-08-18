import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  Clock, 
  RotateCcw, 
  Printer, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  Check, 
  X, 
  HelpCircle,
  BarChart3,
  Share2,
  ChevronDown,
  ChevronUp,
  FileText,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizResult, Question } from '../types';
import { soundFx } from '../utils/quizUtils';
import { Certificate } from './Certificate';

interface ResultScreenProps {
  result: QuizResult;
  soundEnabled: boolean;
  onRetake: () => void;
  onNewQuiz: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  soundEnabled,
  onRetake,
  onNewQuiz,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'wrong' | 'correct'>('all');
  const [expandedDetails, setExpandedDetails] = useState<Record<number, boolean>>({});
  const [showCertModal, setShowCertModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'certificate' | 'report'>('certificate');

  const accuracyPercent = Math.round((result.correctCount / result.totalCount) * 100);

  useEffect(() => {
    if (accuracyPercent >= 80) {
      if (soundEnabled) {
        soundFx.playFanfare();
      }
      try {
        // Triumphant multi-stage floral confetti for high achievers
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#3B82F6', '#F97316', '#F59E0B', '#10B981', '#EC4899', '#6366F1']
        });
        setTimeout(() => {
          confetti({
            particleCount: 60,
            angle: 60,
            spread: 60,
            origin: { x: 0.15, y: 0.6 },
            colors: ['#F97316', '#FBBF24', '#3B82F6']
          });
          confetti({
            particleCount: 60,
            angle: 120,
            spread: 60,
            origin: { x: 0.85, y: 0.6 },
            colors: ['#F97316', '#FBBF24', '#3B82F6']
          });
        }, 300);
      } catch {
        // ignore
      }
    }
  }, [accuracyPercent, soundEnabled]);

  const toggleExpand = (qId: number) => {
    setExpandedDetails(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    result.questions.forEach(q => { all[q.id] = true; });
    setExpandedDetails(all);
  };

  const collapseAll = () => {
    setExpandedDetails({});
  };

  const handlePrint = () => {
    window.print();
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins} phút ${s.toString().padStart(2, '0')} giây`;
  };

  const filteredQuestions = result.questions.filter(q => {
    const isCorrect = result.userAnswers[q.id] === q.correctAnswer;
    if (filterMode === 'wrong') return !isCorrect;
    if (filterMode === 'correct') return isCorrect;
    return true;
  });

  const wrongCount = result.totalCount - result.correctCount;

  // Exact grading classification as requested:
  // >= 90%: Xuất sắc
  // 80% - 90%: Giỏi
  // 50% - 80%: Hoàn thành tốt
  // <= 50%: Hoàn thành
  const getGradeTitle = (percent: number) => {
    if (percent >= 90) return 'XUẤT SẮC 🌟';
    if (percent >= 80) return 'GIỎI 🏆';
    if (percent >= 50) return 'HOÀN THÀNH TỐT 👍';
    return 'HOÀN THÀNH 📜';
  };

  const getGradeBadgeColor = (percent: number) => {
    if (percent >= 90) return 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950';
    if (percent >= 80) return 'bg-gradient-to-r from-orange-500 to-amber-500 text-white';
    if (percent >= 50) return 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white';
    return 'bg-gradient-to-r from-slate-600 to-slate-700 text-white';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10 print:p-0 print:max-w-none">
      
      {/* Top Action Bar (Hidden on print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 print:hidden">
        <button
          id="btn-new-quiz-top"
          type="button"
          onClick={onNewQuiz}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-blue-50 hover:text-blue-700 shadow-xs transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-blue-600" />
          <span>Làm bài ôn tập mới</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="btn-retake-quiz"
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm font-bold hover:bg-blue-100 shadow-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-blue-600" />
            <span>Luyện lại đề này</span>
          </button>

          <button
            id="btn-print-result"
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 text-white text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In Giấy Khen / Phiếu Điểm</span>
          </button>
        </div>
      </div>

      {/* Main View Tabs: Certificate 16:9 OR Detailed Report Card */}
      <div className="flex items-center justify-center gap-3 mb-6 print:hidden">
        <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab('certificate')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'certificate'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:text-blue-700'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Giấy Khen Danh Dự (16:9)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'report'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                : 'text-slate-600 hover:text-orange-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Phiếu Báo Điểm & Nhận Xét</span>
          </button>
        </div>
      </div>

      {/* 1. Official 16:9 Certificate Component */}
      {(activeTab === 'certificate' || true) && (
        <div className={`mb-10 ${activeTab !== 'certificate' ? 'hidden print:block' : 'block'}`}>
          <Certificate result={result} />
        </div>
      )}

      {/* 2. Detailed Report Card */}
      <div className={`bg-white rounded-3xl p-6 sm:p-10 border border-blue-100 shadow-xl mb-8 print:shadow-none print:border-none print:p-2 ${
        activeTab === 'report' ? 'block' : 'hidden print:block'
      }`}>
        
        {/* School / Author Header */}
        <div className="text-center pb-6 border-b border-slate-100">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200 mb-2">
            <Award className="w-4 h-4 text-orange-600" /> BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 tracking-tight">
            PHIẾU BÁO ĐIỂM KHOA HỌC TỰ NHIÊN 6
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Hệ thống chấm điểm tự động & Nhận xét của Trợ lý AI <span className="font-bold text-blue-700">Giáo Hà AI</span>
          </p>
        </div>

        {/* Student Bio & Primary Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-slate-100">
          
          {/* Bio */}
          <div className="md:col-span-2 space-y-2.5 justify-center flex flex-col">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="font-semibold text-slate-500 w-28 shrink-0">Họ và tên:</span>
              <span className="font-extrabold text-slate-900 text-base">{result.student.fullName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="font-semibold text-slate-500 w-28 shrink-0">Lớp:</span>
              <span className="font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200 text-xs">
                {result.student.className}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="font-semibold text-slate-500 w-28 shrink-0">Chế độ:</span>
              <span className="font-medium text-slate-800">
                {result.config.mode === 'exam' ? 'Đề kiểm tra tính giờ' : 'Luyện tập tương tác'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <span className="font-semibold text-slate-500 w-28 shrink-0">Thời gian nộp:</span>
              <span className="text-slate-600 text-xs">{result.completedAt}</span>
            </div>
          </div>

          {/* Big Score Box */}
          <div className="flex flex-col items-center justify-center p-5 rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50/60 to-orange-50/60 border border-blue-200 text-center shadow-xs">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
              Điểm số bài thi
            </span>
            <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-700 via-indigo-800 to-orange-600 bg-clip-text text-transparent mb-1.5">
              {result.score.toFixed(1)}
              <span className="text-xl text-slate-400 font-bold">/10</span>
            </div>
            <span className={`px-4 py-1 rounded-full text-xs font-black shadow-xs ${getGradeBadgeColor(accuracyPercent)}`}>
              {getGradeTitle(accuracyPercent)}
            </span>
          </div>

        </div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-100 text-center">
          <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100">
            <span className="text-[11px] font-semibold text-slate-500 block">Số câu đúng</span>
            <span className="text-lg sm:text-xl font-black text-blue-700">
              {result.correctCount} / {result.totalCount}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100">
            <span className="text-[11px] font-semibold text-slate-500 block">Số câu chưa đúng</span>
            <span className="text-lg sm:text-xl font-black text-rose-600">
              {wrongCount} câu
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-orange-50/50 border border-orange-100">
            <span className="text-[11px] font-semibold text-slate-500 block">Tỉ lệ chính xác</span>
            <span className="text-lg sm:text-xl font-black text-orange-600">
              {accuracyPercent}%
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-500 block">Thời gian làm bài</span>
            <span className="text-sm sm:text-base font-bold text-slate-800">
              {formatTime(result.timeSpentSeconds)}
            </span>
          </div>
        </div>

        {/* AI Tutor Feedback Box */}
        <div className="py-6 border-b border-slate-100">
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50/60 to-white rounded-2xl p-5 sm:p-6 border border-blue-200 relative">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-blue-950">
                Nhận xét & Lời khuyên chi tiết từ Giáo Hà AI
              </h4>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
              {result.aiFeedback}
            </div>
          </div>
        </div>

        {/* Breakdown by Cognitive Level */}
        <div className="py-6">
          <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            Phân tích chi tiết theo 3 mức độ nhận thức
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Nhận biết */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
              <div className="flex items-center justify-between text-xs font-bold text-blue-900 mb-1">
                <span>Nhận biết</span>
                <span>
                  {result.statsByDifficulty.nhan_biet.correct}/{result.statsByDifficulty.nhan_biet.total}
                </span>
              </div>
              <p className="text-[11px] text-blue-700 mb-2">Ghi nhớ định nghĩa & khái niệm SGK</p>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ 
                    width: `${result.statsByDifficulty.nhan_biet.total > 0 
                      ? Math.round((result.statsByDifficulty.nhan_biet.correct / result.statsByDifficulty.nhan_biet.total) * 100) 
                      : 0}%` 
                  }}
                />
              </div>
            </div>

            {/* Thông hiểu */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
                <span>Thông hiểu</span>
                <span>
                  {result.statsByDifficulty.thong_hieu.correct}/{result.statsByDifficulty.thong_hieu.total}
                </span>
              </div>
              <p className="text-[11px] text-amber-700 mb-2">Giải thích bản chất & so sánh hiện tượng</p>
              <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-600 rounded-full transition-all"
                  style={{ 
                    width: `${result.statsByDifficulty.thong_hieu.total > 0 
                      ? Math.round((result.statsByDifficulty.thong_hieu.correct / result.statsByDifficulty.thong_hieu.total) * 100) 
                      : 0}%` 
                  }}
                />
              </div>
            </div>

            {/* Vận dụng */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200">
              <div className="flex items-center justify-between text-xs font-bold text-rose-900 mb-1">
                <span>Vận dụng</span>
                <span>
                  {result.statsByDifficulty.van_dung.correct}/{result.statsByDifficulty.van_dung.total}
                </span>
              </div>
              <p className="text-[11px] text-rose-700 mb-2">Tính toán & liên hệ giải quyết thực tế</p>
              <div className="w-full h-2 bg-rose-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-600 rounded-full transition-all"
                  style={{ 
                    width: `${result.statsByDifficulty.van_dung.total > 0 
                      ? Math.round((result.statsByDifficulty.van_dung.correct / result.statsByDifficulty.van_dung.total) * 100) 
                      : 0}%` 
                  }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Question Review Section */}
      <div className="space-y-4 print:mt-6">
        
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-700" />
              Chi tiết câu hỏi & Lời giải chuẩn SGK
            </h3>
            <p className="text-xs text-slate-500">
              Xem lại từng câu để hiểu rõ lý do chọn và phương pháp giải đúng
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            {/* Filter Tabs */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
              <button
                id="filter-all-questions"
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterMode === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tất cả ({result.questions.length})
              </button>
              <button
                id="filter-wrong-questions"
                type="button"
                onClick={() => setFilterMode('wrong')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterMode === 'wrong' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-600 hover:text-rose-700'
                }`}
              >
                Chưa đúng ({wrongCount})
              </button>
              <button
                id="filter-correct-questions"
                type="button"
                onClick={() => setFilterMode('correct')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterMode === 'correct' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-blue-700'
                }`}
              >
                Làm đúng ({result.correctCount})
              </button>
            </div>

            <button
              id="btn-expand-all"
              type="button"
              onClick={expandAll}
              className="text-xs text-blue-700 hover:text-blue-800 font-bold px-2.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 cursor-pointer"
            >
              Mở tất cả
            </button>
            <button
              id="btn-collapse-all"
              type="button"
              onClick={collapseAll}
              className="text-xs text-slate-600 hover:text-slate-800 font-semibold px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 cursor-pointer"
            >
              Thu gọn
            </button>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const userAnswer = result.userAnswers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            const isAnswered = userAnswer !== undefined;
            const isExpanded = expandedDetails[q.id] ?? true; // expanded by default

            return (
              <div
                key={q.id}
                id={`review-card-${q.id}`}
                className={`rounded-2xl border bg-white p-5 sm:p-6 transition-all ${
                  isCorrect 
                    ? 'border-blue-200 shadow-xs' 
                    : 'border-rose-200 bg-rose-50/10 shadow-xs'
                }`}
              >
                
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                      isCorrect ? 'bg-blue-100 text-blue-900' : 'bg-rose-100 text-rose-900'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isCorrect ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {isCorrect ? '✓ Đúng' : isAnswered ? '✗ Chưa đúng' : '⚠️ Bỏ trống'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {q.lessonTitle}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleExpand(q.id)}
                    className="text-slate-400 hover:text-slate-600 p-1 print:hidden cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                    {q.content}
                  </h4>
                  {q.sourceDoc && (
                    <span className="text-[11px] text-slate-400 mt-1 block italic">
                      Nguồn: {q.sourceDoc}
                    </span>
                  )}
                </div>

                {/* Options List */}
                {isExpanded && (
                  <div className="space-y-2 mb-4">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = userAnswer === optIdx;
                      const isCorrectChoice = optIdx === q.correctAnswer;
                      const letter = ['A', 'B', 'C', 'D'][optIdx];

                      let optStyle = 'border-slate-200 bg-slate-50/50 text-slate-700';

                      if (isCorrectChoice) {
                        optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                      } else if (isUserChoice && !isCorrect) {
                        optStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${optStyle}`}
                        >
                          <span className={`w-5 h-5 rounded-md text-xs flex items-center justify-center font-bold shrink-0 ${
                            isCorrectChoice 
                              ? 'bg-emerald-600 text-white' 
                              : isUserChoice && !isCorrect 
                              ? 'bg-rose-500 text-white' 
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {letter}
                          </span>
                          <span className="grow pt-0.5">{opt}</span>
                          {isCorrectChoice && (
                            <span className="text-xs font-bold text-emerald-700 shrink-0 flex items-center gap-1">
                              <Check className="w-4 h-4 text-emerald-600" /> Đáp án đúng
                            </span>
                          )}
                          {isUserChoice && !isCorrect && (
                            <span className="text-xs font-bold text-rose-600 shrink-0 flex items-center gap-1">
                              <X className="w-4 h-4" /> Em đã chọn
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Explanation Box */}
                {isExpanded && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1">
                    <div className="font-bold text-blue-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Lời giải chi tiết từ Giáo Hà AI:
                    </div>
                    <p className="leading-relaxed text-slate-700 pl-5">
                      {q.explanation}
                    </p>
                    {q.hint && (
                      <div className="pt-1.5 text-slate-500 pl-5 text-[11px]">
                        <span className="font-semibold text-slate-600">💡 Mẹo ghi nhớ:</span> {q.hint}
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Sticky CTA (Hidden on print) */}
      <div className="mt-8 flex items-center justify-center gap-4 print:hidden">
        <button
          id="btn-retake-quiz-bottom"
          type="button"
          onClick={onRetake}
          className="px-6 py-3 rounded-2xl bg-white border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
        >
          Làm lại bài thi này
        </button>

        <button
          id="btn-new-quiz-bottom"
          type="button"
          onClick={onNewQuiz}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-black text-sm shadow-lg transition-all cursor-pointer"
        >
          Tạo đề ôn tập mới
        </button>
      </div>

    </div>
  );
};
