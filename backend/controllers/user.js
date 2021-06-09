const bcrypt = require("bcrypt"); //package de cryptage des mdp
const jwt = require("jsonwebtoken"); //package pour encoder les tokens
// const maskemail = require("maskemail"); //permet de masquer les emails dans la bdd
require("dotenv").config({ path: "./config/.env" }); //indique le chemin pour la variable d'environnement

const User = require("../models/User");
let user = new User();

//middleware pour l'enregistrement de nouveaux utilisateurs et hashage du mot de passe
exports.signup = (req, res, next) => {
    console.log(req.body); //visualisation des données entrées

    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let email = req.body.email;
    let password = req.body.password;
    bcrypt
        .hash(password, 10)
        .then((hash) => {
            let sqlInserts = [lastName, firstName, email, hash];
            user.signup(sqlInserts)
                .then(() => {
                    res.status(200).json({ message: "Nouvel utilisateur créé " });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(400).json({ error });
                });
        })
        .catch((error) => res.status(500).json({ error }));
};

//middleware pour connecter les utilisateurs existants
exports.login = (req, res, next) => {
    console.log(req.body); //visualisation des données entrées
    let email = req.body.email; //on récupère email et mdp afin de vérfier la correspondance
    let password = req.body.password;
    let sqlInserts = [email];
    user.login(sqlInserts, password)
        .then((userIdAndToken) => {
            res.status(200).json(JSON.stringify(userIdAndToken));
            console.log(userIdAndToken);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error });
        });
};

//middleware pour modifier les utilisateurs existants
exports.update = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let sqlInserts = [firstName, lastName, email, userId];
    console.log(sqlInserts);
    user.update(sqlInserts)
        .then((pb) => {
            res.status(200).json(JSON.stringify(pb));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error });
        });
};

//middleware pour effacer un utilisateur existant
exports.delete = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    user.delete(sqlInserts)
        .then(() => {
            res.status(200).json({ message: "Utilisateur supprimé" });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error });
        });
};
