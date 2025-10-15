import { Schema, model } from 'mongoose';

// Interface für User
export interface IUser {
  userID: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdministrator: boolean;
}

// UserSchema für die Datenbank
const userSchema = new Schema<IUser>({
  userID: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  isAdministrator: { type: Boolean, required: true, default:false}
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
export const User = model<IUser>('User', userSchema);
