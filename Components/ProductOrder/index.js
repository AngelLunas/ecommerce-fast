import React from "react";
import Image from "next/image";
import styles from '@/styles/order.module.css';

const ProductOrder = ({name, quantity, price, srcImg, extend}) => {
    if (!extend) {
        return (
            <div className={styles.container}>
                <div className={styles.dataProduct}>
                    <span className={styles.title} >
                        {name}
                    </span>
                    <span className={styles.title}>
                        cantidad: {quantity}
                    </span>
                    <span className={styles.title}>
                        ${price}
                    </span>
                </div>
                <div>
                    <Image src={`/${srcImg}`} width={50} height={50} alt={name}/>
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.dataProduct}>
                    <span className={styles.title} >
                        {name}
                    </span>
                    <span className={styles.title}>
                        cantidad: {quantity}
                    </span>
                    <span className={styles.title}>
                        { extend.name }
                    </span>
                    <a className={styles.title} href={`mailto:${extend.email}`}>
                        { extend.email }
                    </a>
                    <span className={styles.title}>
                        { extend.addres }
                    </span>
                    <span className={styles.title}>
                        { extend.number }
                    </span>
                    <span className={styles.title}>
                        ${price}
                    </span>
                </div>
                <div>
                    <Image src={`/${srcImg}`} width={50} height={50} alt={name}/>
                </div>
            </div>
        )
    }
}

export default ProductOrder;