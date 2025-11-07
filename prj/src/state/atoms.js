import {atom, selector} from 'recoil';

// 배송비 기준 추가
const SHIPPING_FEE = 3000;
const FREE_SHIPPING_THRESHOLD = 100000;


// 장바구니 상태 Atom
// 각 아이텡은 {id: string, quantity: number} 형태로 저장
export const cartState = atom({
    key: 'cartState',
    default: [],
});

// 장바구니에 담긴 총 상품 개수를 계산하는 Selector
export const cartCountSelector = selector({
    key: 'cartCountSelector',
    get: ({get}) => {
        const cartItems = get(cartState);
        // reduce: 배열의 모든 요소를 순회하며 하나의 단일 값을 생성하는 메소드
        // total: 누적값, item: 현재 요소, 0: 초기값
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    },
});

export const viewState = atom({
    key: 'viewState',
    default: 'home',
});

export const cartTotalSelector = selector({
    key: 'cartTotalSelector',
    get: ({get}) => {
        const cartItems = get(cartState);

        const totalPrice = cartItems.reduce((total, item) => {
            const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
            return total + numericPrice * item.quantity;
        }, 0)

        const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

        const finalTotal = totalPrice + shippingFee;

        return {
            totalPrice: totalPrice,
            shippingFee: shippingFee,
            finalTotal: finalTotal,
        };
    },
});

export const productState = atom({
    key: 'productState',
    default: [],
});

export const productsSelector = selector({
    key: 'productsSelector',
    get: async() => {
        try {
            const response = await fetch('http://localhost:3001/products');

            if (!response.ok) {
                throw new Error('상품 데이터를 불러오는 데 실패했습니다.');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
});