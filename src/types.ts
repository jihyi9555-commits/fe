export interface StudentInfo {
  school: string;
  gradeClass: string;
  name: string;
  date: string;
}

export interface TransportItem {
  id: string;
  name: string;
  category: 'past' | 'modern';
  description: string;
  icon: string; // lucide icon name or emoji
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number; // index
  explanation: string;
}

export interface FutureTransportDesign {
  name: string;
  type: string; // e.g., '하늘을 나는 자동차', '태양광 고속열차', '우주 버스'
  powerSource: string; // e.g., '태양열', '물', '자석'
  features: string;
  drawingPrompt: string;
}
