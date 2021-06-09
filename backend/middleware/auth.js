require("dotenv").config({ path: "./config/.env" }); //indique le chemin pour la variable d'environnement
const jwt = require("jsonwebtoken");
const connectDb = require("../connectDb");
const mysql = require("mysql");

//méthode d'authentification par token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //référence au format du token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY); //on le décode avec verify
        const userId = decodedToken.userId; //on extrait le userId
        console.log(token);
        console.log(decodedToken);
        let sqlInserts = [userId];
        let sql = "SELECT COUNT(id) FROM users WHERE id=? ";
        sql = mysql.format(sql, sqlInserts);
        connectDb.query(sql, function (err, result) {
            if (err) reject({ error: "Erreur lors de votre inscription" });
            if (result[0]["COUNT(id)"] !== 1) {
                throw "TOKEN non valable";
            } else {
                next();
            }
        });
    } catch (error) {
        res.status(401).json({ error: error | "Requête non identifiée" });
    }
};
