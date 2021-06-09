//validation des mots de passe

const passwordSchema = require("../models/Password");

//logique de validation

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        console.log("Mot de passe invalide!");
        return res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères dont 1 majuscule et 1 chiffre" });
    } else {
        next();
    }
};
