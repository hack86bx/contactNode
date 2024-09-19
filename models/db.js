// importer le module MySQL
const mysql = require("mysql");

// importer le fichier de connexion
const dbConfig = require("../config/dbconfig.js");
const dbconfig = require("../config/dbconfig.js");

// Chargement de la configuration pour la connexion
const connection = mysql.createConnection({
    host: dbConfig.DB_HOST,
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME,
    port: dbconfig.DB_PORT
});

// Connexion
connection.connect(function(error){
    if (error) throw error; // s'il y a un erreur lors de la connexion, on arrête ici

    // sinon, tout se passe bien et on est connecté
    console.log("Vous êtes connecté à la base de données...");
});

// on exporte ce module de connexion pour les autres parties de l'application
module.exports = connection;