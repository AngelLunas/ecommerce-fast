import bcrypt from 'bcryptjs';

const encrypt = async (pass) => {
    const encryptPass = await bcrypt.hash(pass, 10);
    return encryptPass;
}

const compare = async (pass, hash) => {
    return await bcrypt.compare(pass, hash);
}

export {
    encrypt,
    compare
}