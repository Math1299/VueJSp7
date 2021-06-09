//MODEL POUR LES MOTS DE PASSE

const passwordValidator = require("password-validator");

const schema = new passwordValidator();

schema
    .is()
    .min(8) // 8 caractères minimun
    .is()
    .max(20) // 20 caractères maximum
    .has()
    .uppercase(1) // Doit contenir 1 majuscule
    .has()
    .lowercase() // Doit contenir des minuscules
    .has()
    .digits(1) // Doit contenir 1 chiffre
    .has()
    .not()
    .spaces() // Ne doit pas contenir d'espace
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123", "123456"]); // Blacklist

module.exports = schema;
