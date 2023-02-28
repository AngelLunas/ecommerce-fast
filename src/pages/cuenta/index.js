import Load from "Components/Load";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import useSWR from 'swr';
import Image from "next/image";
import styles from '@/styles/accountPage.module.css';
import { renderOrders } from "@/hooks/account";

const fetcher = (url) => fetch(url).then(res => res.json());

const Account = () => {
    const {data, error} = useSWR('/api/auth/user', fetcher);
    
    if (!data) return <Load/>

    if (error) return <h1>Ha ocurrido un error</h1>

    if (data.status === 'login') {
        Router.push('/login');
        return;
    } 

    const logout = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'POST'
        });
        
        if (response.status === 200) {
            Router.push('/');
        }
    }
     
    return (
        <>
        <Head>
            <title>
                Cuenta
            </title>
        </Head>
        <div className={styles.container}>
            <div className={styles.dataAccount}>
                <h3 className={styles.title}>
                    Tu cuenta
                </h3>
                <Image src='/account.svg' width={100} height={100} alt='account icon'/>
                {data.role === 'user' && data.orders[0] ? 
                <><span className={styles.dataText}>
                    { data.orders[0].name }
                </span>
                <span className={styles.dataText}>
                    { data.orders[0].email }
                </span>
                <span className={styles.dataText}>
                    { data.orders[0].addres }
                </span>
                <span className={styles.dataText}>
                    { data.orders[0].number }
                </span>
                <button className={styles.logout} onClick={logout}>
                    Cerrar sesión
                </button>
                </> : 
                <>
                <span className={styles.dataText}>
                    { data.email }
                </span>
                <span className={styles.dataText}>
                    { data.role }
                </span>
                <button className={styles.logout} onClick={logout}>
                    Cerrar sesión
                </button>
                </> }
            </div>
            <div className={styles.containerOrders}>
                { data.role === 'user' ?
                <h3 className={styles.titleOrder}>
                    Tus ordenes
                </h3> :
                <h3 className={styles.titleOrder}>
                    Ordenes
                </h3>
                }
                { data.orders.length < 1 ? 
                <div>
                    No tienes ordenes
                </div> 
                : 
                <div className={styles.containerOrdersColumn}>
                    { renderOrders(data) }
                </div>
                }
            </div>
        </div>
        </>
    )
}

export default Account; 