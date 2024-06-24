import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    // if cart data is in database, you have to use async wait. 
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    console.log(ids);


    const loadedProducts = await fetch('https://e-commerce-server-rouge.vercel.app/productsByIds', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    });
    const products = await loadedProducts.json();

    // if cart data is in database, you have to use async await. 

    
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
