import express, { Request, Response } from "express";
import { authenticateJWT, authorizeAdmin } from "../../utils/authMiddleware";
import { createUser, deleteUser, getAllUsers, getPublicUserById, getUserById, updateUser } from "./UserService";

const router = express.Router();

// Alle Benutzer abrufen
router.get('/',authenticateJWT, authorizeAdmin, async (req: Request, res: Response) => {
    try {
    const usersList = await getAllUsers();
    res.status(200).json(usersList);
    }
    catch(error) {
        res.status(500).json({ error: 'Serverfehler' })
    }
})

// Bestimmten Benutzer über ID abrufen
router.get('/:userID', authenticateJWT, async (req: any, res: any) => {
    try {
    const userID = req.params.userID;
    // Falls Benutzer kein Admin ist gibt es einen Fehler
    if (!req.user.isAdministrator && req.user.userID !== userID) {
        return res.status(403).json({ error: 'Keine Berechtigung für Benutzer' });
    }

    const user = await getUserById(req.params.userID);
    if (user) {
        res.status(200).json(user);
    }
    else
        return res.status(404).json({ error: "Benutzer mit User-ID " + req.params.userID + " nicht gefunden" })
    }
    catch(error) {
        res.status(500).json({ error: 'Serverfehler' })
    }
})

// Benutzer anlegen
router.post('/',authenticateJWT, authorizeAdmin, async (req: Request, res: Response) => {
    try {
    // Was passiert, wenn ein User angelegt werden soll, der keine User-ID hat?
    const userID = req.body.userID
    if (!userID) {
        return res.status(400).json({ error: "Benutzer hat keine UserID"})
    }
    // Was passiert, wenn ein zweiter User mit der gleichen User-ID angelegt wird?
    const existUser = await getPublicUserById(userID);
    if (existUser){
        return res.status(400).json({ error: "Benutzer mit ID schon vorhanden" })
    }
    
    // Erstellt den Benutzer
    console.log('Erstelle Benutzer:' + JSON.stringify(req.body))
    const createdUser = await createUser(req.body);
    res.status(201).json(createdUser);
    }
    catch(error) {
        res.status(500).json({ error: "Serverfehler" })
    }
})

// Benutzerdaten ändern
router.put('/:userID',authenticateJWT, async (req: any, res: any) => {
    try {
        const paramsUser = req.params.userID
        const isAdmin = req.user.isAdministrator
        const verifiedUser  = req.user.userID
        // Benutzer mit eigener ID können nur Änderungen am eigenen Konto durchführen
        if(verifiedUser !== paramsUser && !isAdmin){
            return res.status(403).json({ error: "Benutzer nicht erlaubt Änderung durchzuführen" })
        }

        const updatedUser = await updateUser(req.params.userID, req.body, req.user.isAdministrator);
        // Was passiert, wenn ein User geändert werden soll, den es nicht gibt?
        if (!updatedUser) {
            return res.status(404).json({ error: "Benutzer mit ID " + req.params.userID + " wurde nicht gefunden" })
        }
        res.status(200).json(updatedUser)
    }
    catch(error) {
        res.status(500).json({ error: "Serverfehler" })
    }
})

// Benutzer löschen
router.delete('/:userID',authenticateJWT, authorizeAdmin, async (req: Request, res: Response) => {
    try {
        const deleted = await deleteUser(req.params.userID)
        // Was passiert, wenn ein User gelöscht werden soll, den es nicht gibt?
        if(!deleted) {
            return res.status(404).json( {error: "Benutzer mit der ID " + req.params.userID + " wurde nicht gefunden"} );
        }
        res.status(204).send();
    }
    catch(error) {
        res.status(500).send({ error: "Serverfehler" });
    }
})

export default router;
