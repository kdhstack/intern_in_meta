import './App.css';

import React, {useState, Suspense} from 'react';
import {useRecoilState, useRecoilValue, useRecoilValueLoadable} from 'recoil';
import { cartState, cartCountSelector, cartTotalSelector, productsSelector } from './state/atoms';
import {BrowserRouter as Router, Route, Routes, useNavigate, useParams} from 'react-router-dom';

function Header({onCartClick}) {
  const totalCount = useRecoilValue(cartCountSelector);

  return (
    <header className='header'>
      <h1 className='headerText'>Shooking</h1>
      <nav>
        <img src={process.env.PUBLIC_URL + '/cart.png'} alt='장바구니' className='cart' onClick={onCartClick}></img>
        <CartCount count = {totalCount} />
      </nav>
    </header>
  );
}

function ItemStatus({totalItems}) {
  return (
    <div className='itemstatus'>
      <div className='itemstatustitle'>
        신발 상품 목록
      </div>
      <div className='itemlist'>
        현재 {totalItems}개의 상품이 있습니다.
      </div>
    </div>
  )
}

function ItemBox({item, onBuyClick}) {
  const [cart, setCart] = useRecoilState(cartState)
  const navigate = useNavigate();

  const itemInCart = cart.find(cartItem => cartItem.id === item.id)
  const isClicked = !!itemInCart; // 담겨 있으면 True
  const imageSrc = process.env.PUBLIC_URL + item.img;

  const handleCartClick = () => {
    if (isClicked) {
      // 담겨있으면 제거
      setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== item.id));
    }
    else {
      // 안 담겨있으면 추가
      setCart(prevCart => [...prevCart, {id: item.id, quantity: 1, ...item}]);
    }
  }
  const cartButtonClasses = `cartbutton ${isClicked ? 'clicked' : ''}`;
  const cartButtonText = isClicked ? '담음!' : '담기';

  const handleBuyClick = () => {
    if (!isClicked) {
      handleCartClick();
    }
    if (onBuyClick) {
      onBuyClick();
    }
  };
;

  const handleImageClick = () => {
    navigate(`/detail/${item.id}`);
  }

  const buyButtonClasses = 'buybutton';
  const buyButtonText = '구매';

  return (
    <div className="item">
      <img src={imageSrc} alt={item.title} className="itemimg clickable" onClick={handleImageClick}></img>
      <div className='item-info'></div>
      <div className='itemtitle'>{item.title}</div>
      <div className='itemdesc'>{item.desc}</div>
      <div className='itemprice'>{item.price}</div>
      <div className='item-actions'>
        <div className={cartButtonClasses} onClick = {handleCartClick}>{cartButtonText}</div>
        <div className={buyButtonClasses} onClick = {handleBuyClick}>{buyButtonText}</div>
      </div>
    </div>
  );
}

function CartCount({count}) {
  if (count === 0) {
    return null;
  }

  return (
    <div className = 'cart-count'>
      {count}
    </div>
  )
}

function CardNumber({isInput, value, onChange, cardData}) {
    if (isInput) {
        const cleanValue = value.replace(/[^0-9]/g, ''); 
        
        let maskedAndFormattedValue = '';
        const maxLength = 16;
        
        for (let i = 0; i < cleanValue.length && i < maxLength; i++) {
            const digit = cleanValue[i];
            
            if (i < 8) {
                maskedAndFormattedValue += digit;
            } else {
                maskedAndFormattedValue += '*';
            }

            if ((i + 1) % 4 === 0 && i !== cleanValue.length - 1 && i < maxLength - 1) {
                maskedAndFormattedValue += ' ';
            }
        }

        return (
            <p>
                <label>카드 번호:</label> 
                <input 
                    type="text" 
                    placeholder="**** **** **** ****" 
                    value={maskedAndFormattedValue}
                    onChange={onChange}
                    maxLength={19}
                />
            </p>
        );
    }

    const fullNumber = cardData.number || '';
    const cleanNumber = fullNumber.replace(/[^0-9]/g, ''); 
    
    const visiblePart = cleanNumber.slice(0, 8);
    const maskedPart = '********'; 
    
    let displayPart = '';
    const combined = visiblePart + maskedPart;

    for (let i = 0; i < combined.length; i++) {
        displayPart += combined[i];
        if ((i + 1) % 4 === 0 && i !== combined.length - 1) {
            displayPart += ' ';
        }
    }

    return <p>카드 번호: {displayPart}</p>;
}

