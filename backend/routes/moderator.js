//modules - router express
const express = require("express");
const router = express.Router();

//association logique metier avec les différentes routes
const moderatorCtrl = require("../controllers/moderator");

//importation des middlewares de vérification
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

try {
    router.get("/post", auth, moderatorCtrl.getAllPosts); //localhost:5000/api/moderator/post
    router.delete("/post/:id", auth, moderatorCtrl.deletePost); //localhost:5000/api/moderator/post/93    93= id table posts

    router.get("/comment", auth, moderatorCtrl.getAllComments); //localhost:5000/api/moderator/comment
    router.delete("/comment/:id", auth, moderatorCtrl.deleteComment);
} catch (error) {
    console.log(error);
}

module.exports = router;
