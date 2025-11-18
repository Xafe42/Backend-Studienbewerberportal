import express from "express";
import { authenticateJWT, authorizeAdmin } from "../../utils/authMiddleware";
import { getApplicationsByDegreeCourse } from "../degreeCourseApplications/DegreeCourseApplicationService";
import { DegreeCourse } from "./DegreeCourseModel";
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "./DegreeCourseService";

const router = express.Router();


// Alle Kurse abrufen oder nach bestimmten Studiengäng einer Hochschule filtern
router.get('/', async (req: any, res: any) => {
    try {
    //Suche mit Query nach Studiengängen ansonsten geb alle Kurse zurück
    const universityShortName = req.query.universityShortName;
    let courseList
    if (universityShortName) {
        courseList = await DegreeCourse.find({ universityShortName})
    }
    else {
        courseList = await getAllCourses();
    }
    res.status(200).json(courseList);
    }
    catch(error) {
        res.status(500).json({ error: 'Serverfehler' })
    }
})

// Bestimmten Kurs über ID abrufen
router.get('/:courseID', async (req: any, res: any) => {
    try {
    const course = await getCourseById(req.params.courseID);
    if (course) {
        res.status(200).json(course);
    }
    else
        return res.status(404).json({ error: "Kurs mit ID " + req.params.courseID + " nicht gefunden" })
    }
    catch(error) {
        res.status(500).json({ error: 'Serverfehler' })
    }
})

// Meilenstein 3
// GET: Nachgelagerte Suche für Studienbewerbungen
router.get('/:degreeCourseID/degreeCourseApplications', authenticateJWT, authorizeAdmin, async (req: any, res: any) => {
    try {
        const degreeCourseID = req.params.degreeCourseID;
        const degreeCourse = await getCourseById(degreeCourseID);
        if (!degreeCourse) {
            return res.status(404).json({ error: 'Studiengang nicht gefunden' });
        }
        const applications = await getApplicationsByDegreeCourse(degreeCourseID);
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Serverfehler' });
    }
});

// Kurs anlegen
router.post('/',authenticateJWT, authorizeAdmin, async (req: any, res: any) => {
    try {
    // Was passiert, wenn ein zweiter Kurs mit der gleichen ID angelegt wird?
    const existCourse = await DegreeCourse.findOne({ name: req.body.name, shortName: req.body.shortName });
    if (existCourse) {
        return res.status(400).json({ error: "Kurs existiert bereits" });
    }

    // Erstellt den Benutzer
    console.log('Erstelle Kurs:' + JSON.stringify(req.body))
    const createdCourse = await createCourse(req.body);
    res.status(201).json(createdCourse);
    }
    catch(error) {
        res.status(500).json({ error: "Serverfehler" })
    }
})

// Kursdaten ändern
router.put('/:courseID',authenticateJWT, authorizeAdmin, async (req: any, res: any) => {
    try {
        const updatedCourse = await updateCourse(req.params.courseID, req.body);
        // Was passiert, wenn ein Kurs geändert werden soll, den es nicht gibt?
        if (!updatedCourse) {
            return res.status(404).json({ error: "Benutzer mit ID " + req.params.courseID + " wurde nicht gefunden" })
        }
        res.status(200).json(updatedCourse)
    }
    catch(error) {
        res.status(500).json({ error: "Serverfehler" })
    }
})

// Kurs löschen
router.delete('/:courseID',authenticateJWT, authorizeAdmin, async (req: any, res: any) => {
    try {
        const deleted = await deleteCourse(req.params.courseID)
        // Was passiert, wenn ein Kurs gelöscht werden soll, den es nicht gibt?
        if(!deleted) {
            return res.status(404).json( {error: "Kurs mit der ID " + req.params.courseID + " wurde nicht gefunden"} );
        }
        res.status(204).send();
    }
    catch(error) {
        res.status(500).send({ error: "Serverfehler" });
    }
})

export default router;
