const jwt = require("jsonwebtoken"); //package pour encoder les tokens
require("dotenv").config({ path: "./config/.env" }); //indique le chemin pour la variable d'environnement

const Moderator = require("../models/Moderator");
let moderator = new Moderator();

//********************************************POSTS******************************************************************* */

//middleware pour récupérer tous les posts des utilisateurs

exports.getAllPosts = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const moderation = decodedToken.moderation;
    console.log(moderation); //vérification que le user est bien le modérateur
    if (moderation == 1) {
        console.log(moderation);
        moderator.getAllPosts().then((response) => {
            res.status(200).json(JSON.stringify(response));
        });
    } else {
        res.status(400).json({ error: "Vous n'êtes pas le moderateur" });
    }
};

//middleware pour supprimer des posts d'utilisateurs

exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const moderation = decodedToken.moderation;
    console.log(moderation);
    //vérification que le user est bien le modérateur
    if (moderation == 1) {
        console.log(moderation);
        let postId = req.params.id;
        let sqlInserts = [postId];
        moderator.deletePost(sqlInserts).then((response) => {
            res.status(200).json(JSON.stringify(response));
        });
    } else {
        res.status(400).json({ error: "Vous n'êtes pas le moderateur" });
    }
};
//********************************************   COMMENTS   ******************************************************************* */

//middleware pour récupérer tous les COMMENTS

exports.getAllComments = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const moderation = decodedToken.moderation;
    console.log(moderation);
    //vérification que le user est bien le modérateur
    if (moderation == 1) {
        console.log(moderation);
        moderator.getAllComments().then((response) => {
            res.status(200).json(JSON.stringify(response));
        });
    } else {
        res.status(400).json({ error: "Vous n'êtes pas le moderateur" });
    }
};

//middleware pour supprimer des COMMENTS des utilisateurs

exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const moderation = decodedToken.moderation;
    console.log(moderation);
    //vérification que le user est bien le modérateur
    if (moderation == 1) {
        console.log(moderation);
        let commentId = req.params.id;
        let sqlInserts = [commentId];
        moderator.deleteComment(sqlInserts).then((response) => {
            res.status(200).json(JSON.stringify(response));
        });
    } else {
        res.status(400).json({ error: "Vous n'êtes pas le moderateur" });
    }
};
