import { verify } from "jsonwebtoken";
import User from '@/models/user';

export default async function Handler(req, res) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({msg: 'no token'});
    }
    try {
        const { email } = verify(token, process.env.SECRET_WORD);
        const userData = await User.findOne({email});
        return res.status(200).json({email: userData.email});
    } catch (e) {
        return res.status(401).json({msg: 'token invalido'});
    }
}