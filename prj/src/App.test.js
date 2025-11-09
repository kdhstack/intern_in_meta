import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import App from './App';

describe('카드 모달에 카드 등록', () => {

    const setupCardModalAddStage = async () => {
        render(
            <RecoilRoot>
                <App />
            </RecoilRoot>
        );

        const buyButton = await screen.findByRole('button', { name: /구매/i });
        fireEvent.click(buyButton);

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /결제 수단 선택/i })).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('+'));

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /새 카드 추가/i })).toBeInTheDocument();
        });
    };


    it('카드 정보 입력받아 형식 변경 후 등록', async () => {
        await setupCardModalAddStage();

        const numberInput = screen.getByLabelText(/카드 번호:/i);
        const dateInput = screen.getByLabelText(/유효 기간:/i);
        const usernameInput = screen.getByLabelText(/소유자 이름:/i);
        const cvcInput = screen.getByLabelText(/CVC\/보안 코드:/i);
        const pwInput = screen.getByLabelText(/카드 비밀번호 앞 두자리:/i);
        const registerButton = screen.getByRole('button', { name: /카드 등록하기/i });

        fireEvent.change(numberInput, { target: { value: '1111222233334444555' } });
        
        expect(numberInput).toHaveValue('1111 2222 **** **** '); 
        expect(numberInput).toHaveAttribute('maxlength', '19');

        fireEvent.change(dateInput, { target: { value: '10/24' } });
        fireEvent.change(usernameInput, { target: { value: 'TEST USER' } });
        fireEvent.change(cvcInput, { target: { value: '123' } });
        fireEvent.change(pwInput, { target: { value: '12' } });

        fireEvent.click(registerButton);
        
        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /결제 수단 선택/i })).toBeInTheDocument();
            expect(screen.queryByRole('heading', { name: /새 카드 추가/i })).not.toBeInTheDocument();
        });
        
        const registeredCardDisplay = screen.getByText(/1111 2222 ******** /i);
        expect(registeredCardDisplay).toBeInTheDocument();
    });
});

test('서버 구동 확인', async () => {
  // 1. App 컴포넌트 렌더링
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>);

  // 2. 모킹 서버(db.json)의 첫 번째 상품의 제목이 로드될 때까지 대기
  const firstProductTitle = await screen.findByText(/브랜드A - 모델 1/i, {}, {timeout: 4000});

  // 3. 데이터가 성공적으로 로드되고 렌더링되었는지 확인
  expect(firstProductTitle).toBeInTheDocument();
});
