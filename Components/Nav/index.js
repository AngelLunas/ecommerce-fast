import React, { useContext } from "react";
import styles from '@/styles/nav.module.css';
import Image from "next/image";
import Link from 'next/link'
import { DataContext } from "Components/Context";

const Nav = ({other = false}) => {
    const { section, setSection, cart } = useContext(DataContext);
    console.log(cart);
    return(
        <div className={styles.navContainer}>
            <div className={styles.nav}>
                <Link href='/' className={styles.navLink}>
                    <span className={styles.titleNav}>
                        Fast Buy
                    </span>
                </Link>
                <div className={styles.categorys}>
                    {other === false ? 
                    <>
                    <span className={styles.section} onClick={() => setSection('hogar')} style={section === 'hogar' ? {color: '#89431C'} : null}>
                        Hogar
                    </span>
                    <span className={styles.section} onClick={() => setSection('belleza')} style={section === 'belleza' ? {color: '#89431C'} : null}>
                        Belleza
                    </span>
                    <span className={styles.section} onClick={() => setSection('all')} style={section === 'all' ? {color: '#89431C'} : null}>
                        Todos
                    </span>
                    </> 
                    : null}
                    <Link href='/cart' >
                    <div className={styles.containerCart}>
                        <Image src='/cart.png' height={30} width={30} alt='shopping cart' className={styles.cart}/>
                        <span className={styles.elementsCart}>
                            { cart.length }
                        </span>
                    </div>
                    </Link>
                    <Link href='/cuenta'>
                    <Image src='/account.png' height={30} width={30} alt='account' className={styles.account} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Nav;