const connectDb = require("../connectDb.js");
const mysql = require("mysql");

class Posts {
    constructor() {}

    //*************************************     POSTS     ***************************************************************************

    getAllPosts() {
        let sqlGetAllPosts =
            "SELECT posts.id, posts.userId, posts.title, posts.content, DATE_FORMAT(DATE(posts.date), '%d/%m/%Y') AS date, TIME(posts.date) AS time, posts.likes, users.lastName, users.firstName FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.date DESC";
        return new Promise((resolve) => {
            connectDb.query(sqlGetAllPosts, function (err, result, fields) {
                if (err) throw err;
                resolve(result);
                console.log(result);
            });
        });
    }

    createPost(sqlInserts) {
        let sqlCreatePost = "INSERT INTO posts VALUES(NULL, ?, ?, ?, NOW(), 0)";
        sqlCreatePost = mysql.format(sqlCreatePost, sqlInserts);
        return new Promise((resolve) => {
            connectDb.query(sqlCreatePost, function (err, result, fields) {
                if (err) throw err;
                resolve({ message: "Nouveau post créé" });
                console.log(sqlInserts);
            });
        });
    }

    updatePost(sqlInsertPostId, sqlInserts) {
        let sqlSelectAll = "SELECT * FROM posts where id = ?"; //on récupère toutes les données du post en fonction de son id
        sqlSelectAll = mysql.format(sqlSelectAll, sqlInsertPostId);
        console.log(sqlSelectAll);
        return new Promise((resolve, reject) => {
            connectDb.query(sqlSelectAll, function (err, result, fields) {
                if (err) throw err;
                if (sqlInserts[3] == result[0].userId) {
                    //on vérifie que le userId est bien celui contenu dans le token
                    let sqlUpdatePost = "UPDATE posts SET title = ?, content = ? WHERE id = ? AND userId = ?"; //on met à jour les données modifiées
                    console.log(sqlInserts[3]);
                    sqlUpdatePost = mysql.format(sqlUpdatePost, sqlInserts);
                    connectDb.query(sqlUpdatePost, function (err, result, fields) {
                        if (err) throw err;
                        resolve({ message: "Post mis à jour" });
                    });
                } else {
                    reject({ error: "Impossible de mettre à jour le post" });
                }
            });
        });
    }

    deletePost(sqlInsertPostId, sqlInserts) {
        let sqlSelectAll = "SELECT * FROM posts where id = ?"; //on récupère toutes les données du post en fonction de son id
        sqlSelectAll = mysql.format(sqlSelectAll, sqlInsertPostId);
        console.log(sqlSelectAll);
        return new Promise((resolve, reject) => {
            connectDb.query(sqlSelectAll, function (err, result, fields) {
                if (err) throw err;
                if (sqlInserts[1] == result[0].userId) {
                    //on vérifie que le userId est bien celui contenu dans le token
                    let sqlDeletePost = "DELETE FROM posts WHERE id = ? AND userId = ?"; //on supprime toutes les données
                    sqlDeletePost = mysql.format(sqlDeletePost, sqlInserts);
                    connectDb.query(sqlDeletePost, function (err, result, fields) {
                        if (err) throw err;
                        resolve({ message: "Post supprimé" });
                    });
                } else {
                    reject({ error: "Impossible de supprimer le post" });
                }
            });
        });
    }
    //*************************************     LIKES     ***************************************************************************

    createLike(sqlWhereToLike, sqlAddLike, liked) {
        let sqlInsertLikes = "INSERT INTO likes VALUES (NULL, ?, ?)";
        sqlInsertLikes = mysql.format(sqlInsertLikes, sqlWhereToLike);
        console.log(sqlInsertLikes);

        let sqlUpdateLikes = "UPDATE posts SET likes = ? WHERE id = ?";
        sqlUpdateLikes = mysql.format(sqlUpdateLikes, sqlAddLike);
        console.log(sqlUpdateLikes);

        let sqlDeleteLikes = "DELETE FROM likes WHERE postId = ? AND userId = ?";
        sqlDeleteLikes = mysql.format(sqlDeleteLikes, sqlWhereToLike);
        console.log(sqlDeleteLikes);

        return new Promise((resolve) => {
            connectDb.query(sqlUpdateLikes, function (err, result, fields) {
                if (err) throw err;
            });
            if (liked === false) {
                connectDb.query(sqlInsertLikes, function (err, result, fields) {
                    if (err) throw err;
                    resolve({ message: "Like !" });
                });
            }
            if (liked === true) {
                connectDb.query(sqlDeleteLikes, function (err, result, fields) {
                    if (err) throw err;
                    resolve({ message: "Like annulé!" });
                });
            }
        });
    }

    //*************************************     COMMENTS     ***************************************************************************

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

    createComment(sqlInserts) {
        let sqlCreateComment = "INSERT INTO comments VALUES(NULL, ?, ?, NOW(), ?)";
        sqlCreateComment = mysql.format(sqlCreateComment, sqlInserts);
        return new Promise((resolve) => {
            connectDb.query(sqlCreateComment, function (err, result, fields) {
                if (err) throw err;
                resolve({ message: "Nouveau commentaire créé" });
            });
        });
    }

    updateComment(sqlInsertCommentId, sqlInserts) {
        let sqlSelectAll = "SELECT * FROM comments where id = ?";
        sqlSelectAll = mysql.format(sqlSelectAll, sqlInsertCommentId);
        console.log(sqlSelectAll);
        return new Promise((resolve, reject) => {
            connectDb.query(sqlSelectAll, function (err, result, fields) {
                if (err) throw err;
                if (sqlInserts[2] == result[0].userId) {
                    let sqlUpdateComment = "UPDATE comments SET comContent = ? WHERE id = ? AND userId = ?";
                    sqlUpdateComment = mysql.format(sqlUpdateComment, sqlInserts);
                    connectDb.query(sqlUpdateComment, function (err, result, fields) {
                        if (err) throw err;
                        resolve({ message: "Commentaire mis à jour " });
                    });
                } else {
                    reject({ error: "Impossible de modifier le commentaire" });
                }
            });
        });
    }

    deleteComment(sqlInsertCommentId, sqlInserts) {
        let sqlSelectAll = "SELECT * FROM comments where id = ?";
        sqlSelectAll = mysql.format(sqlSelectAll, sqlInsertCommentId);
        console.log(sqlSelectAll);
        return new Promise((resolve, reject) => {
            connectDb.query(sqlSelectAll, function (err, result, fields) {
                if (err) throw err;
                if (sqlInserts[1] == result[0].userId) {
                    let sqlDeleteComment = "DELETE FROM comments WHERE id = ? AND userId = ?";
                    sqlDeleteComment = mysql.format(sqlDeleteComment, sqlInserts);
                    connectDb.query(sqlDeleteComment, function (err, result, fields) {
                        if (err) throw err;
                        resolve({ message: "Commentaire supprimé " });
                    });
                } else {
                    reject({ error: "Impossible de supprimer le commentaire" });
                }
            });
        });
    }
}

module.exports = Posts;
