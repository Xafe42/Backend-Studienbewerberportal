import bcrypt from "bcryptjs";
import { IUser, User } from "./UserModel";

// Alle Benutzer: Aus Vorlage Rest-Server
export async function getAll(): Promise<IUser[]> {
    const allUsers: IUser[] = await User.find();
    return allUsers;
}

// Finde Benutzer anhand seiner ID
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
    return User.findOneAndUpdate ( { userID }, updatedUser, {new: true});
}

// Benutzer löschen
export async function deleteUser(userID: string) {
    return User.findOneAndDelete({ userID });
}