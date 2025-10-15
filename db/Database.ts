import { connect } from 'mongoose';

export async function startDB(){
    console.log("Verbindung zur Datenbank")
    await connect('mongodb://127.0.0.1:27017/WE2');
    console.log("Datenbank verbunden")
}
