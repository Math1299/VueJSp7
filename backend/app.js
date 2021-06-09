const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet"); //plugin de protection des headers
const path = require("path"); //permet d'accéder au chemin des fichiers
const ratelimit = require("express-rate-limit"); //limitation des demandes d'accès répétées à l'API

const limiter = ratelimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: "Too many request from this IP",
});

//importation de nos routers
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const moderatorRoutes = require("./routes/moderator");

const app = express();
app.use(helmet());

//middleware général pour éviter les pb de CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

// TEST
// app.use((req, res, next) => {
//     res.json({ message: "Votre requête a bien été reçue !" });
//     next();
// });

//méthodes d'express permettant de transformer le corps de la requête en JSON utilisable
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(limiter);

//nos routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes); //import des routes utilisateurs depuis le controller user.js
app.use("/api/post", postRoutes); //import des routes posts depuis le controller posts.js
app.use("/api/moderator", moderatorRoutes); // import des routes moderator depuis le controller moderator.js

//export de l'app
module.exports = app;
