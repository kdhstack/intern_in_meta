import React from 'react';

function CardNumberInput(props) {
    const {value, onChange} = props;
    
    return (
        <input
            type = "text"
            placeholder = "카드 번호를 입력하세요"
            value = {value}
            onChange={onChange}
        />
    );
}

export default CardNumberInput;