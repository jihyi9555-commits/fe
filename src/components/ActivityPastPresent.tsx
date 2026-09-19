import { useState } from 'react';
import { CheckCircle2, AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  type: 'past' | 'modern';
  emoji: string;
  desc: string;
}

const defaultItems: Item[] = [
  { id: '1', name: '가마', type: 'past', emoji: '🪑', desc: '사람이 어깨에 메고 사람을 운반하던 교통수단이에요.' },
  { id: '2', name: '우마차', type: 'past', emoji: '🐂', desc: '소나 말이 끌던 수레로 짐과 사람을 나르었어요.' },
  { id: '3', name: '나룻배', type: 'past', emoji: '🛶', desc: '노를 저어 강이나 호수를 건너던 나무 배예요.' },
  { id: '4', name: '증기기관차', type: 'past', emoji: '🚂', desc: '석탄을 태워 만든 증기 힘으로 철길을 달렸어요.' },
  { id: '5', name: 'KTX (고속열차)', type: 'modern', emoji: '🚄', desc: '빠른 속도로 전국의 주요 도시를 하루 생활권으로 연결해요.' },
  { id: '6', name: '지하철', type: 'modern', emoji: '🚇', desc: '땅속이나 고가로 다니며 많은 사람을 안전하게 태워줘요.' },
  { id: '7', name: '고속버스', type: 'modern', emoji: '🚌', desc: '고속도로를 통해 도시와 도시를 빠르게 오갈 수 있어요.' },
  { id: '8', name: '여객선', type: 'modern', emoji: '🚢', desc: '큰 바다를 건너 사람과 무거운 화물을 대량으로 실어 나릅니다.' },
  { id: '9', name: '비행기', type: 'modern', emoji: '✈️', desc: '하늘을 날아 넓은 바다와 세계 다른 나라를 몇 시간 만에 가요.' },
];

interface ActivityPastPresentProps {
  showAnswerKey: boolean;
}