function CardDate({isInput, value, onChange, cardData}) {
  if (isInput) {
       return <p><label>유효 기간: </label> <input type="text" placeholder="MM/YY" value={value} onChange={onChange} /></p>;
    }
  const displayDate = cardData.date || '01/01';
  return <p>유효 기간: {displayDate}</p>;
}

function CardUsername({isInput, value, onChange, cardData}) {
  if (isInput) {
        return <p><label>소유자 이름: </label> <input type="text" placeholder="KIM YOO JEO" value={value} onChange={onChange} /></p>;
  }
  const displayName = cardData.username || 'KIM YOO JEO';
  return <p>소유자 이름: {displayName}</p>;
}

function CardCVC({ isInput, value, onChange, cardData }) {
  if (isInput) {
    return (
      <p>
        <label>CVC/보안 코드: </label> 
        <input 
          type="password" 
          placeholder="***" 
          value={value} 
          onChange={onChange} 
          maxLength="3"
        />
      </p>
    );
  }
  return <p>CVC/보안 코드: ***</p>;
}

function CardPW({ isInput, value, onChange, cardData }) {
  if (isInput) {
    return (
      <p>
        <label>카드 비밀번호 앞 두자리: </label> 
        <input 
          type="password"
          placeholder="****" 
          value={value} 
          onChange={onChange}
          maxLength="2"
        />
      </p>
    );
  }
  return <p>카드 비밀번호: **</p>;
}

function Card({cardData, isInput, isSelected}) {
  const data = cardData || { 
    number: '', 
    date: '01/01', 
    username: 'KIM YOO JEO', 
    cvc: '***', 
    pw: '****' 
  };

  const cardClasses = `cardinfo ${isSelected ? 'selected-card': ''}`;

  return (
  <div className = {cardClasses}>
  <CardNumber cardData={data} />
  <CardDate cardData={data} />
  <CardUsername cardData={data} />
  {isInput && <CardCVC cardData={data} isInput={isInput} />} 
  {isInput && <CardPW cardData={data} isInput={isInput} />}
  </div>
)
}

