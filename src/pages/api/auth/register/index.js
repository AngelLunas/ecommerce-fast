import User from '@/models/user';
import { encrypt } from '@/utils/bcrypt';

export default async function Handler (req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        if (!email.includes('@') || email.length < 6 || !email.includes('.')) {
            return res.status(400).json({input: 'email', error: 'Ingrese un email valido'});
        };
        if (password.length < 8) {
            return res.status(400).json({input: 'password', error: 'Su contraseña es muy debil'});
        };
        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(400).json({input: 'email', error: 'El correo electrónico ya existe'});
        };
        req.body.role = 'user';
        const passHash = await encrypt(req.body.password);
        const newUser = new User(req.body);
        newUser.password = passHash;
        await newUser.save();
        return res.status(201).json({msg: 'Creado correctamente'});
    }
};