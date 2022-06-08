import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';

import '../resources/item.css';

const Item = (props) => {

    const dispatch = useDispatch();

    function addToCart() {
        dispatch({ type: 'addToCart', payload: { ...props.item, quantity: 1 } });
    }

    return (
        <div className='item'>
            <h4 className='name'>{props.title}</h4>
            <img src={props.imageSrc} alt="" height='70' width='70' />
            <h4 className='price'><b>Price : </b>{props.price} $/-</h4>
            <div className='d-flex justify-content-end'>
                <Button onClick={() => addToCart()}>Add to Cart</Button>
            </div>
        </div>
    )
}

export default Item;