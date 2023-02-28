import User from '@/models/user';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function Handler (req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (user) {
        const passwordCompare = await compare(password, user.password);
        if (passwordCompare) {
            const token = sign({
                email,
                exp: Math.floor(Date.now() / 100) + 60 * 60 * 24 * 30,
    
            }, process.env.SECRET_WORD);
            const serializedToken = serialize('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 30,
                path: '/'
            });
            res.setHeader('Set-Cookie', serializedToken);
            return res.status(200).json({msg: 'Loagueado correctamente'});
        }
    }
    res.status(401).json({msg: 'Datos invalidos'});
}