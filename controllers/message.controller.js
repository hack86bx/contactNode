const Message = require("../models/message.model");


const moment = require('moment');

console.log("on passe dans controllers/message.controller.js");

exports.create = (req, res) => {
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
    };



exports.readAll = (req, res) => {
    console.log('GET /messages/ pour lire tous les messages');
    Message.readAll(function(err,data){
        if (err) {
            res.status(500).send({
                message: "erreur pendant la lecture de tous les messages"
});
 } else {
        console.log("Data =",+data);
        const titrePage = "liste des messages";
        moment.locale('fr');
        res.render('listeMessages.ejs', {title:titrePage, donnees:data, moment: moment});
    }

});
};
}