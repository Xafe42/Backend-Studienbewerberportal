import { Schema, model } from 'mongoose';

// ID wird von MongoDB automatisch zugewiesen
export interface IDegreeCourseApplication {
    _id: string;
    applicantUserID: string;
    degreeCourseID: string;
    targetPeriodYear: string;
    targetPeriodShortName: string,
}

const degreeCourseApplicationsSchema = new Schema<IDegreeCourseApplication>({
    applicantUserID: { type: String, required: true },
    degreeCourseID: { type: String, required: true },
    targetPeriodYear: { type: String, required: true },
    targetPeriodShortName: { type: String, required: true },
});

// Konvertiert das Attribut _id zu id und setzt es an die erste Stelle
// Kopiert aus: https://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id
// Optional: Entfernt _v
degreeCourseApplicationsSchema.set('toJSON', {
    transform: function (doc, ret) {
    const { _id, ...rest } = ret;
    const top = { id: _id.toString(), ...rest };  // Setzt _id als id um
    return top;
    }
});

export const DegreeCourseApplication = model<IDegreeCourseApplication>('DegreeCourseApplication', degreeCourseApplicationsSchema);