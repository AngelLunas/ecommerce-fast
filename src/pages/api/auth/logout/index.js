import { serialize } from "cookie";
import { verify } from "jsonwebtoken";

export default async function Handler(req, res) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({msg: 'no token'})
    }

    try {
        verify(token, process.env.SECRET_WORD);
        const serializedToken = serialize('token', null, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/'
        });
        res.setHeader('Set-Cookie', serializedToken);
        res.status(200).json({msg: 'sesión cerrada'})
    } catch(e) {
        res.status(401).json({msg: 'Token invalido'});
    }
}