function CheckoutPage({onGoBack, onRegister, onPaymentComplete, registeredCards}) {
  const [stage, setStage] = useState('selection');
  const [selectedCardId, setSelectedCardId] = useState(null);
  const cartTotal = useRecoilValue(cartTotalSelector);

  const cartItems = useRecoilValue(cartState);
  const totalItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [newCard, setNewCard] = useState( {
    number: '',
    date: '',
    username: '',
    cvc: '',
    pw: ''
  });

  const handleCardSelect = (cardId) => {
    setSelectedCardId(cardId);
  }

  const handleAddCardClick = () => {
    setStage('add');
  };

  const handleGoBack = () => {
    setStage('selection');
  }

  const handleInputChange = (field, value) => {
    if(field === 'number') {
      const cleanNumber = value.replace(/[^0-9]/g, '');
      const trimmedNumber = cleanNumber.slice(0, 16);

      setNewCard(prev => ({
        ...prev,
        [field]: trimmedNumber
      }));
    }
    else {
      setNewCard(prev => ({
      ...prev,
      [field]: value
    }));
    }
  };

  const handleCardRegistration = () => {
    onRegister(newCard);
    setNewCard({number: '', date:'', username:'', cvc:'', pw:''})
    setStage('selection');
  }

  const handlePaymentClick = () => {
    if (selectedCardId) {
      onPaymentComplete();
    }
    else {
      alert('결제할 카드를 선택해주세요.');
    }
  }

  if (stage === 'selection') {
    const hasCards = registeredCards.length > 0;
    return (
      <div className='checkout-page-container'>
        <h2>결제 수단 선택</h2>
        <div className='page-actions'>
          <button className='back-button' onClick={onGoBack}>← 장바구니로 돌아가기</button>
        </div>
        
        <div className = 'cart-summary checkout-summary'>
          <div className='total-price total-items-count'> 
            <span>총 상품 개수:</span>
            <span>{totalItemCount}개</span>
          </div>
          <div className='total-price final-total'>
            <span>총 결제금액:</span>
            <span>{cartTotal.finalTotal.toLocaleString()}원</span>
          </div>
        </div>
        
        <div className='card-list-container'>
          {!hasCards && ( 
            <div className='card-selection-text'>
            새로운 카드를 등록해주세요.
            </div>
          )}

          {registeredCards.map((card) => (
            <div
              key = {card.id}
              className='existing-card'
              onClick={() => handleCardSelect(card.id)}
            >
             <Card
              cardData = {card}
              isSelected={card.id === selectedCardId}
              />
            </div>
          ))}
        <div className='add-new-card-button' onClick={handleAddCardClick}>
          + 새 카드 추가
        </div>
      </div>

      <button
        className='pay-button'
        disabled={!hasCards || !selectedCardId}
        onClick={handlePaymentClick}
      >
        {hasCards && selectedCardId ? `${cartTotal.finalTotal.toLocaleString()}원 결제하기` : '카드 선택 후 결제 가능'}
      </button>
      </div>
      );
    }

  if (stage === 'add') {
    return (
      <div className='checkout-page-container'>
        <button className='back-button' onClick={handleGoBack}>← 카드 선택으로</button>
          
          <h2>새 카드 등록</h2>

          <div className='card-info-input'>
            <CardNumber 
              isInput={true}
              value={newCard.number}
              onChange={(e) => handleInputChange('number', e.target.value)}
            />
            <CardDate 
              isInput={true} 
              value={newCard.date} 
              onChange={(e) => handleInputChange('date', e.target.value)} 
            />
            <CardUsername 
              isInput={true} 
              value={newCard.username} 
              onChange={(e) => handleInputChange('username', e.target.value)} 
            />
            <CardCVC 
              isInput={true} 
              value={newCard.cvc} 
              onChange={(e) => handleInputChange('cvc', e.target.value)} 
            />
            <CardPW 
              isInput={true} 
              value={newCard.pw} 
              onChange={(e) => handleInputChange('pw', e.target.value)} 
            />
          </div>

          <button className='pay-button' onClick={handleCardRegistration}>카드 등록하기</button>
        </div>
    );
  }
}

function CartItem({item, cartActions}) {
  const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ''));

  const imageSrc = process.env.PUBLIC_URL + item.img;

  const handleIncrease = () => cartActions.updateQuantity(item.id, 1);
  const handleDecrease = () => cartActions.updateQuantity(item.id, -1);
  const handleRemove = () => cartActions.RemoveItem(item.id);

  return (
    <div className='cart-item'>
      <img src={imageSrc} alt={item.title} className='cart-item-img' />
      <div className='cart-item-info'>
        <div className='cart-item-title'>{item.title}</div>
        <div className='cart-item-price'>{item.price}</div>
        <div className='cart-item-quantity-control'>
          <button className='quantity-button' onClick={handleDecrease}>-</button>
          <span className='quantity-display'>{item.quantity}</span>
          <button className='quantity-button' onClick={handleIncrease}>+</button>
          <button className='remove-button' onClick={handleRemove}>X 삭제</button>
        </div>
        <div className='cart-item-subtotal'>
          소계: {(numericPrice * item.quantity).toLocaleString()}원
        </div>
      </div>
    </div>
  );
}

