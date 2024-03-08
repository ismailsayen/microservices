const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Commande = require("./CommandeSchema");
const PORT = 4001;
const axios = require('axios');
app.use(express.json());
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost/commande-service").then(() => {
    console.log("Database connected successfully");
}).catch(err => {
    console.error("Error connecting to database:", err);
});
function prixTotal(produits) {
    let total = 0;
    for (let t = 0; t < produits.length; ++t) {
        total += produits[t].prix;
    }
    console.log("prix total :" + total);
    return total;
}
async function httpRequest(ids) {
    try {
        const URL = "http://localhost:4000/produit/acheter";
        const response = await axios.post(URL, { ids: ids }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        console.log(ids);
        return prixTotal(response.data);
    } catch (error) {
        console.error(error);
    }
}
app.post("/commande/ajouter", async (req, res, next) => {
    const { ids, email_utilisateur } = req.body;

    httpRequest(req.body.ids).then(total => {
        const newCommande = new Commande({
            produits: ids,
            email_utilisateur: email_utilisateur,
            prix_total: total,
        });
        newCommande.save()
            .then(commande => res.status(201).json(commande))
            .catch(error => res.status(400).json({ error }));
    });
});

app.listen(PORT, () => {
    console.log('Server listening on localhost:', PORT);
});
