import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './Cart.css';
import { Children } from 'react';

const Cart = ({cart, handleClearCart, children}) => {
    // const cart = props.cart;     // option 1
    // const {cart} = props;        // option 2
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;

    for (const product of cart){
        // if(product.quantity === 0){
        //     product.quantity = 1;
        // }
        // product.quantity = product.quantity || 1;     // if product.quantity is 0 then it assign 1. (shortcut condition)

        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }
    const tax = (totalPrice * 7) / 100;
    
    const grandTotal = totalPrice + totalShipping + tax;

    return (
        <div className='cart'>
            <h4>Order summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)} </p>
            <h4>Grand Total: ${grandTotal.toFixed(2)} </h4>
            
            <button onClick={handleClearCart} className='btn-clear-cart'>
                <span>Clear Cart</span>
                <FontAwesomeIcon icon={faTrash} />
            </button>
            
            {children}
        </div>
    );
};

export default Cart;