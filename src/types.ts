export type SubjectTopic = 'vat_li' | 'hoa_hoc' | 'sinh_hoc' | 'thien_van' | 'tong_hop';

export type DifficultyLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung';

export type DifficultyFilter = 'all' | 'nhan_biet' | 'thong_hieu' | 'van_dung';

export type QuizMode = 'practice' | 'exam';

export interface StudentInfo {
  fullName: string;
  className: string;
}

export interface Question {
  id: number;
  chapterId: number;
  chapterTitle: string;
  lessonId: number;
  lessonTitle: string;
  topic: SubjectTopic;
  difficulty: DifficultyLevel;
  content: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  hint?: string;
  sourceDoc?: string; // e.g. "SGK KHTN 6 trang 18", "SBT Bài 5.2"
}

export interface LessonSummary {
  id: number;
  title: string;
  chapterId: number;
  chapterTitle: string;
  topic: SubjectTopic;
  pageSGK: number;
  summaryPoints: string[];
  keyTerms: string[];
}

export interface Chapter {
  id: number;
  number: number;
  title: string;
  topic: SubjectTopic;
  iconName: string;
  lessons: {
    id: number;
    title: string;
    pageSGK: number;
  }[];
}

export interface GlossaryTerm {
  term: string;
  meaning: string;
  page: number;
  category: SubjectTopic;
}

export interface QuizConfig {
  student: StudentInfo;
  selectedChapterIds: number[];
  selectedLessonIds: number[];
  questionCount: number; // 5 to 30
  difficulty: DifficultyFilter;
  mode: QuizMode;
  timeLimitMinutes?: number;
}

export interface QuizResult {
  id: string;
  student: StudentInfo;
  config: QuizConfig;
  questions: Question[];
  userAnswers: Record<number, number>; // questionId -> selected option index
  score: number; // 0 - 10
  correctCount: number;
  totalCount: number;
  timeSpentSeconds: number;
  completedAt: string;
  statsByDifficulty: {
    nhan_biet: { total: number; correct: number };
    thong_hieu: { total: number; correct: number };
    van_dung: { total: number; correct: number };
  };
  statsByTopic: Record<SubjectTopic, { total: number; correct: number }>;
  aiFeedback: string;
}
