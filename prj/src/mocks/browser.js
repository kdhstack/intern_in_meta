import {setupWorker} from 'msw/browser';
import {handlers} from './handlers';

// 워커를 설정하고 핸들러를 전달
export const worker = setupWorker(...handlers);
// ...handlers: handlers 배열 내의 요소를 펼쳐서 인수로 하나하나 전달

// 개발 환경에서만 워커를 실행하기 위한 함수
export async function startWorker() {
    if (process.env.NODE_ENV === 'development') {
        console.log('Starting MSW worker...');
        await worker.start();
        console.log('MSW worker started.');
    }
}