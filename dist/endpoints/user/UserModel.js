"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// UserSchema für die Datenbank
const userSchema = new mongoose_1.Schema({
    userID: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    isAdministrator: { type: Boolean, required: true, default: false }
});
// Konvertiert das Attribut _id zu id und setze es an Erste Stelle
// Optional: _v entfernen
// Kopiert aus: https://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        const { _id, ...rest } = ret;
        const top = { id: _id, ...rest };
        return top;
    }
});
// Usermodell um auf Daten zuzugreifen
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlck1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZW5kcG9pbnRzL3VzZXIvVXNlck1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUF5QztBQVd6QywrQkFBK0I7QUFDL0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQkFBTSxDQUFRO0lBQ25DLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQ3RELFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUMxQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7SUFDNUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO0lBQzNDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsS0FBSyxFQUFDO0NBQ2pFLENBQUMsQ0FBQztBQUVILGtFQUFrRTtBQUNsRSx5QkFBeUI7QUFDekIsMkZBQTJGO0FBQzNGLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO0lBQ3ZCLFNBQVMsRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHO1FBQzNCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDN0IsTUFBTSxHQUFHLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDakMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsc0NBQXNDO0FBQ3pCLFFBQUEsSUFBSSxHQUFHLElBQUEsZ0JBQUssRUFBUSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMifQ==