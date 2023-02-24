import { DataContext } from "Components/Context";
import React, { useContext, useEffect, useState } from "react";
import styles from '@/styles/cart.module.css'
import Router from "next/router";
import { renderProducts } from "../../../Components/hooks/hooksCart";
import Head from "next/head";
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

const Cart = () => {
    const Data = useContext(DataContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orders, setDataOrders] = useState([]);
    const [dataUser, setDataUser] = useState({
        name: '',
        email: '', 
        addres: '',
        number: ''
    });
    const [errors, setErrors] = useState([]);

    const { data, error } = useSWR('/api/products/', fetcher);
    if (!data) return <div>Loading...</div>
    if (error) return <div>Ha ocurrido un error</div>

    useEffect(() => {
        let total = 0;
        const newDataOrders = [];
        for (let id of Data.cart) {
            const product = data.find((element) => element._id === id);
            if (product) {
                total = total + product.price;
                newDataOrders.push({id: product._id, quantity: 1}); 
            }
        }
        setTotalPrice(total);
        setDataOrders(newDataOrders);
    }, [data, Data.cart]);

    useEffect(() => {
        if (Data.cart.length === 0) {
            Router.push('/');
        }
    }, [Data.cart])

    const handleChange = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const body = {...dataUser, order: orders};
        const formErrors = [];
        if (dataUser.name.length <= 1) {
            formErrors.push('name');
        };
        if (dataUser.email.length <= 1) {
            formErrors.push('email');
        };
        if (dataUser.addres.length <= 1) {
            formErrors.push('addres');
        };
        if (dataUser.number.length <= 1) {
            formErrors.push('number');
        };
        if (formErrors.length >= 1) {
            setErrors(formErrors);
            return;
        }
        console.log(body);
        const data = await fetch(`${process.env.APIpath}/api/order`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const dataJson = await data.json();

        if (data.status === 201) {
            localStorage.removeItem('cart');
            Router.push('/gracias');
        } 
    }

    return (
        <>
        <Head>
            <title>Carrito de compras</title>
        </Head>
        <div className={styles.cartPage}>
            <div className={styles.containerActions}>
                <div className={styles.products}>
                    <span className={styles.title}>
                        Resumen de tu orden
                    </span>
                    <div>
                        { renderProducts(data, Data.cart, setTotalPrice, Data.setCart, setDataOrders, orders) }
                    </div>
                    <div>
                        <span className={styles.total}>{ `Total: $${totalPrice}` }</span>
                    </div>
                </div>
                <div className={styles.formCart}>
                    <span className={styles.title}>
                        Completa el formulario
                    </span>
                    <form className={styles.containerForm} onSubmit={onSubmit}>
                        <input type="text" placeholder="Tú nombre" className={styles.input} name="name" onChange={handleChange} style={errors.includes('name') ? {border: '1px solid red'} : null}></input>
                        <input type='text' placeholder="Tü correo electrónico" className={styles.input} name='email' onChange={handleChange} style={errors.includes('email') ? {border: '1px solid red'} : null}></input>
                        <input type='number' placeholder="Tú número" className={styles.input} name='number' onChange={handleChange} style={errors.includes('number') ? {border: '1px solid red'} : null}></input>
                        <input type="text" placeholder="Tú dirección" className={styles.input} name='addres' onChange={handleChange} style={errors.includes('addres') ? {border: '1px solid red'} : null}></input>
                        <input type="submit" className={styles.btnBuy} value='Comprar'></input>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Cart;