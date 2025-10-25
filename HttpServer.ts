import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import { startDB } from './database/Database';
import publicUserRouter from './endpoints/user/publicUserRoute';

const app = express();

// Port für HTTP laden
const port = config.get('server.httpPort');

// Wandelt JSON-Daten aus Requests in nutzbares JavaScript-Objekt um
app.use(bodyParser.json())

startDB();

// HTTP Server starten
app.listen(port, async () => {
    console.log(`[server]: HTTP-Server läuft auf http://localhost:${port}`);
});

// Meilenstein 1
// Endpoint: publicUsers
app.use('/api/publicUsers', publicUserRouter);

// Antwort wenn Route nicht vorhanden
app.use((req, res) => {
    res.status(404).json({ error: 'Route existiert nicht' });
});