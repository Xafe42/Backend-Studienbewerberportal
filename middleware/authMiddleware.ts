import jwt from 'jsonwebtoken';

// Wenn keine Umgebungsvariable gesetzt ist, wird Standardwert verwendet
const SECRET_KEY = process.env.JWT_SECRET || 'geheimerSchlüssel';

// Verifizieren von Token // Aus alter Abgabe
// Middleware zur Authentifikation des Token
export const authenticateJWT = (req: any, res: any, next: any) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    // Kein Token vorhanden
    if (!token) {
        return res.status(401).json({ error: 'Token fehlt oder ist ungültig' });
    }

    // Überprüft Token mit Geheimschlüssel
    // https://www.npmjs.com/package/jsonwebtoken
    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ error: 'Token ist ungültig oder abgelaufen' });
        }
        req.user = user;
        next();
    });
};

// Middleware zur Authentifikation des Administrator
export const authorizeAdmin = (req: any, res: any, next: any) => {
    if (!req.user.isAdministrator) {
        return res.status(403).json({ error: 'Keine Berechtigung für Admin-Operationen' });
    }
    // Wenn Benutzer Admin ist gehe zur nächsten Middleware
    next();
};

