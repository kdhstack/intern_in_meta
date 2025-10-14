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

function ItemBox({index, isClicked, onItemClick, imgSrc, title, desc, price}) {
  const handleClick = () => {
    onItemClick(index);
  }
  const buttonClasses = `buybutton ${isClicked ? 'clicked' : ''}`;
  const buttonText = isClicked ? '담음!' : '담기';

  return (
    <div className="item">
      <img src={imgSrc} alt={title} className="itemimg"></img>
      <div className='itemtitle'>{title}</div>
      <div className='itemdesc'>{desc}</div>
      <div className='itemprice'>{price}</div>
      <div className={buttonClasses} onClick = {handleClick}>{buttonText}</div>
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

function App() {
  const [itemsClicked, setItemsClicked] = useState([false, false, false, false, false, false])

  const handleItemClick = (index) => {
    setItemsClicked(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = !newItems[index];
      return newItems;
    });
  };
  const totalCount = itemsClicked.filter(isClicked => isClicked).length;

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

            imgSrc = {item.img}
            title = {item.title}
            desc = {item.desc}
            price = {item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
