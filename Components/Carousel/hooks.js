import Product from "Components/Product"

const renderProducts = (products, section) => {
    if (section === 'all') {
         return products.map((element, index) => <Product key={index} id={element._id} name={element.name} description={element.description} srcImg={element.srcImage} price={element.price} /> );
    } else {
        const filterData = products.filter((element) => element.category === section);
        return filterData.map((element, index) => <Product key={index} id={element._id} name={element.name} description={element.description} srcImg={element.srcImage} price={element.price} /> );
    }
}

export {
    renderProducts
}