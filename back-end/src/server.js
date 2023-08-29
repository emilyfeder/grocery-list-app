const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const database = require('./database');

// Appi
const app = express();

app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json()) // for parsing application/json

app.get("/healthz", function(req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

app.get("/categories", async function(req, res) {
    res.json({
        categories: await database.listCategories()
    })
});

app.get("/items", async function(req, res) {
    //TODO: paginate. For now, limit
    res.json({
        items: await database.listItems()
    });
});

app.post("/items", async function(req, res) {
    //TODO: limit number of items in list
    const {name, categoryId, quantity} = req.body;
    if (!name || !categoryId) {
       res.status(400).send('Bad Request - `name` and `categoryId` are required params');
    }
    const result = await database.addItem({name, categoryId, quantity});
    res.json(result);
});

app.post("/items/complete", async function(req, res) {
    const {itemId} = req.body;
    if (!itemId) {
       res.status(400).send('Bad Request - `itemId` is a required param');
    }
    await database.markItemComplete(itemId);
    const item = await database.getItemById(itemId);
    res.json({
        item
    });
});

app.post("/items/uncomplete", async function(req, res) {
    const {itemId} = req.body;
    if (!itemId) {
       res.status(400).send('Bad Request - `itemId` is a required param');
    }
    await database.markItemUncomplete(itemId);
    const item = await database.getItemById(itemId);
    res.json({
        item
    });
});

module.exports = app;