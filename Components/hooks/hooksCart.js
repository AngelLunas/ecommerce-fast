import ProductCart from "Components/ProductCart";

const renderProducts = (products, dataCart, setTotalPrice, setCart, setDataOrders, dataOrders) => {
    const components = [];

    for (let [index, id] of dataCart.entries()) {
        const product = products.find((element) => element._id === id);
        if (product) {
            components.push(<ProductCart key={index} name={product.name} price={product.price} srcImg={product.srcImage} setTotalPrice={setTotalPrice} id={product._id} 
                setCart={setCart} dataCart={dataCart} setDataOrders={setDataOrders} dataOrders={dataOrders}/>)
        }
    }

    return components;
}

export {
    renderProducts
}