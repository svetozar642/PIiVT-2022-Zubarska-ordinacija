import * as express from "express";

const application: express.Application = express();

application.use( (req,res) => {
    res.sendStatus(404);
});

application.listen(10000);
