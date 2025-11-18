import express from 'express';
import { isValidObjectId } from 'mongoose';
import { authenticateJWT, authorizeAdmin } from '../../utils/authMiddleware';
import { getCourseById } from '../degreeCourses/DegreeCourseService';
import { createApplication, deleteApplication, getAllApplications, getApplicationById, getApplicationsByDegreeCourse, getApplicationsByUser, updateApplication } from './DegreeCourseApplicationService';
import { DegreeCourseApplication } from './DegreeCourseApplicationsModel';

const router = express.Router();


// GET: Eigene Bewerbungen anzeigen
router.get('/myApplications', authenticateJWT, async (req: any, res: any) => {
    try {
        const applications = await getApplicationsByUser(req.user.userID);
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Serverfehler' });
    }
});

// GET: Bewerbungen filtern (Admin)
router.get('/', authenticateJWT, authorizeAdmin, async (req: any, res: any) => {
    try {
        let applications;
        
        if (req.query.applicantUserID) {
            // Bewerbungen eines bestimmten Users
            applications = await getApplicationsByUser(req.query.applicantUserID);
        } else if (req.query.degreeCourseID) {
            // Bewerbungen für einen Studiengang
            applications = await getApplicationsByDegreeCourse(req.query.degreeCourseID);
        } else {
            // Alle Bewerbungen
            applications = await getAllApplications();
        }
        
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Serverfehler' });
    }
});

// GET: Bewerbung nach ID abrufen (Admin oder Bewerber)
router.get('/:applicationID', authenticateJWT, async (req: any, res: any) => {
    try {
        const application = await getApplicationById(req.params.applicationID);
        if (!application) {
            return res.status(404).json({ error: 'Bewerbung nicht gefunden' });
        }
        if (!req.user.isAdministrator && application.applicantUserID !== req.user.userID) {
            return res.status(403).json({ error: 'Keine Berechtigung' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Serverfehler' });
    }
});

// POST: Neue Bewerbung anlegen (Eingeloggte Nutzer)
router.post('/', authenticateJWT, async (req: any, res: any) => {
    try {
        const applicantUserID = req.user.userID;
        // Anpassen Anlegen einer Bewerbung für einen Studiengang, den es nicht gibt, Es sollte eine Fehlermeldung geben
        const { degreeCourseID, targetPeriodYear, targetPeriodShortName } = req.body;

        // Prüft, ob die Studiengang-ID eine gültige MongoDB ObjectId ist
        if (!isValidObjectId(degreeCourseID)) {
        return res.status(400).json({ error:'Studiengang existiert nicht' });
        }

        const degreeCourse = await getCourseById(degreeCourseID);
        if (!degreeCourse) {
            return res.status(400).json({ error: 'Studiengang existiert nicht' });
        }

        // Prüfung ob Bewerbung bereits existiert
        const existCheck = await DegreeCourseApplication.findOne({applicantUserID, degreeCourseID, 
        targetPeriodYear,targetPeriodShortName});
        if (existCheck) {
        return res.status(400).json({ error: 'Bewerbung existiert bereits' });
        }
        
        // Erstellt die Bewerbung
        const applicationData = { ...req.body, applicantUserID };
        const newApplication = await createApplication(applicationData);
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(500).json({ error: 'Serverfehler' });
    }
});

// PUT: Bewerbung aktualisieren (Admin oder Bewerber selbst)
router.put('/:applicationID', authenticateJWT, async (req: any, res: any) => {
    try {
        const application = await getApplicationById(req.params.applicationID);
        if (!application) {
            return res.status(404).json({ error: 'Bewerbung nicht gefunden' });
        }
        if (!req.user.isAdministrator && application.applicantUserID !== req.user.userID) {
            return res.status(403).json({ error: 'Keine Berechtigung' });
        }
        const updated = await updateApplication(req.params.applicationID, req.body);
        res.status(200).json(updated);
    } catch (error) {
        console.error("Fehler bei PUT /:applicationID:", error); // Löschen
        res.status(500).json({ error: 'Serverfehler' });
    }
});

// DELETE: Bewerbung löschen (Admin oder Bewerber selbst)
router.delete('/:applicationID', authenticateJWT, async (req: any, res: any) => {
    try {
        const application = await getApplicationById(req.params.applicationID);
        if (!application) {
            return res.status(404).json({ error: 'Bewerbung nicht gefunden' });
        }
        if (!req.user.isAdministrator && application.applicantUserID !== req.user.userID) {
            return res.status(403).json({ error: 'Keine Berechtigung' });
        }
        await deleteApplication(req.params.applicationID);
        res.status(204).send();
    } catch (error) {
        console.error("Fehler bei DELETE /:applicationID:", error);
        res.status(500).json({ error: 'Serverfehler' });
    }
});

export default router;