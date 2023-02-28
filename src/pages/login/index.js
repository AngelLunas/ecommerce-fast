import React, { useState } from "react";
import styles from '@/styles/login.module.css';
import Head from "next/head";
import Nav from "Components/Nav";
import Router from "next/router";
import { Oval } from 'react-loading-icons'

const Login = () => {
    const [dataUser, setDataUser] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (loading === false) {
            setLoading(true);
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(dataUser),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            
            if (response.status !== 200) {
                const data = await response.json();
                setLoading(false);
                setErrors(data.msg);
                return;
            };

            setLoading(false);
            Router.push('/');
        }
    }

    return (
        <>
        <Head>
            <title>
                Login
            </title>
        </Head>
        <div className={styles.containerLogin}>
            <Nav other/>
            <div className={styles.container}>
                <span className={styles.title}>
                    Iniciar sesión
                </span>
                <form className={styles.form} onSubmit={onSubmit}>
                    <input type="email" placeholder="Correo electrónico" name="email" className={styles.input} onChange={onChange} style={errors ? {border: '1px solid red'} : null}></input>
                    <input type='password' placeholder="Contraseña" name='password' className={styles.input} onChange={onChange} style={errors ? {border: '1px solid red'} : null}></input>
                    <button type='submit' className={styles.btnLogin}>{ loading ? <Oval height={25} width={25}/> : 'Iniciar sesión' }</button>
                </form>
                { errors ? 
                <span className={styles.error}>{ errors }</span>
                : null}
            </div>
        </div>
        </>
    )
}

export default Login;