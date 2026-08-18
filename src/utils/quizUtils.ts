import { DifficultyFilter, Question, QuizConfig, QuizResult, StudentInfo, SubjectTopic } from '../types';
import { QUESTIONS_DATA } from '../data/questionsData';

export function filterAndSampleQuestions(config: QuizConfig): Question[] {
  const targetCount = Math.min(Math.max(config.questionCount || 5, 1), 30);
  const selectedChapterIds = config.selectedChapterIds && config.selectedChapterIds.length > 0
    ? config.selectedChapterIds
    : [];
  const selectedLessonIds = config.selectedLessonIds && config.selectedLessonIds.length > 0
    ? config.selectedLessonIds
    : [];
  const targetDifficulty = config.difficulty;

  const shuffleArray = <T>(arr: T[]): T[] => {
    const res = [...arr];
    for (let i = res.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [res[i], res[j]] = [res[j], res[i]];
    }
    return res;
  };

  const chosenMap = new Map<number, Question>();

  const addQuestions = (questions: Question[]) => {
    const shuffledSubset = shuffleArray(questions);
    for (const q of shuffledSubset) {
      if (chosenMap.size >= targetCount) break;
      if (!chosenMap.has(q.id)) {
        chosenMap.set(q.id, q);
      }
    }
  };

  // Tier 1: Exact matches (Chapter + Lesson + Difficulty)
  let tier1 = [...QUESTIONS_DATA];
  if (selectedChapterIds.length > 0) {
    tier1 = tier1.filter(q => selectedChapterIds.includes(q.chapterId));
  }
  if (selectedLessonIds.length > 0) {
    tier1 = tier1.filter(q => selectedLessonIds.includes(q.lessonId));
  }
  if (targetDifficulty !== 'all') {
    tier1 = tier1.filter(q => q.difficulty === targetDifficulty);
  }
  addQuestions(tier1);

  // Tier 2: If still not enough, loosen difficulty inside chosen lesson/chapters
  if (chosenMap.size < targetCount && targetDifficulty !== 'all') {
    let tier2 = [...QUESTIONS_DATA];
    if (selectedChapterIds.length > 0) {
      tier2 = tier2.filter(q => selectedChapterIds.includes(q.chapterId));
    }
    if (selectedLessonIds.length > 0) {
      tier2 = tier2.filter(q => selectedLessonIds.includes(q.lessonId));
    }
    addQuestions(tier2);
  }

  // Tier 3: If still not enough and lessons were restricted, loosen lesson filter to selected chapter(s)
  if (chosenMap.size < targetCount && selectedLessonIds.length > 0) {
    let tier3 = [...QUESTIONS_DATA];
    if (selectedChapterIds.length > 0) {
      tier3 = tier3.filter(q => selectedChapterIds.includes(q.chapterId));
    }
    if (targetDifficulty !== 'all') {
      tier3 = tier3.filter(q => q.difficulty === targetDifficulty);
    }
    addQuestions(tier3);

    // Tier 3b: Any difficulty in selected chapters
    if (chosenMap.size < targetCount) {
      let tier3b = [...QUESTIONS_DATA];
      if (selectedChapterIds.length > 0) {
        tier3b = tier3b.filter(q => selectedChapterIds.includes(q.chapterId));
      }
      addQuestions(tier3b);
    }
  }

  // Tier 4: If still not enough, loosen chapter filter to same topics or matching difficulty
  if (chosenMap.size < targetCount && targetDifficulty !== 'all') {
    const tier4 = QUESTIONS_DATA.filter(q => q.difficulty === targetDifficulty);
    addQuestions(tier4);
  }

  // Tier 5: Absolute fallback from entire question bank
  if (chosenMap.size < targetCount) {
    addQuestions(QUESTIONS_DATA);
  }

  // Final shuffle of selected questions
  const finalQuestions = Array.from(chosenMap.values());
  return shuffleArray(finalQuestions).slice(0, targetCount);
}

