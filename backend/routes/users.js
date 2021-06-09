//modules - router express
const express = require("express");
const router = express.Router();

//association logique metier avec les différentes routes
const userCtrl = require("../controllers/user");

//importation des middlewares de vérification email et mdp
const passwordValidator = require("../middleware/password");
const emailValidator = require("../middleware/email");
const auth = require("../middleware/auth");

//création de deux routes POST car le front va aussi envoyer des infos ==> email et mdp
try {
    router.post("/signup", passwordValidator, emailValidator, userCtrl.signup); //localhost:5000/api/user/signup
    router.post("/login", userCtrl.login); //localhost:5000/api/user/login
    router.put("/:id/update", auth, userCtrl.update); //localhost:5000/api/user/92/update          92= id table users
    router.delete("/:id/delete", auth, userCtrl.delete); //localhost:5000/api/user/22/delete       22 = id table users
} catch (error) {
    console.log(error);
}

module.exports = router;
