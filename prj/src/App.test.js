import { render, screen } from '@testing-library/react';
import App from './App';

test('이미지 요소 확인', () => {
  // 1. App 컴포넌트 렌더링
  render(<App />);

  // 2. 'alt' 텍스트를 사용하여 이미지 요소를 찾음
  const imageElement = screen.getByAltText(/신발 이미지/i);

  // 3. 찾은 이미지 요소가 원하는 클래스를 가지고 있는지 확인
  expect(imageElement).toHaveClass('itembox');
});