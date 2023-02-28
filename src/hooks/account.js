import ProductOrder from "Components/ProductOrder";
import styles from '@/styles/orders.module.css';
import SelectStatus from "Components/Select";

const colorStatus = (status) => {
    switch (status) {
        case 'preparando':
            return '#c8c01c';
        case 'en camino': 
            return '#1c66c8'
        case 'entregado': 
            return '#1cc84a'
        default: 
            return '#1cc84a'
    }
}


const renderOrders = (orders) => {
    console.log(orders);
    const Components = [];
    if (orders.role === 'user') {
        for (let [index, order] of orders.orders.entries()) {
            let total = 0;
            Components.push(
                <div key={index} className={styles.container}>
                    <div className={styles.containerOrder}>
                        <span className={styles.text}>
                            { `Orden No ${index + 1}` }
                        </span>
                        <span style={{backgroundColor: colorStatus(order.status)}} className={styles.status}>
                            Estado: { order.status }
                        </span>
                    </div>
                    { order.order.map((product, index) => {
                        total += product.quantity * product.product.price;
                        return (
                            <ProductOrder key={index}
                            name={product.product.name} 
                            quantity={product.quantity} 
                            price={product.quantity * product.product.price} 
                            srcImg={product.product.srcImage}
                            extend={false}
                            />
                            )
                        }) 
                    }
                    <span className={styles.text}>
                        Total: ${ total }
                    </span>
                </div>
            )
        }
    } else if (orders.role === 'admin') {
        for (let [index, order] of orders.orders.entries()) {
            let total = 0;
            const date = new Date(order.date);
            const dateString = date.toLocaleDateString('es-ES', {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
            });

            Components.push(
                <div key={index} className={styles.container}>
                    <div className={styles.containerOrder}>
                        <span className={styles.text}>
                            { `Orden No ${index + 1}` }
                        </span>
                        <SelectStatus status={order.status} orderId={order._id}/>
                    </div>
                    <span className={styles.text}>
                        { dateString }
                    </span>
                    { order.order.map((product, index) => {
                        total += product.quantity * product.product.price;
                        return (
                            <ProductOrder key={index}
                            name={product.product.name} 
                            quantity={product.quantity} 
                            price={product.quantity * product.product.price} 
                            srcImg={product.product.srcImage}
                            extend={order}
                            />
                            )
                        }) 
                    }
                    <span className={styles.text}>
                        Total: ${ total }
                    </span>
                </div>
            )
        }
    }

    return Components;
}

export {
    renderOrders,
    colorStatus
}