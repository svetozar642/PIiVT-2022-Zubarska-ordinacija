import * as express from "express";

const application: express.Application = express();

application.use( (req,res) => {
    res.status(404).send("Fajl nije pronadjen na zadatoj putanji");
});

application.listen(10000);
