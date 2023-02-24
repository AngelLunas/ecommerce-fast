import React, { useContext, useEffect } from "react";
import Image from "next/image";
import styles from '@/styles/product.module.css';
import { DataContext } from "Components/Context";
import Link from "next/link";

const Product = (props) => {
    const { name, description, srcImg, price, id } = props;
    const { cart, setCart } = useContext(DataContext);

    return (
        <div className={styles.containerProduct}>
            <div className={styles.containerImg}>
                <Image src={`/${srcImg}`} width={120} height={120} alt={name} style={{objectFit: 'contain'}}/>
            </div>
            <div>
                <span className={styles.name}>
                    {name}
                </span>
            </div>
            <p className={styles.description}>
                {description}
            </p>
            <span className={styles.price}>
                { `$${price}`}
            </span>
            <div className={styles.containerBtns}>
                <button className={styles.btnCart} onClick={() => cart.includes(id) === false ? setCart((prev) => [...prev, id]) : null}>
                    Añadir al carrito
                </button>
                <Link href='/cart' onClick={() => cart.includes(id) === false ? setCart((prev) => [...prev, id]) : null} className={styles.btnBuy}>
                    <span>
                        Comprar
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Product;