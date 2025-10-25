"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.getPublicUserById = getPublicUserById;
exports.createUser = createUser;
exports.updatePublicUser = updatePublicUser;
exports.deleteUser = deleteUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = require("./UserModel");
// Alle Benutzer: Aus Vorlage Rest-Server
async function getAll() {
    const allUsers = await UserModel_1.User.find();
    return allUsers;
}
// Finde Benutzer anhand seiner ID
async function getPublicUserById(userID) {
    const user = await UserModel_1.User.findOne({ userID });
    return user;
}
// Erstelle Benutzer
async function createUser(userData) {
    if (!userData) {
        console.log("Keine Benutzerdaten vorhanden");
    }
    else {
        const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
        const user = new UserModel_1.User({
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
async function updatePublicUser(userID, updatedUser) {
    // Prüft, ob ein neues Passwort übergeben wurde und hasht es, bevor es geändert wird
    if (updatedUser.password) {
        updatedUser.password = await bcryptjs_1.default.hash(updatedUser.password, 10);
    }
    console.log("Benutzer " + userID + " wurde aktualisiert");
    return UserModel_1.User.findOneAndUpdate({ userID }, updatedUser, { new: true });
}
// Benutzer löschen
async function deleteUser(userID) {
    console.log("Benutzer wurde gelöscht");
    return UserModel_1.User.findOneAndDelete({ userID });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9lbmRwb2ludHMvdXNlci9Vc2VyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlBLHdCQUdDO0FBR0QsOENBR0M7QUFHRCxnQ0FnQkM7QUFHRCw0Q0FPQztBQUdELGdDQUdDO0FBaERELHdEQUE4QjtBQUM5QiwyQ0FBMEM7QUFFMUMseUNBQXlDO0FBQ2xDLEtBQUssVUFBVSxNQUFNO0lBQ3hCLE1BQU0sUUFBUSxHQUFZLE1BQU0sZ0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QyxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDO0FBRUQsa0NBQWtDO0FBQzNCLEtBQUssVUFBVSxpQkFBaUIsQ0FBQyxNQUFjO0lBQ2xELE1BQU0sSUFBSSxHQUFHLE1BQU0sZ0JBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxvQkFBb0I7QUFDYixLQUFLLFVBQVUsVUFBVSxDQUFDLFFBQWE7SUFDMUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0lBQ2pELENBQUM7U0FDSSxDQUFDO1FBQ0YsTUFBTSxjQUFjLEdBQUcsTUFBTSxrQkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzlELE1BQU0sSUFBSSxHQUFHLElBQUksZ0JBQUksQ0FBQztZQUN0QixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07WUFDdkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1lBQzdCLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtZQUMzQixlQUFlLEVBQUUsUUFBUSxDQUFDLGVBQWU7U0FDeEMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekIsQ0FBQztBQUNMLENBQUM7QUFFRCx5QkFBeUI7QUFDbEIsS0FBSyxVQUFVLGdCQUFnQixDQUFDLE1BQWMsRUFBRSxXQUFnQjtJQUNuRSxvRkFBb0Y7SUFDcEYsSUFBRyxXQUFXLENBQUMsUUFBUSxFQUFDLENBQUM7UUFDekIsV0FBVyxDQUFDLFFBQVEsR0FBRyxNQUFNLGtCQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDbEUsQ0FBQztJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFFLE1BQU0sR0FBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3hELE9BQU8sZ0JBQUksQ0FBQyxnQkFBZ0IsQ0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUFFRCxtQkFBbUI7QUFDWixLQUFLLFVBQVUsVUFBVSxDQUFDLE1BQWM7SUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3ZDLE9BQU8sZ0JBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDN0MsQ0FBQyJ9