import { verify } from "jsonwebtoken";
import User from '@/models/user';
import Order from '@/models/orderClient';

export default async function Handler (req, res) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(404).json({msg: 'Inicie sesión', status: 'login'});
    }
    try {
        const userEmail = await verify(token, process.env.SECRET_WORD);
        const userData = await User.findOne({email: userEmail.email});
        if (userData.role === 'user') {
            const orderData = await Order.find({email: userEmail.email}).populate('order.product').exec();
            return res.status(200).json({email: userData.email, role: userData.role, orders: orderData});
        } else if (userData.role === 'admin') {
            const orders = await Order.find().populate('order.product').exec();
            return res.status(200).json({email: userData.email, role: userData.role, orders: orders});
        }
    } catch (e) {
        console.log(e);
        return res.status(401).json({msg: 'No autorizado', status: 'login'});
    }
}