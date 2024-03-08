const mongoose = require('mongoose');
const Prdt = mongoose.Schema({
    nom: String,
    description: String,
    prix: Number,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});
const prouit=mongoose.model('produit',Prdt,'produit');
module.exports=prouit;