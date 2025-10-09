import logo from './logo.svg';
import './App.css';

import shoeImg from './assets/shoe1.png'; 

function App() {
  return (
    <div className="App">
      <div className="item">
        <img src={shoeImg} alt="신발 이미지" className="itembox"></img> 
      </div>
    </div>
  );
}

export default App;
