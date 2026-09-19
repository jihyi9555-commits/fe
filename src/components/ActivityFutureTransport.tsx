import { useState } from 'react';
import { Sparkles, Rocket, Zap, Heart } from 'lucide-react';
import { FutureTransportDesign } from '../types';

interface ActivityFutureTransportProps {
  design: FutureTransportDesign;
  onChange: (design: FutureTransportDesign) => void;
}

const transportTypes = [
  { id: 'flying-car', label: '하늘을 나는 자동차', emoji: '🚗✈️' },
  { id: 'hyperloop', label: '초고속 캡슐 열차 (하이퍼루프)', emoji: '🚄💫' },
  { id: 'underwater-bus', label: '바다 속 수중 버스', emoji: '🚌🌊' },
  { id: 'space-shuttle', label: '우주 관광 로켓', emoji: '🚀✨' },
];

const powerSources = [
  { id: 'solar', label: '태양열 에너지', emoji: '☀️' },
  { id: 'water', label: '깨끗한 물', emoji: '💧' },
  { id: 'magnet', label: '자기력 (자석)', emoji: '🧲' },
  { id: 'eco', label: '친환경 식물 에너지', emoji: '🌱' },
];

export function ActivityFutureTransport({ design, onChange }: ActivityFutureTransportProps) {
  const [selectedType, setSelectedType] = useState<string>(design.type || '하늘을 나는 자동차');
  const [selectedPower, setSelectedPower] = useState<string>(design.powerSource || '태양열 에너지');
  const [transportName, setTransportName] = useState<string>(design.name || '');
  const [features, setFeatures] = useState<string>(design.features || '');

  const updateField = (field: keyof FutureTransportDesign, val: string) => {
    const updated = {
      name: field === 'name' ? val : transportName,
      type: field === 'type' ? val : selectedType,
      powerSource: field === 'powerSource' ? val : selectedPower,
      features: field === 'features' ? val : features,
      drawingPrompt: `${transportName || '미래 교통수단'} (${val || selectedType})`,
    };
    if (field === 'name') setTransportName(val);
    if (field === 'type') setSelectedType(val);
    if (field === 'powerSource') setSelectedPower(val);
    if (field === 'features') setFeatures(val);
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-100 p-6 mb-6 print-shadow-none">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-sky-100">
        <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm font-jua">
          3
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-jua">나만의 미래 교통수단 상상하고 디자인하기</h2>
          <p className="text-xs text-slate-500">먼 훗날 우리 생활을 편리하게 해 줄 미래의 교통수단을 직접 상상하여 계획해 봅시다!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side: Options selection */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
              <Rocket className="w-4 h-4 text-sky-600" /> 1. 어떤 종류의 미래 교통수단인가요?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {transportTypes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => updateField('type', t.label)}
                  className={`p-3 rounded-xl border text-left transition flex items-center gap-2 ${
                    selectedType === t.label
                      ? 'border-sky-500 bg-sky-50 text-sky-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-sky-200'
                  }`}
                >
                  <span className="text-xl">{t.emoji}</span>
                  <span className="text-xs">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
              <Zap className="w-4 h-4 text-amber-600" /> 2. 무엇으로 움직이나요? (동력원)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {powerSources.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => updateField('powerSource', p.label)}
                  className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 ${
                    selectedPower === p.label
                      ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-amber-200'
                  }`}
                >
                  <span className="text-lg">{p.emoji}</span>
                  <span className="text-xs">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">3. 나만의 미래 교통수단 이름 짓기</label>
            <input
              type="text"
              value={transportName}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="예: 하늘을 나는 번개 자동차 '스카이썬더'"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Right side: Drawing box / Features writing */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-purple-600" /> 4. 주요 특징과 편리한 점 쓰기
            </label>
            <textarea
              value={features}
              onChange={(e) => updateField('features', e.target.value)}
              placeholder="예: 차가 막힐 때는 날개를 펼쳐 하늘로 날아갈 수 있고, 쓰레기를 연료로 사용하여 환경을 오염시키지 않아요!"
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            />
          </div>

          <div className="bg-sky-50/70 border-2 border-dashed border-sky-200 rounded-2xl p-4 text-center">
            <div className="text-sky-500 mb-1 font-jua text-sm flex items-center justify-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> 미래 교통수단 상상 스케치 칸
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              활동지에 직접 그림을 그리거나, 아래 요약된 카드를 확인하세요.
            </p>
            <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-xs inline-block text-left w-full">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>이름: {transportName || '(아직 이름이 없어요)'}</span>
                <span className="text-sky-600">종류: {selectedType}</span>
              </div>
              <p className="text-xs text-slate-600">동력: {selectedPower}</p>
              <p className="text-xs text-slate-500 mt-1 italic">
                {features ? `"${features}"` : '특징을 입력해 보세요!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
