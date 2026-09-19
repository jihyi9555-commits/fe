import { StudentInfo } from '../types';
import { Bus, Train, Plane, Ship, Sparkles } from 'lucide-react';

interface StudentHeaderProps {
  info: StudentInfo;
  onChange: (info: StudentInfo) => void;
  showAnswerKey: boolean;
  onToggleAnswerKey: () => void;
  onPrint: () => void;
  onReset: () => void;
}

export function StudentHeader({
  info,
  onChange,
  showAnswerKey,
  onToggleAnswerKey,
  onPrint,
  onReset,
}: StudentHeaderProps) {
  const handleChange = (field: keyof StudentInfo, value: string) => {
    onChange({ ...info, [field]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6 mb-6 print-shadow-none">
      {/* Top action bar (no-print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-sky-100 no-print">
        <div className="flex items-center gap-2">
          <span className="bg-sky-500 text-white text-xs px-2.5 py-1 rounded-full font-bold">사회 3학년</span>
          <span className="text-xs text-slate-500 font-medium">단원: 2. 교통수단의 발달과 생활의 변화</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleAnswerKey}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              showAnswerKey
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {showAnswerKey ? '선생님 정답/해설 숨기기' : '선생님 정답 보기'}
          </button>
          <button
            onClick={onReset}
            className="px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-xs font-bold transition"
          >
            새로 작성하기
          </button>
          <button
            onClick={onPrint}
            className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow-sm transition flex items-center gap-1.5"
          >
            🖨️ 활동지 인쇄하기
          </button>
        </div>
      </div>

      {/* Title & Icon Header */}
      <div className="text-center relative mb-6">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-3 text-sky-400">
          <Bus className="w-8 h-8 animate-bounce" />
          <Train className="w-8 h-8 animate-pulse" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-3 text-sky-400">
          <Ship className="w-8 h-8 animate-pulse" />
          <Plane className="w-8 h-8 animate-bounce" />
        </div>

        <span className="text-sky-600 font-bold text-sm tracking-widest uppercase mb-1 block">초등학교 사회과 탐구 활동지</span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 font-jua">
          🚀 스마트 씽씽! 교통수단의 발달
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          과거의 교통수단부터 오늘날의 편리한 교통수단, 그리고 미래의 교통수단까지 함께 알아봅시다!
        </p>
      </div>

      {/* Student info inputs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-sky-50/70 p-4 rounded-xl border border-sky-100">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">학교</label>
          <input
            type="text"
            value={info.school}
            onChange={(e) => handleChange('school', e.target.value)}
            placeholder="OO초등학교"
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">학년 / 반</label>
          <input
            type="text"
            value={info.gradeClass}
            onChange={(e) => handleChange('gradeClass', e.target.value)}
            placeholder="3학년 O반"
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">이름</label>
          <input
            type="text"
            value={info.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="이름을 입력하세요"
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">날짜</label>
          <input
            type="text"
            value={info.date}
            onChange={(e) => handleChange('date', e.target.value)}
            placeholder="2026년 O월 O일"
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>
    </div>
  );
}
