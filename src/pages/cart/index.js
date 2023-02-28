import { DataContext } from "Components/Context";
import React, { useContext, useEffect, useState } from "react";
import styles from '@/styles/cart.module.css'
import Router from "next/router";
import { renderProducts } from "../../../Components/hooks/hooksCart";
import Head from "next/head";
import useSWR from 'swr';
import Load from "Components/Load";
import { Oval } from "react-loading-icons";

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
    const [loading, setLoading] = useState(false);
    const [dataAuth, setDataAuth] = useState(false);

    const { data, error } = useSWR('/api/products/', fetcher);
    if (error) return <div>Ha ocurrido un error</div>

    const priceAndGetEmail = async () => {
        if (data && Data.cart) {
            let total = 0;
            const newDataOrders = [];
            for (let id of Data.cart) {
                const product = data.find((element) => element._id === id);
                if (product) {
                    total = total + product.price;
                    newDataOrders.push({product: product._id, quantity: 1}); 
                }
            }
            setTotalPrice(total);
            setDataOrders(newDataOrders);

            const response = await fetch('/api/auth/user/email');
            if (response.status === 200) {
                const dataResponse = await response.json();
                setDataAuth(dataResponse);
                setDataUser({...dataUser, email: dataResponse.email});
                return;
            }
        }
    }

    useEffect(() => {
         priceAndGetEmail();
    }, [data, Data.cart]);

    useEffect(() => {
        if (Data.cart.length === 0) {
            Router.push('/');
        }
    }, [Data.cart]);

    if (!data) return <Load></Load>

    const handleChange = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
            setLoading(false);
            return;
        }
        const data = await fetch(`/api/order`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const dataJson = await data.json();
        setLoading(false);
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
                        { dataAuth ? 
                        <div className={styles.input}>
                            { dataAuth.email }
                        </div>
                        :  
                        <input type='text' placeholder="Tú correo electrónico" className={styles.input} name='email' onChange={handleChange} style={errors.includes('email') ? {border: '1px solid red'} : null}></input>
                         }
                        <input type='number' placeholder="Tú número" className={styles.input} name='number' onChange={handleChange} style={errors.includes('number') ? {border: '1px solid red'} : null}></input>
                        <input type="text" placeholder="Tú dirección" className={styles.input} name='addres' onChange={handleChange} style={errors.includes('addres') ? {border: '1px solid red'} : null}></input>
                        <button className={styles.btnBuy}>{loading ? <Oval width={25} height={25}/> : 'Ordenar'}</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Cart;