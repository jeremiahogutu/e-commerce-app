export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !==  'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        });

        // remove duplicates
        // build an array from new Set and turn it back into array using Array.from
        // so that later we can remap it
        // new set will only show unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll be ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return actual from the cart
        
        cart = Array.from(new Set(cart.map((product) => (product._id)))).map(id => {
            return cart.find(product => product._id === id)
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};

export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0;
};

export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return [];
};