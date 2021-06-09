const mysql = require("mysql");
const connectDb = require("../connectDb");
require("dotenv").config({ path: "./config/.env" }); //indique le chemin pour la variable d'environnement

class Moderator {
    constructor() {}

    //*************************************     POSTS     ***************************************************************************

    getAllPosts() {
        let sqlGetAllPosts =
            "SELECT posts.id, posts.userId, posts.title, posts.content, DATE_FORMAT(posts.date, '%d/%m/%Y à %H:%i:%s') AS date, posts.likes, users.lastName, users.firstName, users.moderation FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date DESC";
        return new Promise((resolve) => {
            connectDb.query(sqlGetAllPosts, function (err, result, fields) {
                if (err) throw err;
                resolve(result);
                console.log(result);
                // console.log(sqlGetAllPosts);
            });
        });
    }

    deletePost(sqlInserts) {
        let sqlModDeletePost = "DELETE FROM posts WHERE id = ? ";
        sqlModDeletePost = mysql.format(sqlModDeletePost, sqlInserts);
        return new Promise((resolve) => {
            connectDb.query(sqlModDeletePost, function (err, result, fields) {
                if (err) throw err;
                resolve({ message: "Ce post à bien été supprimé par le moderateur" });
            });
        });
    }

    //*************************************     COMMENTAIRES     ***************************************************************************

    getAllComments(sqlInserts) {
        let sqlGetAllComments =
            "SELECT comments.id, comments.userId, comments.postid, DATE_FORMAT(comments.date, '%d/%m/%Y à %H:%i:%s') AS date, comments.comContent, users.firstName, users.lastName FROM comments JOIN users on comments.userId = users.id ORDER BY date ";
        sqlGetAllComments = mysql.format(sqlGetAllComments, sqlInserts);
        return new Promise((resolve) => {
            connectDb.query(sqlGetAllComments, function (err, result, fields) {
                if (err) throw err;
                resolve(result);
                console.log(result);
            });
        });
    }

    deleteComment(sqlInserts) {
        let sqlModDeleteComment = "DELETE FROM comments WHERE id = ? ";
        sqlModDeleteComment = mysql.format(sqlModDeleteComment, sqlInserts);
        return new Promise((resolve) => {
            connectDb.query(sqlModDeleteComment, function (err, result, fields) {
                if (err) throw err;
                resolve({ message: "Ce commentaire à bien été supprimé par le moderateur" });
            });
        });
    }
}

module.exports = Moderator;
