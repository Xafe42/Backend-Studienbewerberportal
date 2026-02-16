Markdown
# 🖥️ Backend-Studienbewerberportal (REST-API)

## 📝 Projektbeschreibung
Dieses Projekt ist ein robuster REST-Server, der die Geschäftslogik für ein Studienbewerberportal bereitstellt. Entwickelt mit **Node.js**, **Express** und **TypeScript**, bildet es das Rückgrat für die Verwaltung von Bewerbungsprozessen, Studiengängen und Benutzerkonten.

Die Anwendung zeichnet sich durch eine sichere Architektur mit **HTTPS-Unterstützung**, **JWT-Authentifizierung** und einer strukturierten Datenbankintegration via **Mongoose** aus.

---

## 🚀 Kern-Features
- **Dual-Server-Betrieb:** Gleichzeitige Bereitstellung über HTTP und einen gesicherten HTTPS-Endpunkt (mit Zertifikatsvalidierung).
- **Sichere Authentifizierung:** Implementierung eines Login-Systems mit verschlüsselten Passwörtern (Bcrypt) und JSON Web Tokens (JWT).
- **Umfangreiche API:** Bereitstellung von Endpunkten für Benutzer, Studiengänge und komplexe Bewerbungsprozesse.
- **Flexible Konfiguration:** Einsatz eines dateibasierten Konfigurationssystems für Ports und Datenbank-URLs.
- **CORS-Handling:** Konfiguriertes Cross-Origin Resource Sharing für eine nahtlose Kommunikation mit dem Frontend.

---

## 🛠️ Tech-Stack
- **Runtime & Sprache:** [Node.js](https://nodejs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **Web-Framework:** [Express](https://expressjs.com/)
- **Datenbank:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Security:** [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Environment:** [dotenv](https://github.com/motdotla/dotenv) & [node-config](https://github.com/node-config/node-config)

---

## 📂 API-Endpunkte
Die API ist in verschiedene Meilensteine unterteilt:
- `/api/publicUsers`: Öffentlich zugängliche Benutzerinformationen.
- `/api/authenticate`: Login und Token-Generierung.
- `/api/users`: Verwaltung der Benutzerkonten.
- `/api/degreeCourses`: Management der verfügbaren Studiengänge.
- `/api/degreeCourseApplications`: Prozessierung von Studienbewerbungen.

---

## 🔧 Installation & Start

1. **Abhängigkeiten installieren:**
   ```bash
   npm install
Entwicklungsserver starten (mit Nodemon):

Bash
npm run startdev
Produktionsserver starten:

Bash
npm start
Hinweis: Stellen Sie sicher, dass die MongoDB-Instanz läuft und die Konfigurationsdaten in ./config/default.json sowie die Zertifikate in ./certificates/ korrekt hinterlegt sind.

Dieses Backend entstand als Teil des Moduls Web-Engineering an der Berliner Hochschule für Technik.
