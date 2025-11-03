import bcrypt from "bcryptjs";
import { IUser, User } from "./UserModel";

// Funktionen für den Endpoint Public User

// Alle Benutzer: Aus Vorlage Rest-Server
export async function getAll(): Promise<IUser[]> {
    const allUsers: IUser[] = await User.find();
    return allUsers;
}

// Finde Benutzer anhand seiner ID
// https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
export async function getPublicUserById(userID: string) {
    const user = await User.findOne({ userID });
    return user;
}

// Erstelle Benutzer
export async function createUser(userData: any) {
    if (!userData) {
        console.log("Keine Benutzerdaten vorhanden");
    }
    else {
        const hashedPassword = await bcrypt.hash(userData.password,10)
        const user = new User({
        userID: userData.userID,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isAdministrator: userData.isAdministrator
        });
        await user.save();
        return user.toJSON();
    }
}

// Benutzer Aktualisieren
export async function updatePublicUser(userID: string, updatedUser: any) {
    // Prüft, ob ein neues Passwort übergeben wurde und hasht es, bevor es geändert wird
    if(updatedUser.password){
    updatedUser.password = await bcrypt.hash(updatedUser.password, 10)
    }
    console.log("Benutzer " +userID+ " wurde aktualisiert");
    return User.findOneAndUpdate ( { userID }, updatedUser, {new: true});
}

// Benutzer löschen
export async function deleteUser(userID: string) {
    console.log("Benutzer wurde gelöscht");
    return User.findOneAndDelete({ userID });
}

// Funktionen für den Endpoint User
// Abrufen aller Benutzer
export async function getAllUsers(): Promise<IUser[]> {
    return await User.find().select('-password');
}


// Finde Benutzer anhand seiner ID
// https://mongoosejs.com/docs/api/query.html#Query.prototype.select()
export async function getUserById(userID: string) {
    const user = await User.findOne({ userID }).select('-password');
    return user;
}

// Benutzer Aktualisieren - Muss noch überarbeitet werden
export async function updateUser(userID: string, updatedUser: any, isAdmin: boolean) {
    // UserID ist unveränderbar
    if (updatedUser.userID) {
        delete updatedUser.userID;
    }

    // Prüft, ob ein neues Passwort übergeben wurde und hasht es, bevor es geändert wird
    // Passwort verschlüsseln
    // https://github.com/kelektiv/node.bcrypt.js#usage
    if(updatedUser.password){
    updatedUser.password = await bcrypt.hash(updatedUser.password, 10)
    }

    // Normale User dürfen nur bestimmte Felder ändern
    if(updatedUser.isAdmin){
        delete updatedUser.isAdministrator;
    }

    console.log("Benutzer " +userID+ " wurde aktualisiert");
    return User.findOneAndUpdate ( { userID }, updatedUser, {new: true}).select('-password');
}
