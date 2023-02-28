import React, { useState } from "react";
import styles from '@/styles/orders.module.css';
import { colorStatus } from "@/hooks/account";

const SelectStatus = ({status, orderId}) => {
    const [statusState, setStatusState] = useState(status);
    const onChangeStatus = async (e) => {
        setStatusState(e.target.value);
        const body = {
            order: orderId,
            status: e.target.value
        };
        console.log(body);
        const response = await fetch('/api/update/status', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
    }

    return (
        <select name='status' defaultValue={status} onChange={onChangeStatus} style={{backgroundColor: colorStatus(statusState)}} className={styles.status}>
            <option value='activo' >Activo</option>
            <option value='preparando'>Preparando</option>
            <option value='en camino'>En camino</option>
            <option value='entregado'>Entregado</option>
        </select>
    )
} 

export default SelectStatus;