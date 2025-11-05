import express from "express";
import { AuthenticationService } from "./AuthenticationService";

const router = express.Router();

// Basic HTTP authentication 
// https://stackoverflow.com/questions/23616371/basic-http-authentication-with-node-and-express-4
router.get('/', async (req: any, res: any) => {
    try {
    // Holt und prüft den Header aus der Anfrage
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(400).json({ error: 'Basic Auth Header fehlt' });
    }

    // Aus Vorlesungsfolien
    // Der Header enthält die Base64 codierten Anmeldedaten
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [userID, password] = credentials.split(':');

    // Authentifizierung durchführen
    const user = await AuthenticationService.authenticate(userID, password);
    if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
    }

    // Erstelle den JWT Token
    const accessToken = AuthenticationService.createToken(user);
    const refreshToken = AuthenticationService.createRefreshToken(user);


    // Token im Header setzen
    res.setHeader('Authorization', 'Bearer ' + accessToken);

    return res.status(200).json({
        success: 'Token created successfully',
        firstName: user.firstName,
        lastName: user.lastName,
        isAdministrator: user.isAdministrator,
        token: accessToken,
        refreshToken: refreshToken
    })
    }
    catch(error) {
        res.status(500).json({ error: "Serverfehler" })
    }
})

export default router;
