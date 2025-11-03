import { Schema, model } from 'mongoose';

// Interface für User
export interface IDegreeCourse {
    _id: string;
    name: string;
    shortName: string;
    universityName: string;
    universityShortName: string;
    departmentName: string;
    departmentShortName: string;
}

// UserSchema für die Datenbank
const userSchema = new Schema<IDegreeCourse>({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    universityName: { type: String, required: true },
    universityShortName: { type: String, required: true },
    departmentName: { type: String, required: true },
    departmentShortName: { type: String, required: true }
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
export const DegreeCourse = model<IDegreeCourse>('DegreeCourse', userSchema);
