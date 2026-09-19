import { useState } from 'react';
import { Award, CheckCircle2, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../types';

const quizList: QuizQuestion[] = [
  {
    id: 1,
    question: '다음 중 과거에 사람들이 이용하던 교통수단이 아닌 것은 어느 것인가요?',
    options: ['① 가마', '② 우마차', '③ KTX', '④ 나룻배'],
    answer: 2,
    explanation: 'KTX는 빠르고 현대적인 기술로 만들어진 오늘날의 교통수단이에요.',
  },
  {
    id: 2,
    question: '교통수단이 발달하면서 생겨난 변화로 알맞지 않은 것은 무엇인가요?',
    options: [
      '① 이동하는 데 걸리는 시간이 줄어들었다.',
      '② 하루 생활권이 가능해져 활동 범위가 넓어졌다.',
      '③ 다른 지역의 신선한 물자를 빠르게 주고받을 수 있게 되었다.',
      '④ 전 세계 사람들의 걸음걸이가 훨씬 느려졌다.',
    ],
    answer: 3,
    explanation: '교통수단이 발달하면서 이동 속도가 빨라지고 생활 범위와 물자 교류가 활발해졌어요.',
  },
  {
    id: 3,
    question: '땅속이나 고가 철길을 달리며 도심에서 많은 사람들을 빠르게 이동시켜 주는 교통수단은 무엇인가요?',
    options: ['① 지하철', '② 뗏목', '③ 마차', '④ 헬리콥터'],
    answer: 0,
    explanation: '지하철은 정체 없이 도심 속을 빠르게 달리는 대표적인 대중교통이에요.',
  },
  {
    id: 4,
    question: '먼 거리의 바다를 건너 다른 나라나 대륙으로 사람과 화물을 운반할 때 가장 알맞은 교통수단은 무엇인가요?',
    options: ['① 자전거', '② 비행기와 여객선', '③ 우마차', '④ 인력거'],
    answer: 1,
    explanation: '넓은 바다와 하늘을 건널 때는 비행기와 여객선(배)을 이용해요.',
  },
];

interface ActivityQuizProps {
  showAnswerKey: boolean;
}

export function ActivityQuiz({ showAnswerKey }: ActivityQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
    setSubmitted(false);
  };

  const score = quizList.filter((q) => selectedAnswers[q.id] === q.answer).length;

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6 mb-6 print-shadow-none">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm font-jua">
            4
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-jua">실력 쑥쑥! 교통수단 단원 퀴즈</h2>
            <p className="text-xs text-slate-500">지금까지 배운 내용을 퀴즈를 통해 재미있게 확인해 보세요.</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="no-print text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 bg-slate-50 hover:bg-sky-50 px-3 py-1.5 rounded-lg border border-slate-200 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 다시 풀기
        </button>
      </div>

      <div className="space-y-6 mb-6">
        {quizList.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.answer;

          return (
            <div key={q.id} className="bg-sky-50/40 p-4 rounded-xl border border-sky-100">
              <div className="flex items-start gap-2 mb-2">
                <span className="bg-sky-600 text-white font-bold text-xs px-2 py-0.5 rounded">
                  문제 {idx + 1}
                </span>
                <p className="text-sm font-bold text-slate-800">{q.question}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {q.options.map((opt, oIdx) => {
                  const isSelected = userChoice === oIdx;
                  let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-sky-300';

                  if (submitted) {
                    if (oIdx === q.answer) {
                      btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-sky-100 border-sky-500 text-sky-900 font-bold';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && oIdx === q.answer && <span className="text-emerald-700 font-bold text-sm">✓ 정답</span>}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`mt-3 p-3 rounded-lg text-xs flex items-start gap-2 ${isCorrect ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                  <span className="font-bold">{isCorrect ? '참 잘했어요! ⭕' : '아쉬워요 ❌'}</span>
                  <span className="text-slate-600">{q.explanation}</span>
                </div>
              )}

              {showAnswerKey && !submitted && (
                <div className="mt-2 text-[11px] text-amber-700 font-bold bg-amber-50 p-2 rounded border border-amber-200">
                  💡 정답: {q.options[q.answer]} - {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-sky-100">
        <div>
          {submitted ? (
            <div className="flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-2 rounded-xl font-jua">
              <Award className="w-5 h-5 text-amber-600" />
              <span>총 4문제 중 <span className="text-sky-700 text-lg">{score}문제</span> 맞혔습니다! {score === 4 ? '🎉 만점 축하해요!' : '참 잘했어요!'}</span>
            </div>
          ) : (
            <span className="text-xs text-slate-500 font-medium">
              모든 문항을 선택한 후 [정답 채점하기] 버튼을 누르세요.
            </span>
          )}
        </div>
        <div className="no-print">
          <button
            onClick={() => setSubmitted(true)}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> 정답 채점하기
          </button>
        </div>
      </div>
    </div>
  );
}
