import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from '@/styles/productCart.module.css';

const ProductCart = ({name, price, srcImg, id, setTotalPrice, setCart, dataCart, setDataOrders, dataOrders}) => {
    const [quantity, setQuantity] = useState(1);
    const [action, setAction] = useState(null);

    useEffect(() => {
        if (action === 'add') {
            setTotalPrice((prev) => prev + price);
        } else if (action === 'lest') {
            setTotalPrice((prev) => prev - price);
        }
    }, [quantity]);

    useEffect(() => {
        if (dataOrders.length >= 0) {
            const newOrders = dataOrders.slice();
            const indexProduct = newOrders.findIndex((element) => element.product === id);
            if (indexProduct >= 0) {
                newOrders[indexProduct].quantity = quantity;
                setDataOrders(newOrders);
                console.log(newOrders);
            }
        }
    }, [quantity]);

    const setStates = (action, number) => {
        setAction(action);
        setQuantity(number)
    }

    const deleteProduct = () => {
        const newCart = dataCart.filter((element) => element !== id); 
        setCart(newCart);
    }

    return (
        <div className={styles.containerCart}>  
            <div>
                <span className={styles.text}>
                    { name }
                </span>
                <div>
                    <button className={styles.btn} onClick={() => quantity > 1 ?  setStates('lest',  quantity - 1) : null}>
                        -
                    </button>
                    <span className={styles.text}>
                        { quantity }
                    </span>
                    <button className={styles.btn} onClick={() => setStates('add', quantity + 1) }>
                        +
                    </button>
                </div>
                <div className={styles.lastContainer}>
                    <span className={styles.text}>{ `$${price * quantity}` }</span>
                    <button className={styles.btnDelete} onClick={() => deleteProduct()}>
                        Eliminar
                    </button>
                </div>
            </div>
            <div>
                <Image src={`/${srcImg}`} alt={name} height={50} width={50}/>
            </div>
        </div>
    )
}

export default ProductCart