export function ActivityPastPresent({ showAnswerKey }: ActivityPastPresentProps) {
  // Shuffled pool of items for the student to sort
  const [items, setItems] = useState<Item[]>(() => [...defaultItems].sort(() => Math.random() - 0.5));
  const [userPlacements, setUserPlacements] = useState<Record<string, 'past' | 'modern' | 'unassigned'>>({});
  const [checked, setChecked] = useState(false);

  const handlePlace = (id: string, targetType: 'past' | 'modern' | 'unassigned') => {
    setUserPlacements((prev) => ({ ...prev, [id]: targetType }));
    setChecked(false);
  };

  const handleReset = () => {
    setUserPlacements({});
    setChecked(false);
    setItems([...defaultItems].sort(() => Math.random() - 0.5));
  };

  const unassignedItems = items.filter((item) => !userPlacements[item.id] || userPlacements[item.id] === 'unassigned');
  const pastAssigned = items.filter((item) => userPlacements[item.id] === 'past');
  const modernAssigned = items.filter((item) => userPlacements[item.id] === 'modern');

  const correctCount = items.filter((item) => userPlacements[item.id] === item.type).length;
  const totalCount = items.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6 mb-6 print-shadow-none">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm font-jua">
            1
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-jua">과거와 오늘날의 교통수단 분류하기</h2>
            <p className="text-xs text-slate-500">다음 교통수단 카드들을 알맞은 시대(과거 / 오늘날) 상자에 넣어 보세요!</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="no-print text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 bg-slate-50 hover:bg-sky-50 px-3 py-1.5 rounded-lg border border-slate-200 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> 다시 섞기
        </button>
      </div>

      {/* Unassigned card pool */}
      {unassignedItems.length > 0 && (
        <div className="mb-6 bg-sky-50/60 p-4 rounded-xl border border-dashed border-sky-300">
          <p className="text-xs font-bold text-sky-800 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-sky-600" /> 분류할 교통수단 카드 (아래 버튼을 눌러 과거 또는 오늘날에 배치하세요)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {unassignedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-xl border border-sky-200 shadow-xs flex flex-col justify-between hover:border-sky-400 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">카드</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{item.desc}</p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-1.5 no-print">
                  <button
                    onClick={() => handlePlace(item.id, 'past')}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs py-1 rounded font-bold transition"
                  >
                    과거 ⬅️
                  </button>
                  <button
                    onClick={() => handlePlace(item.id, 'modern')}
                    className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs py-1 rounded font-bold transition"
                  >
                    오늘날 ➡️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drop zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Past Zone */}
        <div className="bg-amber-50/60 border-2 border-amber-200 rounded-xl p-4 min-h-[220px] flex flex-col">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200">
            <h3 className="font-bold text-amber-900 text-base font-jua flex items-center gap-2">
              📜 과거의 교통수단
            </h3>
            <span className="text-xs font-bold bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
              {pastAssigned.length}개 배치됨
            </span>
          </div>
          <div className="flex-1 space-y-2">
            {pastAssigned.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-amber-700/60 italic py-8">
                과거의 교통수단 카드를 이곳에 넣어주세요
              </div>
            ) : (
              pastAssigned.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white p-3 rounded-lg border flex items-center justify-between shadow-xs ${
                    checked
                      ? item.type === 'past'
                        ? 'border-emerald-400 bg-emerald-50/40'
                        : 'border-rose-400 bg-rose-50/40'
                      : 'border-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {checked && (
                      <span className={`text-xs font-bold ${item.type === 'past' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {item.type === 'past' ? '정답 ⭕' : '오답 ❌'}
                      </span>
                    )}
                    <button
                      onClick={() => handlePlace(item.id, 'unassigned')}
                      className="no-print text-xs text-slate-400 hover:text-rose-600 px-1.5 py-0.5 rounded"
                      title="취소"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modern Zone */}
        <div className="bg-emerald-50/60 border-2 border-emerald-200 rounded-xl p-4 min-h-[220px] flex flex-col">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-200">
            <h3 className="font-bold text-emerald-900 text-base font-jua flex items-center gap-2">
              ⚡ 오늘날의 교통수단
            </h3>
            <span className="text-xs font-bold bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full">
              {modernAssigned.length}개 배치됨
            </span>
          </div>
          <div className="flex-1 space-y-2">
            {modernAssigned.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-emerald-700/60 italic py-8">
                오늘날의 교통수단 카드를 이곳에 넣어주세요
              </div>
            ) : (
              modernAssigned.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white p-3 rounded-lg border flex items-center justify-between shadow-xs ${
                    checked
                      ? item.type === 'modern'
                        ? 'border-emerald-400 bg-emerald-50/40'
                        : 'border-rose-400 bg-rose-50/40'
                      : 'border-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {checked && (
                      <span className={`text-xs font-bold ${item.type === 'modern' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {item.type === 'modern' ? '정답 ⭕' : '오답 ❌'}
                      </span>
                    )}
                    <button
                      onClick={() => handlePlace(item.id, 'unassigned')}
                      className="no-print text-xs text-slate-400 hover:text-rose-600 px-1.5 py-0.5 rounded"
                      title="취소"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Check button & results */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-sky-100">
        <div>
          {checked ? (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-slate-800 text-sm">
                결과: 총 {totalCount}개 중 <span className="text-emerald-600 font-extrabold">{correctCount}개</span> 맞혔어요!
              </span>
            </div>
          ) : (
            <span className="text-xs text-slate-500 font-medium">
              모든 카드를 분류한 후 [정답 확인하기] 버튼을 눌러보세요.
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 no-print">
          <button
            onClick={() => setChecked(true)}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> 정답 확인하기
          </button>
        </div>
      </div>

      {/* Teacher Answer Key disclosure */}
      {showAnswerKey && (
        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
          <p className="font-bold mb-1 flex items-center gap-1">
            <AlertCircle className="w-4 h-4 text-amber-600" /> [선생님 지도 가이드 & 정답]
          </p>
          <p className="text-amber-800 mb-2">
            - <strong>과거의 교통수단</strong>: 가마, 우마차, 나룻배, 증기기관차 (동력원이 사람이거나 동물, 혹은 초기 증기기관)
          </p>
          <p className="text-amber-800">
            - <strong>오늘날의 교통수단</strong>: KTX, 지하철, 고속버스, 여객선, 비행기 (전기, 내연기관 등 발달된 동력으로 빠르고 대량 이동 가능)
          </p>
        </div>
      )}
    </div>
  );
}
