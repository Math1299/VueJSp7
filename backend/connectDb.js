require("dotenv").config({ path: "./config/.env" }); //indique le chemin pour la variable d'environnement
const mysql = require("mysql"); //utilisation de la base de données

//connection à la base de données
let connectDb = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connectDb.connect(function (err) {
    if (err) {
        console.log("Erreur de connexion à la base de données", err);
        return;
    }
    console.log("Connecté à la base de données MySQL");
});

module.exports = connectDb;
