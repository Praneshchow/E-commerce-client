import { useState } from 'react';
import './Shop.css';
import { useEffect } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);      // For API access. 
    const [cart, setCart] = useState([]);

    // Pagination. 
    const { totalProducts } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    // console.log(totalProducts);

    const pageNumbers = [...Array(totalPages).keys()];
    const options = [5, 10, 20];


    // // API data fetch. 
    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);


    // API data fetch. 
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, [currentPage, itemsPerPage]);



    // Local storage stored data. (we stored data using unique id)
    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                const savedCart = [];
                // step 1: get id
                for (const id in storedCart) {
                    // step 2: get the product by using id. 
                    const addedProduct = cartProducts.find(product => product._id === id);

                    if (addedProduct) {
                        // step 3: product show when product added. 
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        // step 4: add the added product to the saved cart. 
                        savedCart.push(addedProduct);
                    }
                }
                // step 5: set the cart. 
                setCart(savedCart);
            })

    }, [])           // products is now a dependency. when product changes the update value will show. 

    // cart item add. 
    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];
        let newCart = [];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);

        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id != product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id);
    }

    // Clear Cart. 
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }


    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }

    return (
        <>
            <div className='shop-container'>
                {/* product part */}
                <div className='products-container'>
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}></Product>)
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

            {/* Pagination */}
            <div className='pagination'>
                <p>Current Page: {currentPage} and Items per page: {itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number}</button>)
                }

                <select className='select' value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;
