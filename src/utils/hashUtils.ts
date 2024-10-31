// Hashing utility functions
const argon2 = require('argon2');


export const hashPassword = async (password: string): Promise<string> => {

    const hashedPass = await argon2.hash(password);
    return hashedPass;

}

export const verifyPassword = async (password: string, hashPassword: string): Promise<boolean> => {

    try {
        if (await argon2.verify(password, hashPassword)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }	
}