import bodyParser from 'body-parser';
import config from 'config';
import cors from 'cors';
import express from 'express';
import { startDB } from './database/Database';
import authenticationRouter from './endpoints/authenticate/AuthenticationRoute';
import { AuthenticationService } from './endpoints/authenticate/AuthenticationService';
import degreeCourseRouter from './endpoints/degreeCourses/DegreeCourseRoute';
import publicUserRouter from './endpoints/user/publicUserRoute';
import userRouter from './endpoints/user/UserRoute';

const app = express();

// Port für HTTP laden
const port = config.get('server.httpPort');

// CORS legt fest welche Domains, Methoden und Header beim Zugriff erlaubt sind
// Dadurch kann später das Front-End drauf zugreifen
// https://expressjs.com/en/resources/middleware/cors.html?utm_source=chatgpt.com
app.use(cors({
origin:"*",
allowedHeaders:["Origin","X-Requested-With","Content-Type","Accept","Authorization"],
exposedHeaders:["Authorization","Content-Type"],
methods:["GET","POST","PUT","PATCH","DELETE"]
}))

// Wandelt JSON-Daten aus Requests in nutzbares JavaScript-Objekt um
app.use(bodyParser.json())

startDB();

// HTTP Server starten
app.listen(port, async () => {
    await AuthenticationService.adminUserExist();
    console.log(`[server]: HTTP-Server läuft auf http://localhost:${port}`);
});

// Meilenstein 1
// Endpoint: publicUsers
app.use('/api/publicUsers', publicUserRouter);

// Meilenstein 2
// Endpoint: Authentifizierung
app.use('/api/authenticate', authenticationRouter);

// Endpoint: Users
app.use('/api/users', userRouter);

// Endpoint: DegreeCourse
app.use('/api/degreeCourses', degreeCourseRouter);

// Antwort wenn Route nicht vorhanden
app.use((req, res) => {
    res.status(404).json({ error: 'Route existiert nicht' });
});