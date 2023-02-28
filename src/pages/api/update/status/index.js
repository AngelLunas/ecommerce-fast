import { verify } from "jsonwebtoken";
import User from '@/models/user';
import Order  from '@/models/orderClient';

export default async function Handler (req, res) {
    if (req.method === 'POST') {
        const { token } = req.cookies;
        try {
            const userToken = verify(token, process.env.SECRET_WORD);
            const userData = await User.findOne({email: userToken.email});
            if (userData.role === 'admin') {
                console.log(req.body.status)
                const updatedOrder = await Order.findOneAndUpdate({_id: req.body.order}, { status: req.body.status });
                console.log(updatedOrder);
                return res.status(200).json(updatedOrder);
            }
            return res.status(401).json({msg: 'No autorizado para esta acción'});
        } catch (e) {
            console.log(e);
            return res.status(401).json({msg: 'No autorizado para esta acción'});
        }
    }
}