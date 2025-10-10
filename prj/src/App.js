import logo from './logo.svg';
import './App.css';

import shoeImg from './assets/shoe1.png'; 

function Header() {
  return (
    <header>
      <h1>ShoeKing</h1>
      <nav>
        <div>
          장바구니
        </div>
      </nav>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <div className="item">
        test text
        <img src={shoeImg} alt="신발 이미지" className="itembox"></img> 
      </div>
    </div>
  );
}

export default App;
