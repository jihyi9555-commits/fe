import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ActivityLifeChangesProps {
  showAnswerKey: boolean;
}

export function ActivityLifeChanges({ showAnswerKey }: ActivityLifeChangesProps) {
  // 3 questions about life changes due to transportation development
  const [answers, setAnswers] = useState<Record<number, string>>({
    1: '',
    2: '',
    3: '',
  });
  const [checked, setChecked] = useState(false);

  const questions = [
    {
      id: 1,
      title: '1. 이동 시간의 변화',
      question: '과거에는 서울에서 부산까지 며칠이나 걸렸지만, 오늘날에는 무엇이 발달하여 반나절(약 2~3시간) 만에 갈 수 있게 되었나요?',
      placeholder: '예: KTX, 고속열차, 비행기 등',
      keywords: ['KTX', '고속열차', '기차', '비행기', '고속버스'],
    },
    {
      id: 2,
      title: '2. 생활권의 확대',
      question: '교통수단이 발달하면서 아침에 출근하거나 등교하여 다른 지역에서 활동하고 저녁에 돌아오는 \'어떤 생활권\'이 가능해졌나요?',
      placeholder: '예: 하루 생활권',
      keywords: ['하루', '하루생활권', '1일'],
    },
    {
      id: 3,
      title: '3. 물자의 교류',
      question: '빠른 교통수단과 냉장 시설 덕분에 바닷가의 신선한 수산물을 내륙 지역에서도 빠르게 받을 수 있게 되었습니다. 이처럼 지역 간에 물건을 주고받는 것을 무엇이라고 할까요?',
      placeholder: '예: 물자 교류 또는 유통',
      keywords: ['물자', '교류', '유통', '무역', '이동'],
    },
  ];

  const handleInputChange = (id: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
    setChecked(false);
  };

  const isCorrect = (qId: number) => {
    const userVal = answers[qId]?.trim().toLowerCase() || '';
    const q = questions.find((item) => item.id === qId);
    if (!q) return false;
    return q.keywords.some((kw) => userVal.includes(kw.toLowerCase()));
  };

  const correctCount = questions.filter((q) => isCorrect(q.id)).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6 mb-6 print-shadow-none">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sky-100">
        <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm font-jua">
          2
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-jua">교통수단의 발달에 따른 생활의 변화</h2>
          <p className="text-xs text-slate-500">교통수단이 발달하면서 우리들의 생활 모습이 어떻게 달라졌는지 빈칸에 알맞은 말을 적어보세요.</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {questions.map((q) => {
          const correct = isCorrect(q.id);
          return (
            <div key={q.id} className="bg-sky-50/50 p-4 rounded-xl border border-sky-100">
              <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded inline-block mb-1">
                {q.title}
              </span>
              <p className="text-sm font-bold text-slate-800 mb-3">{q.question}</p>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={answers[q.id]}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {checked && (
                  <span className={`text-xs font-bold px-2.5 py-1.5 rounded-lg ${correct ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {correct ? '정답 ⭕' : '다시 생각해봐요 ❌'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-sky-100">
        <div>
          {checked ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-slate-800 text-sm">
                결과: 총 3문제 중 <span className="text-emerald-600 font-extrabold">{correctCount}문제</span> 맞혔어요!
              </span>
            </div>
          ) : (
            <span className="text-xs text-slate-500 font-medium">
              빈칸을 모두 채운 후 [정답 확인하기]를 눌러보세요.
            </span>
          )}
        </div>
        <div className="no-print">
          <button
            onClick={() => setChecked(true)}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> 정답 확인하기
          </button>
        </div>
      </div>

      {showAnswerKey && (
        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
          <p className="font-bold mb-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4 text-amber-600" /> [선생님 지도 가이드 & 모범 답안]
          </p>
          <ul className="list-disc pl-4 space-y-1 text-amber-800">
            <li>1번 모범 답안: <strong>KTX (고속열차), 비행기</strong></li>
            <li>2번 모범 답안: <strong>하루 생활권</strong> (또는 1일 생활권)</li>
            <li>3번 모범 답안: <strong>물자 교류</strong> (지역 간 교류)</li>
          </ul>
        </div>
      )}
    </div>
  );
}
