import express, { Request, Response } from "express";
import { createPublicUser, deleteUser, getAll, getPublicUserById, updatePublicUser } from "./UserService";

const router = express.Router();

// Alle Benutzer abrufen
router.get('/', async (req: Request, res: Response) => {
    try {
    const usersList = await getAll();
    res.status(200).json(usersList);
    }
    catch(error) {
        res.status(500).json({ error: 'Serverfehler' })
    }
})

// Bestimmten Benutzer über ID abrufen
router.get('/:userID', async (req: Request, res: Response) => {
    try {
    const user = await getPublicUserById(req.params.userID);
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
router.post('/', async (req: Request, res: Response) => {
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
    const createdUser = await createPublicUser(req.body);
    res.status(201).json(createdUser);
    }
    catch(error) {
        res.status(500).json({ error: "Serverfehler" })
    }
})

// Benutzerdaten ändern
router.put('/:userID', async (req: Request, res: Response) => {
    try {
        const updatedUser = await updatePublicUser(req.params.userID, req.body);
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
router.delete('/:userID', async (req: Request, res: Response) => {
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