function CartPage({onGoHome, cartActions, onCheckout}) {
  const cartItems = useRecoilValue(cartState);
  const {totalPrice, shippingFee, finalTotal} = useRecoilValue(cartTotalSelector);

  return (
    <div className='cart-page-container'> 
      <h2>🛒 장바구니</h2>
      
      {/* 장바구니가 비어있을 때 */}
      {cartItems.length === 0 ? (
        <div className='empty-cart-container'>
            <p className='empty-cart'>장바구니가 비어있습니다. 상품을 담아주세요.</p>
            <button onClick={onGoHome} className='go-home-button'>← 쇼핑 계속하기</button>
        </div>
      ) : (
        // 장바구니 항목이 있을 때
        <div className='cart-list'>
            <div className='cart-items-list'>
                {cartItems.map(item => (
                    // CartItem 컴포넌트를 사용
                    <CartItem 
                        key={item.id} 
                        item={item} 
                        cartActions={cartActions} 
                    />
                ))}
            </div>

            <div className='cart-summary'>
                <div className='total-price price-detail'>
                    <span>상품 총액:</span>
                    <span>{totalPrice.toLocaleString()}원</span>
                </div>

                {shippingFee > 0 && (
                  <div className='total-price price-detail shipping-fee'>
                    <span>배송비:</span>
                    <span>{shippingFee.toLocaleString()}원</span>
                </div>
                )}

                <hr className='summary-divider' />
                
                <div className='total-price final-total'>
                  <span>총 결제 금액:</span>
                  <span>{finalTotal.toLocaleString()}원</span>
                </div>
            </div>

            <div className='cart-actions'>
                <button onClick={onGoHome} className='go-home-button'>← 쇼핑 계속하기</button>
                <button onClick={onCheckout} className='checkout-button'>
                    {finalTotal.toLocaleString()}원 결제하기
                </button>
            </div>
        </div>
      )}
    </div>
  )
}

function useCartActions() {
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useRecoilState(cartState);

  // 수량 변경(+-1)
  const updateQuantity = (id, change) => {
        setCart(prevCart => {
            const newCart = prevCart.map(item => {
                if (item.id === id) {
                    const newQuantity = item.quantity + change;
                    // 수량이 0이하가 되면 해당 항목을 제거
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            }).filter(Boolean); // 수량이 0이 된 항목 제거
            return newCart;
        });
    };

    // 항목 완전 삭제
    const RemoveItem = (id) => {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    return {updateQuantity, RemoveItem};
}

function ProductsView({onBuyClick}) {
  const productsLoadable = useRecoilValueLoadable(productsSelector);

  if (productsLoadable.state === 'loading') {
        // 로딩 상태: 즉시 로딩 메시지 반환
        return <div className='loading-state'>상품 목록을 불러오는 중입니다... 🏃</div>;
    }

    if (productsLoadable.state === 'hasError') {
        // 에러 상태: 에러 메시지 반환
        console.error("상품 로딩 실패:", productsLoadable.contents);
        return <div className='error-state'>🚨 상품 데이터를 불러오는 데 실패했습니다. 서버 상태를 확인해주세요.</div>;
    }

    // 성공 상태 (hasValue)
    const products = productsLoadable.contents; // 로드 된 데이터
    
  return (
    <div className='page'>
      <ItemStatus totalItems={products.length} />
      {products.map((item) => (
        <ItemBox key = {item.id} item = {item} onBuyClick={onBuyClick} />
      ))}
    </div>
  )
}

function ItemDetailView({cartActions, onGoHome}) {
  const {id} = useParams();
  const productsLoadable = useRecoilValueLoadable(productsSelector);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useRecoilState(cartState);

  if (productsLoadable.state === 'loading') {
    return <div className='loading-state'>상품 정보를 불러오는 중입니다...</div>;
  }

  if (productsLoadable.state === 'hasError') {
    return <div className='error-state'>🚨 상품 데이터를 불러오는 데 실패했습니다.</div>;
  }

  const products = productsLoadable.contents;
  const item = products.find(p => p.id === id);

  if (!item) {
    return <div className='error-state'>존재하지 않는 상품입니다.</div>;
  }

  const relatedProducts = products.filter(
    p =>item.brand && p.brand === item.brand && p.id !== item.id
  );

  const imageSrc = process.env.PUBLIC_URL + item.img;
  const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ''));
  const currentCartItem = cart.find(cartItem => cartItem.id === item.id);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (currentCartItem) {
        cartActions.updateQuantity(item.id, quantity);
    } 
    else {
        setCart(prevCart => [...prevCart, { id: item.id, quantity: quantity, ...item }]);
    }
    alert(`${item.title} ${quantity}개를 장바구니에 담았습니다.`);
    setQuantity(1);
  };

  const handleRelatedItemClick = (relatedId) => {
      navigate(`/detail/${relatedId}`);
  };

  return (
    <div className='detail-page-container'>
      <button className='back-button' onClick={onGoHome}>← 상품 목록으로</button>

      <div className='detail-main-content'>
        <img src={imageSrc} alt = {item.title} className='detail-img' />

        <div className='detail-info-box'>
          <h2 className='detail-title'>{item.title}</h2>
          <p className='detail-desc'>{item.desc}</p>
          <p className='detail-price'>{item.price}</p>
          <p className='detail-subtext'>총 상품 금액: {(numericPrice * quantity).toLocaleString()}원</p>

          <div className='detail-quantity-control'>
            <label>구매 수량:</label>
            <button className='quantity-button' onClick={() => handleQuantityChange(-1)} disabled= {quantity <= 1}>-</button>
            <span className='quantity-display'>{quantity}</span>
            <button className='quantity-button' onClick={() => handleQuantityChange(1)}>+</button>
          </div>

          <button className='add-to-cart-button' onClick={handleAddToCart}>
            🛒 장바구니에 담기
          </button>
        </div>
      </div>

      <div className='related-products-section'>
        <h3 className='related-title'>관련 상품({item.brand})</h3>
        <div className='related-list'>
          {relatedProducts.length > 0 ? (
            relatedProducts.map(relatedItem => (
              <div
                key = {relatedItem.id}
                className = 'related-item'
                onClick={() => handleRelatedItemClick(relatedItem.id)}
              >
                <img src={process.env.PUBLIC_URL + relatedItem.img} alt={relatedItem.title} className='related-item-img' />
                <div className='related-item-title'>{relatedItem.title}</div>
              </div>
              ))
            ) : (
              <p>같은 브랜드의 다른 상품이 없습니다.</p>
            )}
        </div>
      </div>

    </div>
  );
}

