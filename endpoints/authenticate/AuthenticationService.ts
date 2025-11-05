import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../user/UserModel';


const SECRET_KEY = process.env.JWT_SECRET || 'geheimerSchlüssel';
const EXPIRY_TIME = '1h';

export class AuthenticationService {
// Prüfe ID und Passwort
public static async authenticate(userID: string, password: string) {
    const user = await User.findOne({ userID });
    if (!user) {
        return null;
    }

    // Vergleich der Passwörter
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
        return user;
    } else {
        return null;
    }
}


// Erstelle einen Token
// https://www.base64decode.org/
// https://www.npmjs.com/package/jsonwebtoken
public static createToken(user: any) {
    // JWT Payload erstellen
        return jwt.sign(
        {
            userID: user.userID,
            isAdministrator: user.isAdministrator
        },
        // Geheimschlüssel hinzufügen
        SECRET_KEY,
        // Ablaufdauer
        { expiresIn: EXPIRY_TIME, algorithm: 'HS256' }
    );
}

// Refresh Token erstellen
public static createRefreshToken(user: any) {
    return jwt.sign(
        {
            userID: user.userID,
        },
        SECRET_KEY,
        // Ablaufdauer
        { expiresIn: '7d' }
    );
}

// Sicherstellen dass ein Admin existiert (Standard)
public static async adminUserExist() {
    const admin = await User.findOne({ userID: 'admin' });
    if (!admin) {
        // Gehashtes Password für Admin mit 10 Salts
        const hashedPassword = await bcrypt.hash('123', 10);
                const user = new User({
                userID: 'admin',
                password: hashedPassword,
                firstName: 'Admin',
                lastName: 'User',
                isAdministrator: true
                });
                await user.save();
    }
};
}