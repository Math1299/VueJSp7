const multer = require("multer");

//dictionnaire pour les extensions des images
const MIME_TYPES = {
    "images/jpg": "jpg",
    "images/jpeg": "jpg",
    "images/png": "png",
};

//la const storage est passée à MULTER comme config avec la logique d'enregistrement
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        //destination de l'enregistrement des fichiers
        callback(null, "images");
    },
    filename: (req, res, callback) => {
        //le nom du fichier
        const name = file.originalname.split(" ").join("_"); //remplace les espaces par des _
        const extension = MIME_TYPES[file.mimetype]; //défini le type
        callback(null, name + Date.now() + "." + extension); //création du nom complet du fichier
    },
});

module.exports = multer({ storage }).single("image");
