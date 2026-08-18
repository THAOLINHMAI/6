import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SetupScreen } from './components/SetupScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { TheoryModal } from './components/TheoryModal';
import { GlossaryModal } from './components/GlossaryModal';
import { AITutorChat } from './components/AITutorChat';
import { Question, QuizConfig, QuizResult } from './types';
import { filterAndSampleQuestions } from './utils/quizUtils';
import { MessageSquare, Sparkles, BookOpen, Search, HelpCircle, Heart } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<'setup' | 'quiz' | 'result'>('setup');
  const [currentConfig, setCurrentConfig] = useState<QuizConfig | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);

  // Modals
  const [showTheoryModal, setShowTheoryModal] = useState<boolean>(false);
  const [showGlossaryModal, setShowGlossaryModal] = useState<boolean>(false);
  const [showAIChatModal, setShowAIChatModal] = useState<boolean>(false);

  // Sound settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('khtn6_sound_enabled');
    return saved !== null ? saved === 'true' : true;
  });

  const handleToggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem('khtn6_sound_enabled', String(next));
      return next;
    });
  };

  const handleStartQuiz = (config: QuizConfig) => {
    setCurrentConfig(config);
    const sampled = filterAndSampleQuestions(config);
    setCurrentQuestions(sampled);
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishQuiz = (result: QuizResult) => {
    setCurrentResult(result);
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeQuiz = () => {
    if (currentConfig && currentQuestions.length > 0) {
      setScreen('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNewQuiz = () => {
    setScreen('setup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Navigation Header */}
      <Header
        onOpenTheory={() => setShowTheoryModal(true)}
        onOpenGlossary={() => setShowGlossaryModal(true)}
        onResetQuiz={handleNewQuiz}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        inQuiz={screen === 'quiz' || screen === 'result'}
      />

      {/* Main Screen Container */}
      <main className="flex-1">
        {screen === 'setup' && (
          <SetupScreen
            initialConfig={currentConfig || undefined}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {screen === 'quiz' && currentConfig && (
          <QuizScreen
            config={currentConfig}
            questions={currentQuestions}
            soundEnabled={soundEnabled}
            onFinishQuiz={handleFinishQuiz}
            onCancelQuiz={handleNewQuiz}
          />
        )}

        {screen === 'result' && currentResult && (
          <ResultScreen
            result={currentResult}
            soundEnabled={soundEnabled}
            onRetake={handleRetakeQuiz}
            onNewQuiz={handleNewQuiz}
          />
        )}
      </main>

      {/* Floating AI Tutor Button */}
      <div className="fixed bottom-6 right-6 z-30 print:hidden">
        <button
          id="btn-floating-ai-tutor"
          type="button"
          onClick={() => setShowAIChatModal(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-700/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-400/30"
          title="Hỏi đáp thắc mắc cùng Giáo Hà AI"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
          </div>
          <span>Hỏi Giáo Hà AI</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white animate-ping" />
        </button>
      </div>

      {/* Modals */}
      <TheoryModal
        isOpen={showTheoryModal}
        onClose={() => setShowTheoryModal(false)}
      />

      <GlossaryModal
        isOpen={showGlossaryModal}
        onClose={() => setShowGlossaryModal(false)}
      />

      <AITutorChat
        isOpen={showAIChatModal}
        onClose={() => setShowAIChatModal(false)}
      />

      {/* Footer (Hidden on print) */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700">
            GIA SƯ KHOA HỌC TỰ NHIÊN 6 • BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
          </p>
          <p className="text-slate-500">
            Biên soạn & Bản quyền nội dung: <span className="text-emerald-700 font-bold">GIÁO HÀ AI</span> • Chuẩn kiến thức kỹ năng SGK & SBT KHTN 6 (NXB Giáo dục Việt Nam)
          </p>
        </div>
      </footer>

    </div>
  );
}
