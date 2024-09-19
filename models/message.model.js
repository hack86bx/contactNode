// on charge le module de connexion à la DB
const db = require("./db.js");
console.log("Je passe dans models/message.model.js");

// Constructeur
var Message = function(lemessage) {
    this.nom = lemessage.nom;
    this.msg = lemessage.msg;
    //this.date_creation = new Date();
}

// Méthode pour créer un message
Message.create = function(newMsg, resultat) {
    console.log("jhvgjhg",newMsg.msg);
    db.query("INSERT INTO messages(nom,message) VALUES(?,?);", [newMsg.nom, newMsg.msg], function(err,res){
        // Si erreur pendant l'insertion => err
        if (err) {
            console.log("Erreur lors de l'insertion dans Message.create : " + err);
            resultat(err,null);
            return;
        }
        // Si OK => res
        console.log("OK dans Message.create : " + res);
        resultat(null,res);
    });
};

// Méthode pour lire les messages
Message.readAll = function(resultat) {
    db.query("SELECT * FROM messages ORDER BY datemessage DESC", function(err,res){
        // Si erreur pendant la lecture => err
        if (err) {
            console.log("Erreur lors de la lecture dans Message.readAll : " + err);
            resultat(err,null);
            return;
        }
        // Si OK => res
        console.log("OK dans Message.readAll : " + res);
        resultat(null,res);
    });
};

module.exports = Message;