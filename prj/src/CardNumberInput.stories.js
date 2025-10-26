import React, { useState } from 'react';

// 1. 테스트할 컴포넌트를 임포트합니다.
import CardNumberInput from './CardNumberInput';

// 2. 메타데이터 (기본 설정) 정의는 파일당 한 번만 합니다.
export default {
  // Storybook 사이드바에 표시될 이름 (필요에 따라 분류)
  title: '폼 요소/CardNumberInput',
  // 스토리를 만들 컴포넌트 지정
  component: CardNumberInput,
  // Storybook 7.0+에서 자동 문서화(Docs) 생성
  tags: ['autodocs'],
  // 컴포넌트의 props와 Storybook Controls 설정을 정의
  argTypes: {
    value: {
      control: 'text',
      description: '입력 필드에 표시될 현재 카드 번호 값',
    },
    onChange: {
      // 이벤트가 발생할 때 Storybook Actions 탭에 기록
      action: 'CardNumberInput: changed', 
      description: '입력 값이 변경될 때 호출되는 이벤트 핸들러',
    },
  },
};


// --- 스토리 정의 (Component States) ---

// 4. 스토리 1: 기본 (빈 입력 필드)
export const Empty = {
  // 기본 props 값 설정
  args: {
    value: '', // 초기에는 빈 문자열
  },
};

// 5. 스토리 2: 값이 채워진 상태
export const Filled = {
  args: {
    value: '1234 5678 9012 3456', // 실제 데이터 예시
  },
};

// 6. 스토리 3: 상호작용 가능한 테스트 (Storybook 내에서 값 변경 테스트)
export const Interactive = (args) => {
  // Storybook 내에서 컴포넌트의 상태(값)를 관리하기 위한 훅
  const [currentValue, setCurrentValue] = useState(args.value);

  const handleChange = (e) => {
    // 1. 컴포넌트의 내부 상태 업데이트
    setCurrentValue(e.target.value);
    // 2. 외부에서 전달받은 onChange 함수 (Action 기록용) 호출
    args.onChange(e); 
  };

  return (
    <CardNumberInput
      // 기타 모든 props 전달
      {...args}
      // 상태 관리 훅의 값과 핸들러 함수를 컴포넌트에 전달
      value={currentValue}
      onChange={handleChange}
    />
  );
};

// Interactive 스토리에만 적용되는 초기 props
Interactive.args = {
  value: '9999 0000', // 초기 테스트 값
};