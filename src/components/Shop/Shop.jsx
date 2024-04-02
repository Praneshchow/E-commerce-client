import { useState } from 'react';
import './Shop.css';
import { useEffect } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);     // For API access. 
    const [cart, setCart] = useState([]);

    // API data fetch. 
    useEffect(() => {
        fetch('products.json')
        .then(res=> res.json())
        .then(data => setProducts(data))
    }, []);

    // Local storage stored data. (we stored data using unique id)
    useEffect(() => {
        const storedCart = getShoppingCart(); 
        const savedCart = [];
        // step 1: get id
        for (const id in storedCart){
            // step 2: get the product by using id. 
            const addedProduct = products.find(product => product.id === id);
            
            if(addedProduct){
                // step 3: product show when product added. 
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart. 
                savedCart.push(addedProduct);
            }
        }
        // step 5: set the cart. 
        setCart(savedCart);
    }, [products])           // products is now a dependency. when product changes the update value will show. 

    // cart item add. 
    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];
        let newCart = [];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists){
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id != product.id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product.id);
    }

    // Clear Cart. 
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            {/* product part */}
            <div className='products-container'>
                {
                    products.map(product => <Product 
                        key={product.id} 
                        product={product}
                        handleAddToCart={handleAddToCart}></Product> )
                }
            </div>
            {/* cart part */}
            <div className='cart-container'>
                <Cart 
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;