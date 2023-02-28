import React from "react";
import styles from '@/styles/load.module.css';
import { Oval } from "react-loading-icons";

const Load = () => {
    return (
        <div className={styles.loadingPage}>
            <Oval height={100} width={100} stroke="#98ff98"></Oval>
        </div>
    )
}

export default Load;