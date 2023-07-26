/**
 * @파일명 Progress.js
 * @작성자 이수
 * @작성일 2023-07-23
 * @코드설명
 *   앱의 진행 상황을 관리하기 위한 context를 생성하고 provider를 구현합니다.
 *   이 컨텍스트는 앱에서 발생하는 작업의 진행 상태를 전역적으로 관리하는 데 사용됩니다.
 */

import React, { useState, createContext } from 'react';

// ProgressContext를 생성합니다. 초기값으로 inProgress 상태와 spinner 객체를 가집니다.
const ProgressContext = createContext({
  inProgress: false,
  spinner: { start: () => {}, stop: () => {} },
});

// ProgressProvider 컴포넌트를 구현합니다.
// 앱의 작업 상태를 관리하기 위한 inProgress 상태와, 이 상태를 제어하는 spinner 객체를 제공합니다.
const ProgressProvider = ({ children }) => {
  const [inProgress, setInProgress] = useState(false);
  const spinner = {
    start: () => setInProgress(true),
    stop: () => setInProgress(false),
  };
  const value = { inProgress, spinner };

  // ProgressContext.Provider를 반환하며, 앱의 다른 부분에서 이 context를 사용할 수 있도록 합니다.
  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export { ProgressContext, ProgressProvider };