function PaymentCompletePage({onGoHome}) {
  return (
    <div className='payment-complete-page-container'>
      <div className='success-message'>
        <h2> 결제가 완료되었습니다!🥳</h2>
        <p>구매해주셔서 감사합니다. 곧 상품이 배송될 예정입니다.</p>
      </div>
      <button className='go-home-button' onClick={onGoHome}>
        ← 홈으로 돌아가기
      </button>
    </div>
  );
}

function MainApp() {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useRecoilState(cartState); // 장바구니 비우기 위해
  const [registeredCards, setRegisteredCards] = useState([]); // 카드 목록은 App에서 관리
  
  const handleGoToCart = () => navigate('/cart');
  const handleGoToHome = () => navigate('/intern_in_meta');
  const handleGoToCheckout = () => navigate('/checkout');
  const handleGoToComplete = () => navigate('/complete');

  const allCartActions = useCartActions();

  const handleBuyButtonClick = () => {
    handleGoToCheckout();
  }

  const handleRegisterCard = (newCardInfo) => {
    setRegisteredCards([...registeredCards, {
      id: Date.now(),
      ...newCardInfo
    }]);
  }

  const handlePaymentComplete = () => {
    setCart([]); // 장바구니 비우기
    handleGoToComplete();
  }

  return (
    <div className="App">
      <Header onCartClick = {handleGoToCart}/>

      <Routes>
        <Route path = '/intern_in_meta' element = {
          <Suspense fallback = {<div>상품 목록을 불러오는 중...</div>}>
            <ProductsView onBuyClick={handleBuyButtonClick} />
          </Suspense>
        } />
        <Route path = '/detail/:id' element = {
          <Suspense fallback = {<div>상품 상세 정보를 불러오는 중...</div>}>
            <ItemDetailView
             cartActions={allCartActions}
             onGoHome={handleGoToHome}
             />
          </Suspense>
        } />
        <Route path = '/cart' element = {
          <CartPage
            cart = {cart}
            onGoHome={handleGoToHome}
            cartActions={allCartActions}
            onCheckout={handleGoToCheckout}
          />
        } />
        <Route path = '/checkout' element = {
          <CheckoutPage
            onGoBack = {handleGoToCart}
            onRegister={handleRegisterCard}
            onPaymentComplete={handlePaymentComplete}
            registeredCards={registeredCards}
          />
        } />
        <Route path = '/complete' element = {
          <PaymentCompletePage
            onGoHome={handleGoToHome}
          />
        } />
      </Routes>
    </div>
  );
}

function App () {
  return (
    <Router>
      <MainApp />
    </Router>
  )
}

export default App;
