const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const Produit = require("./produitSchema");

app.use(express.json());

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost/produit-service").then(() => {
    console.log("Database connected successfully");

}).catch(err => {
    console.error("Error connecting to database:", err);
});

app.post('/produit/ajouter', (req, res, next) => {
    const { nom, description, prix } = req.body;
    const newProduit = new Produit({
        nom,
        description,
        prix
    });
    newProduit.save()
        .then(prdt => res.status(200).json(prdt))
        .catch(err => res.status(400).json({ err }));
});

app.post("/produit/acheter", (req, res, next) => {
    const { ids } = req.body;

    Produit.find({ _id: { $in: ids } })
        .then(prdt => res.status(200).json(prdt))
        .catch(err => res.status(400).json({ err }));

});
app.listen(PORT, () => {
    console.log('Server listening on localhost:', PORT);
});
