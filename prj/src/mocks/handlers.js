import {http, HttpResponse} from 'msw';

export const handlers = [
    // 추후 상품 목록이나 장바구니 관련 핸들러 추가 예정
    http.get('/api/test', () => {
        return HttpResponse.json({message: "MSW is running!"});
    }),

    // (): 매개변수, 비어있다는 건 매개변수를 받지 않는다는 의미
    // =>: 앞의 변수를 받아서 뒤에 있는 함수 본문을 실행한다는 의미
    // {...}: 함수의 본문(Body), 즉 함수가 호출됐을 때 실제로 실행될 코드를 담는 곳
];