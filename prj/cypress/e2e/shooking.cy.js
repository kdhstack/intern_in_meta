describe('Shooking 상품 로딩 E2E 테스트', () => {
    
    // 각 테스트 전에 홈 페이지 방문
    beforeEach(() => {
        cy.visit('/intern_in_meta');
        cy.contains('브랜드A - 모델 1').should('be.visible');
    });

    it('상품 목록에서 "브랜드A - 모델 1" 상품을 찾을 수 있다.', () => {
        cy.contains('브랜드A - 모델 1').should('be.visible');

    });

    it('1. 상품을 장바구니에 추가하고 장바구니 페이지로 이동', () => {
        const productName = '브랜드A - 모델 2';

        cy.log(`장바구니에 상품 "${productName}" 추가 시작`);

        cy.get('.item')
            .contains(productName)
            .parents('.item')
            .within(() => {
                cy.contains('담기').click();

                cy.contains('담음!').should('be.visible');
            });
        
        cy.log('장바구니 아이콘 클릭하여 페이지 이동');

        cy.get('.cart').click();

        cy.url().should('include', '/cart');

        cy.contains('🛒 장바구니').should('be.visible');

        cy.contains(productName).should('be.visible');
    });
});