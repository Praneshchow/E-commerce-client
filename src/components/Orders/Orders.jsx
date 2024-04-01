import { useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart'
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { useState } from 'react';
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);
    // console.log(cart);

    // for removing item from cart using id. 
    const handleRemoveFromCart = (id) => {
        // console.log(id);
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

    return (
        <div className="shop-container">
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem
                        key = {product.id}
                        product = {product}
                        handleRemoveFromCart = {handleRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
            <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;