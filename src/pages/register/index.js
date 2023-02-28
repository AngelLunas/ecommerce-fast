import Head from "next/head";
import React, { useState } from "react";
import styles from '@/styles/Register.module.css';
import Router from "next/router";
import Nav from "Components/Nav";
import { Oval } from "react-loading-icons";

const Register = () => {
    const [dataUser, setDataUser] = useState({
        email: '',
        password: ''
    });
    const [confirmationPass, setConfirmationPass] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const onChangePass = (e) => {
        setConfirmationPass(e.target.value);
    } 

    const onChange = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const errorsForm = [];
        if (dataUser.email.length <= 5 ) {
            errorsForm.push({input: 'email', error: 'Ingrese un email valido'});
        };
        if (dataUser.password.length < 8) {
            errorsForm.push({input: 'password', error: 'Ingrese una contraseña más larga'});
        };
        if (dataUser.password !== confirmationPass) {
            errorsForm.push({input: 'password', error: 'La contraseña no coincide'});
        }

        if (errorsForm.length > 0) {
            setErrors(errorsForm);
            setLoading(false);
            return;
        };

        const data = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(dataUser),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (data.status !== 201) {
            const dataJson = await data.json();
            setErrors([dataJson]);
            setLoading(false);
            return;
        }
        
        Router.push('/login');
    }

    return (
        <>
        <Head>
            <title>Crear cuenta</title>
        </Head>
        <div className={styles.register}>
            <Nav other></Nav>
            <span className={styles.title}>
                Cree una cuenta para realizar sus compras más rápido
            </span>
            <div className={styles.containerForm}>
                <form onSubmit={onSubmit} className={styles.form}>
                    <input type='email' placeholder="Email" name='email' onChange={onChange} 
                        style={errors.some((element) => element.input === 'email') ? {border: '1px solid red'} : null} className={styles.input}></input>
                    <input type='password' placeholder="Contraseña" onChange={onChangePass} 
                        style={errors.some((element) => element.input === 'email') ? {border: '1px solid red'} : null} className={styles.input}></input>
                    <input type='password' placeholder="Repita su contraseña" name='password' onChange={onChange}  
                        style={errors.some((element) => element.input === 'email') ? {border: '1px solid red'} : null} className={styles.input}></input>
                    <button type="submit" className={styles.registerBtn}>{ loading ? <Oval width={25} height={25}/> : 'Crear'}</button>
                </form>
            </div>
            { errors ? 
            <div className={styles.containerErrors}>
                { errors.map((element, index) => <span key={index} className={styles.error}>- { element.error }</span> ) }
            </div> 
            : null }
        </div>
        </>
    )
}

export default Register;