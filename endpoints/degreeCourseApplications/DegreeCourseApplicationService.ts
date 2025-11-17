import { DegreeCourseApplication, IDegreeCourseApplication } from './DegreeCourseApplicationsModel';

// Alle Bewerbungen eines Users finden
export async function getApplicationsByUser(userID: string): Promise<IDegreeCourseApplication[]> {
    return await DegreeCourseApplication.find({ applicantUserID: userID });
}

// Bewerbung nach ID finden
export async function getApplicationById(id: string): Promise<IDegreeCourseApplication | null> {
    return await DegreeCourseApplication.findById(id);
}


// Bewerbung erstellen
export async function createApplication(applicationData: IDegreeCourseApplication) {
    // Prüfung auf Bewerbung
    const existingApplication = await DegreeCourseApplication.findOne({
        applicantUserID: applicationData.applicantUserID,
        degreeCourseID: applicationData.degreeCourseID,
        targetPeriodYear: applicationData.targetPeriodYear,
        targetPeriodShortName: applicationData.targetPeriodShortName
    });

    if (existingApplication) {
        throw new Error('Bewerbung existiert bereits');
    }

    const application = new DegreeCourseApplication(applicationData);
    return await application.save();
}

// Bewerbungen nach Studiengang finden (nur für Admin)
// Nachgelagerte Suche für Bewerbungen eines Studiengangs
export async function getApplicationsByDegreeCourse(courseID: string): Promise<IDegreeCourseApplication[]> {
    return await DegreeCourseApplication.find({ degreeCourseID: courseID });
}

// Bewerbung aktualisieren
export async function updateApplication(id: string, updateData: any) {
    return await DegreeCourseApplication.findOneAndUpdate({ _id: id }, updateData, { new: true });
}

// Bewerbung löschen
export async function deleteApplication(id: string) {
    return await DegreeCourseApplication.findByIdAndDelete(id);
}

// Alle Bewerbungen finden
export async function getAllApplications(): Promise<IDegreeCourseApplication[]> {
    return await DegreeCourseApplication.find();
}