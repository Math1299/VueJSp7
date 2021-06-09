//modules - router express
const express = require("express");
const router = express.Router();

//association logique metier avec les différentes routes
const postsCtrl = require("../controllers/posts");

//importation des middlewares de vérification
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

try {
    //POSTS

    router.get("/", auth, postsCtrl.getAllPosts); //localhost:5000/api/post
    router.post("/", auth, postsCtrl.createPost); //localhost:5000/api/post
    router.put("/:id/update", auth, postsCtrl.updatePost); //localhost:5000/api/post/93/update           93=id de la table posts
    router.delete("/:id/delete", auth, postsCtrl.deletePost); //localhost:5000/api/post/95/delete        95= id de la table posts

    //LIKES

    router.get("/:id/like", auth, postsCtrl.createLike); //localhost:5000/api/post/93/update           93=id de la table posts
    // router.get("/likes", auth, postsCtrl.getAllLikes);

    //COMMENTS

    router.get("/comments", auth, postsCtrl.getAllComments); //localhost:5000/api/post/comments
    router.post("/:id/comment", auth, postsCtrl.createComment); //localhost:5000/api/post/93/comments                    93=id de la table posts
    router.put("/:id/updateComment", auth, postsCtrl.updateComment); //localhost:5000/api/post/79/updateComment          79=id de la table comments
    router.delete("/:id/deleteComment", auth, postsCtrl.deleteComment); //localhost:5000/api/post/92/deleteComment       92=id de la table comments
} catch (error) {
    console.log(error);
}

module.exports = router;
