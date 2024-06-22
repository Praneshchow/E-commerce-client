import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadedProducts = await fetch('http://localhost:5000/products');
    const products = await loadedProducts.json();

    // if cart data is in database, you have to use async await. 

    const storedCart = getShoppingCart();
    // console.log(typeof(storedCart))          // object. 
    const savedCart = [];

    for (const id in storedCart){
        const addedProduct = products.find(pd => pd._id === id);      // find() function used for finding specific one. 
        
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }

    return savedCart;        
    
    // if you need to send two things. 
    // return [products, savedCart]             // return as Array. 
    // return {products, savedCart};            // return as Object. 
}

export default cartProductsLoader;
