const mongoose = require("mongoose");
const CommandeSchema = mongoose.Schema({
    produits: {
        type: [String]
    },
    email_utilisateur: String,
    prix_total: Number,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});
const commande = mongoose.model("commande", CommandeSchema, "commande");
module.exports = commande;