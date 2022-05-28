import * as express from "express";
import * as cors from "cors";
import IConfig from './common/IConfig.interface';
import { DevConfig } from "./configs";
import * as fs from "fs";
import * as morgan from "morgan";
import ZubRouter from './components/tooth/ZubRouter.router';
import IApplicationResources from './common/IApplicationResources.interface';
import * as mysql2 from 'mysql2/promise';
import { mainModule } from "process";

async function main(){
    const config: IConfig = DevConfig;

    //Da bismo kreirali folder "logs" ukoliko ne postoji gde cemo cuvati logove request-ova (ovo izvrsavamo na pocetku)
    fs.mkdirSync(config.logging.path, {
        mode: 0o755,
        recursive: true
    });

    const applicationResources: IApplicationResources = {
        databaseConnection: await mysql2.createConnection({
            host: config.database.host,
            port: config.database.port,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
            charset: config.database.charset,
            timezone: config.database.timezone,
            //supportBigNumbers: config.database.supportBigNumbers,
        })
    }

    const application: express.Application = express();

    //Da bi vezali morgan moramo da imamo prvo kreiranu aplikaciju i zato ovo pisemo nakon izvrsene naredbe iznad ...
    // Napomena: Uvek template elementi idu nakon ":" pa onda tek navodimo koji element zelimo
    application.use(morgan(config.logging.format, {
        stream: fs.createWriteStream(config.logging.path + "/" + config.logging.filename, { flags: 'a' }),

    }))

    //Aplikacija koristi express json parser - Ako saljemo json fajlove da budu header-om obelezeni
    application.use(express.json()); 
    //Aplikacija koristi cors biblioteku za "cross origin" skripting
    /*Funkcija cors() obezbedjuje da ne moze da se izvrsi javascript inicijalizovan patch i AJAX request ka istom 
    resursu na domenu i portu ukoliko nije taj resurs dopremljen sa istog domena i porta i izvrsava se sa siste stranice */ 
    application.use(cors());

    //Primer statickog serviranja sadrzaja (ne mozemo tek tako da navedemo putanju do sadrzaja u pretrazivacu) :
    application.use(config.server.static.route, express.static(config.server.static.path, {
        index: config.server.static.index,
        dotfiles: config.server.static.dotfiles,
        cacheControl: config.server.static.cacheControl,
        etag: config.server.static.etag,
        maxAge: config.server.static.maxAge
    }));

    ZubRouter.setupRoutes(application, applicationResources);

    application.use( (req,res) => {
        res.status(404).send("Fajl nije pronadjen na zadatoj putanji");
    });

    application.listen(config.server.port);
}

main();
