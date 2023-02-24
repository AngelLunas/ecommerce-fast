import React, { useContext, useEffect } from "react";
import styles from '@/styles/Thanks.module.css';
import Link from "next/link";
import { DataContext } from "Components/Context";
import Head from "next/head";

const Thanks = () => {
    const { setCart } = useContext(DataContext);
    useEffect(() => {
        setCart([]);
    }, []);

    return (
        <>
        <Head>
            <title>Gracias!</title>
        </Head>
        <div className={styles.container}>
            <div className={styles.containerThanks}>
                <h2 className={styles.title}>
                    Gracias por tu compra!
                </h2>
                <p className={styles.description}>
                    Agradecemos enormemente tú compra.
                    Ya guardamos tu orden, y pronto despacharemos e enviaremos tú pedido.
                    Te avisaremos cuando tu pedido este por llegar. Gracias!
                </p>
                <Link href='/' className={styles.btnBack}>  
                    Volver a inicio
                </Link>
            </div>
        </div>
        </>
    )
}

export default Thanks;