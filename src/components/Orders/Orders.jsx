import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart'
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { useState } from 'react';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);
    // console.log(cart);

    // for removing item from cart using id. 
    const handleRemoveFromCart = (id) => {
        // console.log("Removing product id: ", id);

        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className="shop-container">
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem
                        key = {product._id}
                        product = {product}
                        handleRemoveFromCart = {handleRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
            <Cart 
                cart={cart}
                handleClearCart={handleClearCart}
            >
                <Link className='proceed-link' to="/checkout">
                    <button className='btn-proceed'>Proceed Checkout</button>
                </Link>
            </Cart>
            </div>
        </div>
    );
};

export default Orders;