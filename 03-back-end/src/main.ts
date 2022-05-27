import * as express from "express";
import * as cors from "cors";
import IConfig from './config/IConfig.interface';
import { DevConfig } from "./config/configs";
import ZubController from './components/tooth/ZubController.controller';
import ZubService from './components/tooth/ZubService.service';
import * as fs from "fs";
import * as morgan from "morgan";

const config: IConfig = DevConfig;

 //Da bismo kreirali folder "logs" ukoliko ne postoji gde cemo cuvati logove request-ova (ovo izvrsavamo na pocetku)
fs.mkdirSync("./logs", {
    mode: 0o755,
    recursive: true
});

const application: express.Application = express();

//Da bi vezali morgan moramo da imamo prvo kreiranu aplikaciju i zato ovo pisemo nakon izvrsene naredbe iznad ...
// Napomena: Uvek template elementi idu nakon ":" pa onda tek navodimo koji element zelimo
application.use(morgan(":date[iso]\t:remote-addr\t:method\t:url\t:status\t:res[content-length]\t:response-time ms", {
    stream: fs.createWriteStream("./logs/access.log"),

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

const zubService: ZubService = new ZubService();
const zubController: ZubController = new ZubController(zubService);
application.get("/api/zub",     zubController.getAll.bind(zubController));
application.get("/api/zub/:id", zubController.getById.bind(zubController));

application.use( (req,res) => {
    res.status(404).send("Fajl nije pronadjen na zadatoj putanji");
});

application.listen(config.server.port);
