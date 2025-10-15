import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { startDB } from './db/Database';
import publicUserRouter from './endpoints/user/publicUserRoute';

dotenv.config();

const app = express();

// Port für HTTP laden
const port = process.env.PORT;

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