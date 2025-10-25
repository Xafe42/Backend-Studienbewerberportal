"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDB = startDB;
const config_1 = __importDefault(require("config"));
const mongoose_1 = require("mongoose");
// Lädt die dbURL und die Optionen aus der Cofig
const dbURL = config_1.default.get('db.dbURL');
// Optional
const dbOption = config_1.default.get('db.connectionOptions');
async function startDB() {
    console.log("Verbindung zur Datenbank");
    await (0, mongoose_1.connect)(dbURL);
    console.log("Datenbank verbunden");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9kYi9EYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVFBLDBCQUlDO0FBWkQsb0RBQTRCO0FBQzVCLHVDQUFtQztBQUVuQyxnREFBZ0Q7QUFDaEQsTUFBTSxLQUFLLEdBQVcsZ0JBQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDN0MsV0FBVztBQUNYLE1BQU0sUUFBUSxHQUFHLGdCQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUE7QUFFNUMsS0FBSyxVQUFVLE9BQU87SUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0lBQ3ZDLE1BQU0sSUFBQSxrQkFBTyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUN0QyxDQUFDIn0=