import { bcrypt } from 'bcryptjs';

class BCrypt {
    static salt = 10;

    public hash(password: string, salt: number) {
        bcrypt.hash(password, salt)
    }
}

export default BCrypt;