import { DegreeCourse, IDegreeCourse } from "./DegreeCourseModel";

// Funktionen für den Endpoint DegreeCourses

// Alle Kurse: Aus Vorlage Rest-Server
export async function getAllCourses(): Promise<IDegreeCourse[]> {
    const allCourses: IDegreeCourse[] = await DegreeCourse.find();
    return allCourses;
}

// Finde Kurs anhand seiner ID
// https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
export async function getCourseById(id: string) {
    try {
    const course = await DegreeCourse.findOne({ _id: id });
    return course;
    }
    catch (error) {
        console.error("Fehler beim Abrufen des Kurses:", error);
        return null;
    }
}

// Erstelle Kurs
export async function createCourse(courseData: any) {
    if (!courseData) {
        console.log("Keine Kursdaten vorhanden");
    }
    else {
        const course = new DegreeCourse({
        name: courseData.name,
        shortName: courseData.shortName,
        universityName: courseData.universityName,
        universityShortName: courseData.universityShortName,
        departmentName: courseData.departmentName,
        departmentShortName: courseData.departmentShortName
        });
        await course.save();
        return course.toJSON();
    }
}

// Benutzer Aktualisieren
export async function updateCourse(id: string, updateCourse: any) {
    console.log("Kurs " +id+ " wurde aktualisiert");
    return DegreeCourse.findOneAndUpdate ( { _id: id }, updateCourse, {new: true});
}

// Benutzer löschen
export async function deleteCourse(id: string) {
    console.log("Kurs wurde gelöscht");
    return DegreeCourse.findOneAndDelete({ _id: id });
}

