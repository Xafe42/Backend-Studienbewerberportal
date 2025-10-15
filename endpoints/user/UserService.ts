import { IUser, User } from "./UserModel";

// Alle Benutzer: Aus Vorlage Rest-Server
export async function getAll(): Promise<IUser[]> {
    const allUsers: IUser[] = await User.find();
    return allUsers;
}

// Finde Benutzer anhand seiner ID
export async function getPublicUserById(userID: string) {
    const user = await User.findOne( {userID} );
    return user;
}

// Erstelle Benutzer
export async function createUser(userData: any) {
    // Was passiert, wenn ein zweiter User mit der gleichen User-ID angelegt wird?
    // Was passiert, wenn ein User angelegt werden soll, der keine User-ID hat?
    if (userData) {
        const user = new User({
        userID: userData.userID,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isAdministrator: userData.isAdministrator
        });
        await user.save();
        return user.toJSON();
    }
    else {
        console.log("Keine Benutzerdaten vorhanden");
    }
}

// Benutzer Aktualisieren
export async function updatePublicUser(userID: string, updatedUser: any) {
    // Was passiert, wenn ein User geändert werden soll, den es nicht gibt?
    return User.findOneAndUpdate( {userID} );
}

// Benutzer löschen
export async function deleteUser(userID: string) {
    // Was passiert, wenn ein User gelöscht werden soll, den es nicht gibt?
    return User.findOneAndDelete( {userID} );
}