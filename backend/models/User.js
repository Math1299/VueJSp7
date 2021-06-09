const mysql = require("mysql");
const connectDb = require("../connectDb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" }); //indique le chemin pour la variable d'environnement

class User {
    constructor() {}
    signup(sqlInserts) {
        let sqlSignup = "INSERT INTO users VALUES(NULL, ?, ?, ?, ?, NULL)";
        sqlSignup = mysql.format(sqlSignup, sqlInserts);
        return new Promise((resolve, reject) => {
            connectDb.query(sqlSignup, function (err, result) {
                if (err) reject({ err });
                resolve({ message: "Nouvel utilisateur créé" });
            });
        });
    }
    login(sqlInserts, password) {
        let sqlLogin = "SELECT * FROM users WHERE email = ?"; //recherche dans la bdd en fonction de l'email rentré
        sqlLogin = mysql.format(sqlLogin, sqlInserts);
        console.log(sqlLogin);
        return new Promise((resolve, reject) => {
            //recherche si l'utilisateur existe ou pas
            connectDb.query(sqlLogin, function (err, result) {
                if (err) reject({ err });
                if (!result[0]) {
                    reject({ error: "Utilisateur inexistant" });
                } else {
                    bcrypt //si l'utilisateur est dans la bdd verification du mdp
                        .compare(password, result[0].password)
                        .then((valid) => {
                            if (!valid) return reject({ error: "Mot de passe incorrect" });
                            resolve({
                                userId: result[0].id,
                                token: jwt.sign({ userId: result[0].id, moderation: result[0].moderation }, process.env.JWT_KEY, { expiresIn: "24h" }),
                                moderation: result[0].moderation,
                                message: "Utilisateur connecté",
                            });
                            console.log(moderation);
                        })

                        .catch((error) => reject({ error }));
                }
            });
        });
    }

    update(sqlInserts) {
        let sqlUpdateUser = "UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?";
        sqlUpdateUser = mysql.format(sqlUpdateUser, sqlInserts);
        return new Promise((resolve, reject) => {
            connectDb.query(sqlUpdateUser, function (err, result) {
                if (err) return reject({ error: "Impossible de modifier cette utilisateur" });
                resolve({ message: "Données utilisateur mises à jour" });
            });
            // console.log(sqlInserts);
        });
    }

    delete(sqlInserts) {
        let sqlDeleteUser = "DELETE FROM users WHERE id = ?";
        sqlDeleteUser = mysql.format(sqlDeleteUser, sqlInserts);
        return new Promise((resolve, reject) => {
            connectDb.query(sqlDeleteUser, function (err, result) {
                if (err) return reject({ error: "Impossible de supprimer cette utilisateur" });
                resolve({ message: "Utilisateur supprimé" });
            });
            console.log(sqlInserts);
        });
    }
}

module.exports = User;
