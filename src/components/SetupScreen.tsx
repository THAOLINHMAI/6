import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Layers, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Sliders, 
  Sparkles,
  BookOpen,
  Filter,
  Check,
  Flame
} from 'lucide-react';
import { DifficultyFilter, QuizConfig, QuizMode, SubjectTopic } from '../types';
import { CHAPTERS_DATA } from '../data/chaptersData';

interface SetupScreenProps {
  initialConfig?: Partial<QuizConfig>;
  onStartQuiz: (config: QuizConfig) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  initialConfig,
  onStartQuiz,
}) => {
  const [fullName, setFullName] = useState<string>(() => {
    return initialConfig?.student?.fullName || localStorage.getItem('khtn6_student_name') || '';
  });
  const [className, setClassName] = useState<string>(() => {
    return initialConfig?.student?.className || localStorage.getItem('khtn6_student_class') || '6A1';
  });
  
  const [questionCount, setQuestionCount] = useState<number>(initialConfig?.questionCount || 15);
  const [difficulty, setDifficulty] = useState<DifficultyFilter>(initialConfig?.difficulty || 'all');
  const [mode, setMode] = useState<QuizMode>(initialConfig?.mode || 'exam');
  const [selectedChapterIds, setSelectedChapterIds] = useState<number[]>(
    initialConfig?.selectedChapterIds || CHAPTERS_DATA.map(c => c.id)
  );
  const [selectedLessonIds, setSelectedLessonIds] = useState<number[]>(
    initialConfig?.selectedLessonIds || []
  );
  const [expandedChapterId, setExpandedChapterId] = useState<number | null>(null);

  const handleSelectPreset = (preset: 'all' | 'hk1' | 'hk2' | 'vat_li' | 'hoa_hoc' | 'sinh_hoc' | 'thien_van') => {
    setSelectedLessonIds([]); // Reset specific lessons
    if (preset === 'all') {
      setSelectedChapterIds(CHAPTERS_DATA.map(c => c.id));
    } else if (preset === 'hk1') {
      setSelectedChapterIds([1, 2, 3, 4, 5]);
    } else if (preset === 'hk2') {
      setSelectedChapterIds([6, 7, 8, 9, 10]);
    } else {
      const topicChapters = CHAPTERS_DATA.filter(c => c.topic === (preset as SubjectTopic)).map(c => c.id);
      setSelectedChapterIds(topicChapters);
    }
  };

  const handleToggleChapter = (chapterId: number) => {
    setSelectedLessonIds([]);
    if (selectedChapterIds.includes(chapterId)) {
      if (selectedChapterIds.length > 1) {
        setSelectedChapterIds(selectedChapterIds.filter(id => id !== chapterId));
      }
    } else {
      setSelectedChapterIds([...selectedChapterIds, chapterId]);
    }
  };

  const handleToggleLesson = (lessonId: number) => {
    if (selectedLessonIds.includes(lessonId)) {
      setSelectedLessonIds(selectedLessonIds.filter(id => id !== lessonId));
    } else {
      setSelectedLessonIds([...selectedLessonIds, lessonId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim() || 'Học sinh';
    const cleanClass = className.trim() || 'Lớp 6';

    localStorage.setItem('khtn6_student_name', cleanName);
    localStorage.setItem('khtn6_student_class', cleanClass);

    onStartQuiz({
      student: {
        fullName: cleanName,
        className: cleanClass,
      },
      selectedChapterIds,
      selectedLessonIds,
      questionCount,
      difficulty,
      mode,
      timeLimitMinutes: mode === 'exam' ? Math.max(Math.round(questionCount * 1.5), 5) : undefined,
    });
  };

  const difficultyOptions: { value: DifficultyFilter; label: string; desc: string; color: string }[] = [
    { 
      value: 'all', 
      label: 'Tổng hợp 3 mức độ', 
      desc: 'Phối hợp chuẩn ma trận kiểm tra (Nhận biết, Thông hiểu, Vận dụng)', 
      color: 'from-blue-600 to-indigo-700' 
    },
    { 
      value: 'nhan_biet', 
      label: 'Nhận biết', 
      desc: 'Kiểm tra định nghĩa, đơn vị đo, khái niệm cốt lõi SGK', 
      color: 'from-sky-500 to-blue-600' 
    },
    { 
      value: 'thong_hieu', 
      label: 'Thông hiểu', 
      desc: 'Giải thích hiện tượng, so sánh, phân biệt và mối quan hệ bản chất', 
      color: 'from-amber-500 to-orange-600' 
    },
    { 
      value: 'van_dung', 
      label: 'Vận dụng', 
      desc: 'Tính toán thực tế, xử lý thí nghiệm và ứng dụng cuộc sống', 
      color: 'from-orange-600 to-rose-600' 
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      
      {/* Intro Banner */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden border border-blue-800">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-orange-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 -translate-x-8 translate-y-8 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-200 border border-orange-400/30 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-300" /> Hệ thống Ôn tập & Kiểm tra Chuẩn SGK Kết Nối Tri Thức
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Gia Sư KHTN Lớp 6
          </h2>
          <p className="text-blue-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-normal">
            Học thông minh, hiểu bản chất với bộ câu hỏi chuẩn hóa từ SGK & SBT 
            <span className="font-bold text-white"> "Kết nối tri thức với cuộc sống"</span>. 
            Cùng trợ lý AI <span className="font-extrabold text-orange-300">Giáo Hà AI</span> chinh phục điểm 9, 10 và nhận Giấy Khen Danh Dự!
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Student Information */}
        <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              <User className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              1. Thông tin học sinh
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="student-name-input" className="block text-sm font-semibold text-slate-700 mb-1">
                Họ và tên học sinh <span className="text-orange-600 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  id="student-name-input"
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Minh Khang"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            <div>
              <label htmlFor="student-class-input" className="block text-sm font-semibold text-slate-700 mb-1">
                Lớp học <span className="text-orange-600 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  id="student-class-input"
                  type="text"
                  required
                  placeholder="Ví dụ: 6A2"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Question Count & Difficulty */}
        <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 font-bold">
              <Sliders className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              2. Số lượng câu hỏi & Mức độ nhận thức
            </h3>
          </div>

          {/* Question Count Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="question-count-slider" className="text-sm font-semibold text-slate-700">
                Số lượng câu hỏi: <span className="text-blue-700 font-extrabold text-base">{questionCount} câu</span>
              </label>
              <span className="text-xs text-orange-600 font-bold">(Tối đa 30 câu)</span>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <input
                id="question-count-slider"
                type="range"
                min={5}
                max={30}
                step={1}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            {/* Quick Count Badges */}
            <div className="flex flex-wrap gap-2">
              {[5, 10, 15, 20, 25, 30].map(cnt => (
                <button
                  key={cnt}
                  id={`btn-count-${cnt}`}
                  type="button"
                  onClick={() => setQuestionCount(cnt)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    questionCount === cnt
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {cnt} câu
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Level Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Mức độ yêu cầu:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {difficultyOptions.map(opt => {
                const isSelected = difficulty === opt.value;
                return (
                  <div
                    key={opt.value}
                    id={`diff-option-${opt.value}`}
                    onClick={() => setDifficulty(opt.value)}
                    className={`cursor-pointer rounded-2xl p-4 border-2 transition-all relative ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-lg text-white bg-gradient-to-r ${opt.color} mb-1.5 shadow-xs`}>
                          {opt.label}
                        </span>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">
                          {opt.desc}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 3: Select Chapters & Lessons */}
        <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  3. Chọn bài học / Chương ôn tập
                </h3>
                <p className="text-xs text-slate-500">
                  Đã chọn: <span className="font-bold text-blue-700">{selectedChapterIds.length} chương</span>
                  {selectedLessonIds.length > 0 && ` (${selectedLessonIds.length} bài cụ thể)`}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Select Presets */}
          <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-slate-100">
            <span className="text-xs font-medium text-slate-500 self-center mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-orange-500" /> Chọn nhanh:
            </span>
            <button
              id="preset-all"
              type="button"
              onClick={() => handleSelectPreset('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                selectedChapterIds.length === 10 && selectedLessonIds.length === 0
                  ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              Toàn bộ 10 chương (Cả năm)
            </button>
            <button
              id="preset-hk1"
              type="button"
              onClick={() => handleSelectPreset('hk1')}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-white text-slate-700 border border-slate-300 hover:bg-blue-50 cursor-pointer"
            >
              Học kì 1 (Chương 1 - 5)
            </button>
            <button
              id="preset-hk2"
              type="button"
              onClick={() => handleSelectPreset('hk2')}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-white text-slate-700 border border-slate-300 hover:bg-blue-50 cursor-pointer"
            >
              Học kì 2 (Chương 6 - 10)
            </button>
            <button
              id="preset-vatli"
              type="button"
              onClick={() => handleSelectPreset('vat_li')}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 cursor-pointer"
            >
              Vật lí (C1, C8, C9)
            </button>
            <button
              id="preset-hoahoc"
              type="button"
              onClick={() => handleSelectPreset('hoa_hoc')}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100 cursor-pointer"
            >
              Hóa học (C2, C3, C4)
            </button>
            <button
              id="preset-sinhhoc"
              type="button"
              onClick={() => handleSelectPreset('sinh_hoc')}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 cursor-pointer"
            >
              Sinh học (C5, C6, C7)
            </button>
            <button
              id="preset-thienvan"
              type="button"
              onClick={() => handleSelectPreset('thien_van')}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 cursor-pointer"
            >
              Thiên văn (C10)
            </button>
          </div>

          {/* Chapter Accordion List */}
          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {CHAPTERS_DATA.map((chapter) => {
              const isChecked = selectedChapterIds.includes(chapter.id);
              const isExpanded = expandedChapterId === chapter.id;

              return (
                <div 
                  key={chapter.id}
                  className={`border rounded-2xl transition-all ${
                    isChecked ? 'border-blue-300 bg-blue-50/30 shadow-xs' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="p-3 sm:p-3.5 flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer select-none grow">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleChapter(chapter.id)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          {chapter.title}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {chapter.lessons.length} bài học (Trang {chapter.lessons[0].pageSGK} - {chapter.lessons[chapter.lessons.length - 1].pageSGK})
                        </span>
                      </div>
                    </label>

                    <button
                      type="button"
                      onClick={() => setExpandedChapterId(isExpanded ? null : chapter.id)}
                      className="text-xs text-blue-700 hover:text-blue-900 font-bold px-2.5 py-1 rounded-lg hover:bg-blue-100/70 cursor-pointer"
                    >
                      {isExpanded ? 'Thu gọn' : 'Xem các bài'}
                    </button>
                  </div>

                  {/* Expanded Lessons */}
                  {isExpanded && (
                    <div className="px-4 pb-3 pt-1 border-t border-slate-100 bg-slate-50/60 rounded-b-2xl space-y-1.5">
                      <p className="text-[11px] text-slate-500 font-medium mb-1">
                        Chọn các bài học cần trọng tâm (hoặc để mặc định toàn chương):
                      </p>
                      {chapter.lessons.map(lesson => {
                        const isLessonSelected = selectedLessonIds.includes(lesson.id);
                        return (
                          <label
                            key={lesson.id}
                            className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer py-1"
                          >
                            <input
                              type="checkbox"
                              checked={isLessonSelected}
                              onChange={() => handleToggleLesson(lesson.id)}
                              className="w-3.5 h-3.5 rounded text-orange-500 focus:ring-orange-400 border-slate-300"
                            />
                            <span>{lesson.title}</span>
                            <span className="text-[10px] text-slate-400 ml-auto">Trang {lesson.pageSGK}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Mode Selection */}
        <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              4. Chọn chế độ làm bài
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              id="mode-exam"
              onClick={() => setMode('exam')}
              className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                mode === 'exam'
                  ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <Clock className="w-4 h-4 text-blue-600" />
                Kiểm tra tính giờ (Đề thi thử)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đồng hồ đếm ngược ({Math.max(Math.round(questionCount * 1.5), 5)} phút), chấm điểm thang 10, cấp Phiếu Báo Điểm & Giấy Khen 16:9 của Giáo Hà AI.
              </p>
            </div>

            <div
              id="mode-practice"
              onClick={() => setMode('practice')}
              className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                mode === 'practice'
                  ? 'border-orange-500 bg-orange-50/50 shadow-sm'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                <CheckCircle2 className="w-4 h-4 text-orange-600" />
                Luyện tập tương tác (Tự do)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Không giới hạn thời gian. Có thể xem gợi ý và đáp án giải thích chi tiết ngay sau mỗi câu để nắm chắc kiến thức.
              </p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-2">
          <button
            id="btn-start-quiz"
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-black text-base sm:text-lg shadow-xl shadow-blue-600/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200 animate-bounce" />
            BẮT ĐẦU ÔN TẬP VÀ LÀM BÀI NGAY
          </button>
        </div>

      </form>
    </div>
  );
};
