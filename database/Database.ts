import config from 'config';
import { connect } from 'mongoose';

// Lädt die dbURL und die Optionen aus der Cofig
const dbURL: string = config.get('db.dbURL');
// Optional
const dbOption = config.get('db.connectionOptions')

export async function startDB(){
    console.log("Verbindung zur Datenbank")
    await connect(dbURL);
    console.log("Datenbank verbunden")
}