export function calculateQuizResult(
  student: StudentInfo,
  config: QuizConfig,
  questions: Question[],
  userAnswers: Record<number, number>,
  timeSpentSeconds: number
): QuizResult {
  let correctCount = 0;
  const statsByDifficulty = {
    nhan_biet: { total: 0, correct: 0 },
    thong_hieu: { total: 0, correct: 0 },
    van_dung: { total: 0, correct: 0 },
  };

  const statsByTopic: Record<SubjectTopic, { total: number; correct: number }> = {
    vat_li: { total: 0, correct: 0 },
    hoa_hoc: { total: 0, correct: 0 },
    sinh_hoc: { total: 0, correct: 0 },
    thien_van: { total: 0, correct: 0 },
    tong_hop: { total: 0, correct: 0 },
  };

  questions.forEach(q => {
    const isCorrect = userAnswers[q.id] === q.correctAnswer;
    if (isCorrect) correctCount++;

    // Stats by diff
    if (statsByDifficulty[q.difficulty]) {
      statsByDifficulty[q.difficulty].total++;
      if (isCorrect) statsByDifficulty[q.difficulty].correct++;
    }

    // Stats by topic
    if (statsByTopic[q.topic]) {
      statsByTopic[q.topic].total++;
      if (isCorrect) statsByTopic[q.topic].correct++;
    }
  });

  const totalCount = questions.length;
  const score = totalCount > 0 ? Number(((correctCount / totalCount) * 10).toFixed(1)) : 0;

  // Generate personalized AI Tutor feedback
  const feedback = generateAITutorFeedback(student, score, correctCount, totalCount, statsByDifficulty, statsByTopic);

  const completedAt = new Date().toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const resultId = Math.random().toString(36).substring(2, 10).toUpperCase();

  return {
    id: resultId,
    student,
    config,
    questions,
    userAnswers,
    score,
    correctCount,
    totalCount,
    timeSpentSeconds,
    completedAt,
    statsByDifficulty,
    statsByTopic,
    aiFeedback: feedback,
  };
}

function generateAITutorFeedback(
  student: StudentInfo,
  score: number,
  correct: number,
  total: number,
  statsDiff: { nhan_biet: { total: number; correct: number }; thong_hieu: { total: number; correct: number }; van_dung: { total: number; correct: number } },
  statsTopic: Record<SubjectTopic, { total: number; correct: number }>
): string {
  const name = student.fullName.trim() || 'Em';
  const className = student.className.trim() ? `lớp ${student.className.trim()}` : '';

  let header = '';
  if (score >= 9.0) {
    header = `🌟 Xuất sắc lắm ${name}! Thầy Giáo Hà AI rất tự hào về kết quả tuyệt vời này của em!`;
  } else if (score >= 8.0) {
    header = `👏 Giỏi lắm ${name}! Em nắm rất vững kiến thức Khoa học tự nhiên 6!`;
  } else if (score >= 6.5) {
    header = `👍 Khá tốt ${name}! Em đã hoàn thành tốt bài kiểm tra, chỉ cần chú ý thêm một vài chi tiết nhỏ.`;
  } else if (score >= 5.0) {
    header = `💪 Cố gắng lên nhé ${name}! Em đã đạt điểm trung bình, hãy xem lại phần giải thích chi tiết để tiến bộ hơn.`;
  } else {
    header = `📖 Đừng nản lòng ${name}! Khoa học tự nhiên rất thú vị, hãy đọc lại phần tóm tắt lý thuyết và làm lại đề nhé!`;
  }

  // Analyze breakdown
  const diffComments: string[] = [];
  if (statsDiff.nhan_biet.total > 0) {
    const rate = Math.round((statsDiff.nhan_biet.correct / statsDiff.nhan_biet.total) * 100);
    diffComments.push(`• Mức độ Nhận biết: Đúng ${statsDiff.nhan_biet.correct}/${statsDiff.nhan_biet.total} câu (${rate}%)`);
  }
  if (statsDiff.thong_hieu.total > 0) {
    const rate = Math.round((statsDiff.thong_hieu.correct / statsDiff.thong_hieu.total) * 100);
    diffComments.push(`• Mức độ Thông hiểu: Đúng ${statsDiff.thong_hieu.correct}/${statsDiff.thong_hieu.total} câu (${rate}%)`);
  }
  if (statsDiff.van_dung.total > 0) {
    const rate = Math.round((statsDiff.van_dung.correct / statsDiff.van_dung.total) * 100);
    diffComments.push(`• Mức độ Vận dụng: Đúng ${statsDiff.van_dung.correct}/${statsDiff.van_dung.total} câu (${rate}%)`);
  }

  // Find strongest & weakest topics
  const topicsActive = Object.entries(statsTopic)
    .filter(([_, data]) => data.total > 0)
    .map(([topicKey, data]) => {
      const topicName = 
        topicKey === 'vat_li' ? 'Vật lí (Lực, Năng lượng, Đo lường)' :
        topicKey === 'hoa_hoc' ? 'Hóa học (Chất, Hỗn hợp, Vật liệu)' :
        topicKey === 'sinh_hoc' ? 'Sinh học (Tế bào, Đa dạng sinh vật)' :
        topicKey === 'thien_van' ? 'Thiên văn (Trái Đất, Mặt Trăng, Hệ Mặt Trời)' : 'Tổng hợp';
      return { topicName, rate: data.correct / data.total, total: data.total, correct: data.correct };
    });

  let advice = '';
  if (topicsActive.length > 0) {
    topicsActive.sort((a, b) => b.rate - a.rate);
    const best = topicsActive[0];
    const weakest = topicsActive[topicsActive.length - 1];

    if (best.rate === 1) {
      advice += `Em làm chủ rất tốt phần kiến thức ${best.topicName}. `;
    }
    if (weakest.rate < 0.6 && weakest.total > 1) {
      advice += `Em nên dành thời gian ôn lại các bài về ${weakest.topicName} trong sách giáo khoa nhé!`;
    }
  }

  return `${header}\n\n${diffComments.join('\n')}\n\n💡 Lời khuyên từ Giáo Hà AI:\n${advice || 'Hãy tiếp tục duy trì niềm say mê khám phá thế giới tự nhiên xung quanh em nhé!'}`;
}

