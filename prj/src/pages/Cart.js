import React from 'react';
import { Link } from 'react-router-dom';

function Cart() {
    return (
        <div>
            <h1>장바구니</h1>
            <Link to ="/">메인 페이지로 돌아가기</Link>
        </div>
    );
}