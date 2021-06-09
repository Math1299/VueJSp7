const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" }); //indique le chemin pour la variable d'environnement

const Posts = require("../models/Post");
let posts = new Posts();

//********************************************   POSTS   ******************************************************************* */

//middleware pour récupérer tous les posts des utilisateurs

exports.getAllPosts = (req, res, next) => {
    posts
        .getAllPosts()
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        });
};

//middleware pour créer un POST

exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let title = req.body.title;
    let content = req.body.content;
    let sqlInserts = [userId, title, content];
    posts.createPost(sqlInserts).then((response) => {
        res.status(201).json(JSON.stringify(response));
    });
};

//middleware pour modifier un POST

exports.updatePost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let title = req.body.title;
    let content = req.body.content;
    let postId = req.params.id;
    let sqlInsertPostId = [postId];
    let sqlInserts = [title, content, postId, userId];
    console.log(sqlInserts);
    posts
        .updatePost(sqlInsertPostId, sqlInserts)
        .then((response) => {
            console.log(response);
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        });
};

//middleware pour supprimer un POST

exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let postId = req.params.id;
    let sqlInsertPostId = [postId];
    let sqlInserts = [postId, userId];
    console.log(sqlInserts);
    posts
        .deletePost(sqlInsertPostId, sqlInserts)
        .then((response) => {
            console.log(response);
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        });
};

//********************************************   LIKE   ******************************************************************* */

//middleware pour ajouter un like

exports.createLike = (req, res, next) => {
    let userId = req.body.userId;
    let likes = req.body.likes;
    let postId = req.body.postId;
    let sqlWhereToLike = [postId, userId];
    let sqlAddLike = [likes, postId];
    console.log(sqlWhereToLike);
    console.log(sqlAddLike);
    posts.createLike(sqlWhereToLike, sqlAddLike, req.body.liked).then((response) => {
        console.log(createLike);
        res.status(201).json(JSON.stringify(response));
    });
};

//********************************************   COMMENTS   ******************************************************************* */

//middleware pour récupérer tous les COMMENTS

exports.getAllComments = (req, res, next) => {
    posts
        .getAllComments()
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        });
};

//middleware pour créer un commentaire

exports.createComment = (req, res, next) => {
    let postId = req.params.id;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let content = req.body.comContent;
    let sqlInserts = [userId, postId, content];
    console.log(sqlInserts);
    posts.createComment(sqlInserts).then((response) => {
        res.status(201).json(JSON.stringify(response));
    });
};

//middleware pour modifier un commentaire

exports.updateComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let content = req.body.comContent;
    let commentId = req.params.id;
    console.log(commentId);
    let sqlInsertCommentId = [commentId];
    let sqlInserts = [content, commentId, userId];
    console.log(sqlInserts);
    posts
        .updateComment(sqlInsertCommentId, sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        });
};

//middleware pour supprimer un commentaire

exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userId = decodedToken.userId;
    let commentId = req.params.id;
    console.log(commentId);
    let sqlInsertCommentId = [commentId];
    let sqlInserts = [commentId, userId];
    console.log(sqlInserts);
    posts
        .deleteComment(sqlInsertCommentId, sqlInserts)
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        });
};
