import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>메인 페이지</h1>
            <Link to = "/cart">장바구니로 이동</Link>
        </div>
    );
}

export default Home;