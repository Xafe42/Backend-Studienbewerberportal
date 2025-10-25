"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("config"));
const express_1 = __importDefault(require("express"));
const Database_1 = require("./db/Database");
const publicUserRoute_1 = __importDefault(require("./endpoints/user/publicUserRoute"));
const app = (0, express_1.default)();
// Port für HTTP laden
const port = config_1.default.get('server.httpPort');
// Wandelt JSON-Daten aus Requests in nutzbares JavaScript-Objekt um
app.use(body_parser_1.default.json());
(0, Database_1.startDB)();
// HTTP Server starten
app.listen(port, async () => {
    console.log(`[server]: HTTP-Server läuft auf http://localhost:${port}`);
});
// Meilenstein 1
// Endpoint: publicUsers
app.use('/api/publicUsers', publicUserRoute_1.default);
// Antwort wenn Route nicht vorhanden
app.use((req, res) => {
    res.status(404).json({ error: 'Route existiert nicht' });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cFNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL0h0dHBTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBcUM7QUFDckMsb0RBQTRCO0FBQzVCLHNEQUE4QjtBQUM5Qiw0Q0FBd0M7QUFDeEMsdUZBQWdFO0FBRWhFLE1BQU0sR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBRXRCLHNCQUFzQjtBQUN0QixNQUFNLElBQUksR0FBRyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRTNDLG9FQUFvRTtBQUNwRSxHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUUxQixJQUFBLGtCQUFPLEdBQUUsQ0FBQztBQUVWLHNCQUFzQjtBQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtJQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzVFLENBQUMsQ0FBQyxDQUFDO0FBRUgsZ0JBQWdCO0FBQ2hCLHdCQUF3QjtBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLHlCQUFnQixDQUFDLENBQUM7QUFFOUMscUNBQXFDO0FBQ3JDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDakIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO0FBQzdELENBQUMsQ0FBQyxDQUFDIn0=