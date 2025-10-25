"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserService_1 = require("./UserService");
const router = express_1.default.Router();
// Alle Benutzer abrufen
router.get('/', async (req, res) => {
    try {
        const usersList = await (0, UserService_1.getAll)();
        res.status(200).json(usersList);
    }
    catch (error) {
        res.status(500).json({ error: 'Serverfehler' });
    }
});
// Bestimmten Benutzer über ID abrufen
router.get('/:userID', async (req, res) => {
    try {
        const user = await (0, UserService_1.getPublicUserById)(req.params.userID);
        if (user) {
            res.status(200).json(user);
        }
        else
            return res.status(404).json({ error: "Benutzer mit User-ID " + req.params.userID + " nicht gefunden" });
    }
    catch (error) {
        res.status(500).json({ error: 'Serverfehler' });
    }
});
// Benutzer anlegen
router.post('/', async (req, res) => {
    try {
        // Was passiert, wenn ein User angelegt werden soll, der keine User-ID hat?
        const userID = req.body.userID;
        if (!userID) {
            return res.status(400).json({ error: "Benutzer hat keine UserID" });
        }
        // Was passiert, wenn ein zweiter User mit der gleichen User-ID angelegt wird?
        const existUser = await (0, UserService_1.getPublicUserById)(userID);
        if (existUser) {
            return res.status(400).json({ error: "Benutzer mit ID schon vorhanden" });
        }
        // Erstellt den Benutzer
        console.log('Erstelle Benutzer:' + JSON.stringify(req.body));
        const createdUser = await (0, UserService_1.createUser)(req.body);
        res.status(201).json(createdUser);
    }
    catch (error) {
        res.status(500).json({ error: "Serverfehler" });
    }
});
// Benutzerdaten ändern
router.put('/:userID', async (req, res) => {
    try {
        const updatedUser = await (0, UserService_1.updatePublicUser)(req.params.userID, req.body);
        // Was passiert, wenn ein User geändert werden soll, den es nicht gibt?
        if (!updatedUser) {
            return res.status(404).json({ error: "Benutzer mit ID " + req.params.userID + " wurde nicht gefunden" });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: "Serverfehler" });
    }
});
// Benutzer löschen
router.delete('/:userID', async (req, res) => {
    try {
        const deleted = await (0, UserService_1.deleteUser)(req.params.userID);
        // Was passiert, wenn ein User gelöscht werden soll, den es nicht gibt?
        if (!deleted) {
            return res.status(404).json({ error: "Benutzer mit der ID " + req.params.userID + " wurde nicht gefunden" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send({ error: "Serverfehler" });
    }
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljVXNlclJvdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZW5kcG9pbnRzL3VzZXIvcHVibGljVXNlclJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLCtDQUFvRztBQUVwRyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLHdCQUF3QjtBQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFO0lBQ3pDLElBQUksQ0FBQztRQUNMLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBQSxvQkFBTSxHQUFFLENBQUM7UUFDakMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNELE9BQU0sS0FBSyxFQUFFLENBQUM7UUFDVixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFBO0lBQ25ELENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQTtBQUVGLHNDQUFzQztBQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFO0lBQ2hELElBQUksQ0FBQztRQUNMLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSwrQkFBaUIsRUFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELElBQUksSUFBSSxFQUFFLENBQUM7WUFDUCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDOztZQUVHLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FB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