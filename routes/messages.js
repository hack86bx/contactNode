var express = require('express');
var router = express.Router();

// importation de la connexion DB via le modèle
const Message = require('../models/message.model');

/* Toutes les routes décrites dans ce fichier correspondent à des URL commençant par : localhost:8080/messages/... */
var moment = require('moment');
// route pour l'URL : localhost:8080/messages/
router.get('/', function(req, res) {
    console.log('GET /messages/ pour lire tous les messages');
    Message.readAll(function(err,data){
        if (err) {
            res.status(500).send({
                message: "erreur pendant la lecture de tous les messages"
});
 } else {
        console.log("Data =",+data);
        const titrePage = "liste des messages";
        res.render('listeMessages.ejs', {title:titrePage, donnees:data, moment: moment});
    }
});
});

// route pour l'URL : localhost:8080/messages/create
router.post('/create', function(req,res){
    console.log('POST /create pour écrire un message');
    var titrePage = "Formulaire reçu";
    var lenom = req.body.nom;
    var lemessage = req.body.msg;

    // Valider le contenu du formulaire
    if ((!req.body)||(lenom=="")||(lemessage=="")) {
        console.log("Le formulaire est incomplet !");
        res.redirect('/contact');   // retour vers le formulaire
    } else {
        console.log('this here :',req.body);

        // créer un message avec son modèle
        const unMsg = new Message({
            nom: lenom,
            msg: lemessage
        });
console.log(unMsg);
        // utiliser la méthode create du modèle Message
        Message.create(unMsg, function(err,data){
            if (err) {
                res.status(500).send({
                    message: err
                });
            } else {
                res.render('confirmation.ejs',{title:titrePage,nom:unMsg.nom,msg:unMsg.msg});
            }
        });
    }
});

module.exports = router;