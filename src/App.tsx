/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { StudentHeader } from './components/StudentHeader';
import { ActivityPastPresent } from './components/ActivityPastPresent';
import { ActivityLifeChanges } from './components/ActivityLifeChanges';
import { ActivityFutureTransport } from './components/ActivityFutureTransport';
import { ActivityQuiz } from './components/ActivityQuiz';
import { StudentInfo, FutureTransportDesign } from './types';
import { Smile, Award, Printer } from 'lucide-react';

export default function App() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    school: '',
    gradeClass: '',
    name: '',
    date: '',
  });

  const [futureDesign, setFutureDesign] = useState<FutureTransportDesign>({
    name: '',
    type: '하늘을 나는 자동차',
    powerSource: '태양열 에너지',
    features: '',
    drawingPrompt: '',
  });

  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm('작성한 내용이 초기화됩니다. 다시 시작하시겠습니까?')) {
      setStudentInfo({ school: '', gradeClass: '', name: '', date: '' });
      setFutureDesign({
        name: '',
        type: '하늘을 나는 자동차',
        powerSource: '태양열 에너지',
        features: '',
        drawingPrompt: '',
      });
      setShowAnswerKey(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Student Header & Top Toolbar */}
        <StudentHeader
          info={studentInfo}
          onChange={setStudentInfo}
          showAnswerKey={showAnswerKey}
          onToggleAnswerKey={() => setShowAnswerKey(!showAnswerKey)}
          onPrint={handlePrint}
          onReset={handleReset}
        />

        {/* Activity 1: Past vs Modern Transportation */}
        <ActivityPastPresent showAnswerKey={showAnswerKey} />

        {/* Activity 2: Life Changes */}
        <ActivityLifeChanges showAnswerKey={showAnswerKey} />

        {/* Activity 3: Future Transport Design */}
        <ActivityFutureTransport design={futureDesign} onChange={setFutureDesign} />

        {/* Activity 4: Quiz */}
        <ActivityQuiz showAnswerKey={showAnswerKey} />

        {/* Bottom Completion Card & Print Banner */}
        <div className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-2xl p-6 text-center shadow-md mb-8 no-print">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-7 h-7 text-yellow-300" />
            <h3 className="text-xl font-bold font-jua">오늘의 교통수단 탐구 활동을 모두 마쳤어요!</h3>
          </div>
          <p className="text-sky-100 text-xs max-w-md mx-auto mb-4">
            정성껏 작성한 활동지를 인쇄하여 선생님께 제출하거나, 집에서 복습용으로 활용해 보세요.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-white text-sky-700 hover:bg-sky-50 px-6 py-2.5 rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> 활동지 인쇄하기 / PDF 저장
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-sky-700/60 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition"
            >
              맨 위로 올라가기 ⬆️
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-500 pb-8 no-print flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <Smile className="w-4 h-4 text-sky-500" /> 초등학교 3학년 사회과 '교통수단의 발달' 학습 도우미
          </div>
          <p>즐겁게 배우고 탐구하는 스마트 사회 교실</p>
        </footer>
      </div>
    </div>
  );
}