// Synthesized Audio Helper using Web Audio API & Speech Synthesis
class SoundPlayer {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Realistic majestic triumphant fanfare + crowd cheering applause
  playApplause() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Triumphant Major Fanfare (Heroic Brass Trumpet Harmony)
      // Chords: C5 -> E5 -> G5 -> C6 -> E6
      const fanfareNotes = [
        { freq: 523.25, time: 0.0, dur: 0.25 }, // C5
        { freq: 659.25, time: 0.08, dur: 0.25 }, // E5
        { freq: 783.99, time: 0.16, dur: 0.35 }, // G5
        { freq: 1046.50, time: 0.24, dur: 0.6 }, // C6
        { freq: 1318.51, time: 0.32, dur: 0.8 }, // E6
      ];

      fanfareNotes.forEach(({ freq, time, dur }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + time;

        // Rich bright brass harmonic mix
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 2, startTime); // Octave overtone

        gain.gain.setValueAtTime(0.22, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc2.start(startTime);
        osc.stop(startTime + dur);
        osc2.stop(startTime + dur);
      });

      // 2. Synthesized Clapping / Applause sound bursts (Crowd cheer)
      const clapCount = 20;
      for (let i = 0; i < clapCount; i++) {
        const clapTime = now + 0.15 + (i * 0.055) + (Math.random() * 0.02);
        
        // Generate white noise buffer for realistic hand clapping impact
        const bufferSize = this.ctx.sampleRate * 0.045;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) {
          output[j] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1100 + Math.random() * 500, clapTime);
        filter.Q.setValueAtTime(2.8, clapTime);

        const clapGain = this.ctx.createGain();
        clapGain.gain.setValueAtTime(0.26, clapTime);
        clapGain.gain.exponentialRampToValueAtTime(0.004, clapTime + 0.045);

        whiteNoise.connect(filter);
        filter.connect(clapGain);
        clapGain.connect(this.ctx.destination);

        whiteNoise.start(clapTime);
        whiteNoise.stop(clapTime + 0.05);
      }
    } catch {
      // Audio playback ignore on restriction
    }
  }

  // Play comical "Ố ồ" sound + Speech Synthesis voice
  playOhOhVoice() {
    // 1. Synthesize cartoon "Ố... Ồ..." audio tones
    try {
      this.initCtx();
      if (this.ctx) {
        const now = this.ctx.currentTime;
        
        // Tone 1: "Ố" (higher tone, rising slightly)
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(460, now);
        osc1.frequency.linearRampToValueAtTime(520, now + 0.18);
        gain1.gain.setValueAtTime(0.18, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
        osc1.connect(gain1);
        gain1.connect(this.ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.22);

        // Tone 2: "Ồ" (lower comical sliding down tone)
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        const start2 = now + 0.25;
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(360, start2);
        osc2.frequency.exponentialRampToValueAtTime(190, start2 + 0.4);
        gain2.gain.setValueAtTime(0.22, start2);
        gain2.gain.exponentialRampToValueAtTime(0.005, start2 + 0.45);
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start(start2);
        osc2.stop(start2 + 0.45);
      }
    } catch {
      // ignore
    }

    // 2. Web Speech API saying "Ố ồ!"
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        const utterance = new SpeechSynthesisUtterance('Ố ồ!');
        utterance.lang = 'vi-VN';
        utterance.rate = 1.1;
        utterance.pitch = 1.3;
        utterance.volume = 1.0;
        
        // Try finding Vietnamese voice if available
        const voices = window.speechSynthesis.getVoices();
        const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN'));
        if (viVoice) {
          utterance.voice = viVoice;
        }

        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Speech synthesis ignore if blocked
    }
  }

  playCorrect() {
    this.playApplause();
  }

  playIncorrect() {
    this.playOhOhVoice();
  }

  playFanfare() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.12;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {
      // Audio ignore
    }
  }
}

export const soundFx = new SoundPlayer();
