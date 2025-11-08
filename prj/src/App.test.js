import { render, screen } from '@testing-library/react';
import {RecoilRoot} from 'recoil';
import App from './App';


test('이미지 요소 확인', async () => {
  // 1. App 컴포넌트 렌더링
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>);

  // 2. 모킹 서버(db.json)의 첫 번째 상품의 제목을 사용
  const firstProductTitle = await screen.findByText(/브랜드A - 모델 1/i, {}, {timeout: 4000});

  // 3. 데이터가 성공적으로 로드되고 렌더링되었는지 확인
  expect(firstProductTitle).toBeInTheDocument();
});