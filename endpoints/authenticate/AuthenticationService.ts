import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../user/UserModel';


const SECRET_KEY = process.env.JWT_SECRET || 'geheimerSchlüssel';
const EXPIRY_TIME = '1h';

// Prüfe ID und Passwort
export async function authenticate(userID: string, password: string) {
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
export async function createToken(user: any) {
    // JWT Payload erstellen
        jwt.sign(
        {
            userID: user.userID,
            isAdministrator: user.isAdministrator
        },
        // Geheimschlüssel hinzufügen
        SECRET_KEY,
        // Ablaufdauer
        { expiresIn: EXPIRY_TIME }
    );
}

// Sicherstellen dass ein Admin existiert (Standard)
export async function adminUserExist() {
    const admin = await User.findOne({ userID: 'admin' });
    if (!admin) {
        // Gehashtes Password für Admin mit 10 Salts
        const hashedPassword = await bcrypt.hash('123', 10)
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