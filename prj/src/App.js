import logo from './logo.svg';
import './App.css';

import shoeImg from './assets/shoe1.png';
import cartImg from './assets/cart.png';

import React, {useState} from 'react';

const ITEM_TEMPLATES = [
  {
    id: 's1',
    img: shoeImg,
    title: '브랜드A',
    desc: '편안하고 착용감이 좋은 신발',
    price: '35,000원'
  },
  {
    id: 's2',
    img: shoeImg,
    title: '브랜드A',
    desc: '힙한 컬러가 매력적인 신발',
    price: '25,000원'
  },
  {
    id: 's3',
    img: shoeImg,
    title: '브랜드B',
    desc: '편안하고 착용감이 좋은 신발',
    price: '35,000원'
  },
  {
    id: 's4',
    img: shoeImg,
    title: '브랜드B',
    desc: '힙한 컬러가 매력적인 신발',
    price: '35,000원'
  },
  {
    id: 's5',
    img: shoeImg,
    title: '브랜드C',
    desc: '편안하고 착용감이 좋은 신발',
    price: '35,000원'
  },
  {
    id: 's6',
    img: shoeImg,
    title: '브랜드C',
    desc: '힙한 컬러가 매력적인 신발',
    price: '35,000원'
  }
];

function Header({totalCount}) {
  return (
    <header className='header'>
      <h1 className='headerText'>Shooking</h1>
      <nav>
        <img src={cartImg} alt='장바구니' className='cart'></img>
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

function ItemBox({index, isClicked, onItemClick, onBuyClick, imgSrc, title, desc, price}) {
  const handleCartClick = () => {
    onItemClick(index);
  }
  const cartButtonClasses = `cartbutton ${isClicked ? 'clicked' : ''}`;
  const cartButtonText = isClicked ? '담음!' : '담기';

  const handleBuyClick = () => {
    if (onBuyClick) {
      onBuyClick();
    }
  };

  const buyButtonClasses = 'buybutton';
  const buyButtonText = '구매';

  return (
    <div className="item">
      <img src={imgSrc} alt={title} className="itemimg"></img>
      <div className='itemtitle'>{title}</div>
      <div className='itemdesc'>{desc}</div>
      <div className='itemprice'>{price}</div>
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

function CardModal({onClose, cards, onRegister}) {
  const [stage, setStage] = useState('selection');
  
  const [selectedCardId, setSelectedCardId] = useState(null);

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

  if (stage === 'selection') {
    const hasCards = cards.length > 0;
    return (
      <div className='modal-backdrop'>
        <div className='card-modal'>
          <button className='close-button' onClick={onClose}>X</button>
          <h2>결제 수단 선택</h2>
          
          {!hasCards && ( 
          <div className='card-selection-text'>
           새로운 카드를 등록해주세요.
           </div>
          )}

   <div className='card-list-container'>
 {cards.map((card, index) => (
  <div 
  key={card.id} 
  className='existing-card'
  onClick={() => handleCardSelect(card.id)}
  >
  <Card 
   cardData={card} 
   isSelected={card.id === selectedCardId}
   /> 
  </div>
  ))}

  <div className='add-new-card-button' onClick={handleAddCardClick}>
  +
  </div>
  </div>

 <button className='pay-button' disabled={!hasCards || !selectedCardId}> 
  {hasCards && selectedCardId ? '선택된 카드로 결제하기' : '카드 선택 후 결제 가능'}
  </button>
  </div>
  </div>
    );
  }

  if (stage === 'add') {
    return (
      <div className='modal-backdrop'>
        <div className='card-modal'>
          <button className='back-button' onClick={handleGoBack}>← 뒤로</button>
          <button className='close-button' onClick={onClose}>X</button> 
          
          <h2>새 카드 추가</h2>

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
      </div>
    );
  }
}

function App() {
  const [itemsClicked, setItemsClicked] = useState([false, false, false, false, false, false])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [registeredCards, setRegisteredCards] = useState([])

  const handleItemClick = (index) => {
    setItemsClicked(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = !newItems[index];
      return newItems;
    });
  };
  const totalCount = itemsClicked.filter(isClicked => isClicked).length;

  const handleBuyButtonClick = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleRegisterCard = (newCardInfo) => {
    setRegisteredCards([...registeredCards, {
      id: Date.now(),
      ...newCardInfo
  }]);
  }

  return (
    <div className="App">
      <Header totalCount = {totalCount}/>

      <div className='page'>
        <ItemStatus totalItems = {ITEM_TEMPLATES.length}/>
        {ITEM_TEMPLATES.map((item, index) => (
          <ItemBox 
            key = {item.id}
            index = {index}
            isClicked = {itemsClicked[index]}
            onItemClick = {handleItemClick}
            onBuyClick = {handleBuyButtonClick}

            imgSrc = {item.img}
            title = {item.title}
            desc = {item.desc}
            price = {item.price}
          />
        ))}
      </div>

      {isModalOpen && (
        <CardModal 
        onClose={handleCloseModal}
        cards = {registeredCards} 
        onRegister={handleRegisterCard}
        />
      )}
    </div>
  );
}

export default App;
