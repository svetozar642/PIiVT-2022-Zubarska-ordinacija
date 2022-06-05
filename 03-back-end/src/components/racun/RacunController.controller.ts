import { Request, Response } from "express";
import IAddRacun, { AddRacunValidator } from "./dto/IAddRacun.dto";
import RacunService, { DefaultRacunAdapterOptions } from './RacunService.service';
import { Senioritet, TipUsluge } from "./RacunModel.model";


class RacunController{
    private RacunService: RacunService;

    constructor(RacunService: RacunService){
        this.RacunService = RacunService;
    }

    async getAll(req: Request, res: Response): Promise<void> {

        //await koristimo jer je ovo asinhroni metod koji moze da vrati Promise 
        //Ovaj metod uvek kada vraca Promise vraca samo rezultat, a nikada reject tog promisa (imamo samo "resolve" a nemamo "reject")
        //const racuni = await this.RacunService.getAll();

        //res.send(racuni);

        //promena zapisa iznad jer sada RacunModel moze vratiti prazan [] ili RacunModel[] a moze i reject-ovati usled greske

        this.RacunService.getAll()
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            })

        /*
        //Ako bi radili sa Promise-om koji ima i "resolve" i "reject" onda je bolje da pisemo na sledeci nacin :
        // "racuni" je rezultat dobijen iz pozvane getAll() metode
        this.RacunService.getAll()
            .then(racuni => {
                res.send(racuni);
            })
            .catch(err => {
                res.status(500).send("Doslo je do greske na serveru...")
            })
        */
        
    }

    //Ako metoda ne vraca nista kao rezult (tipa "void") ne moramo da navodimo tip f-je Promise<void> 
    async getById(req: Request, res:Response){
        const id : number = +req.params?.id;
      
        // Posto await bi samo vratilo resolve (null ili nadjen trazeni objekat) iako npr. uhvatimo gresku (catch) , menjamo kod u nastavku..
      /*  const racun = await this.RacunService.getById(id);

        if (racun === null){
            return res.sendStatus(404);
        }

        res.send(racun);
       */

        this.RacunService.getById(id)
            .then( result => {
                if ( result === null){
                    return res.sendStatus(404);
                }

                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            });
    }

    async getAllByTipUsluge(req: Request, res:Response) {
        const tip_usluge : string = req.params?.tip_usluge;

        this.RacunService.getAllByTipUsluge(tip_usluge, DefaultRacunAdapterOptions )
            .then( result => {
                if ( result === null){
                    return res.sendStatus(404);
                }

                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            });
    }

    async getAllBySenioritet(req: Request, res:Response) {
        const senioritet : string = req.params?.senioritet;

        this.RacunService.getAllBySenioritet(senioritet, DefaultRacunAdapterOptions )
            .then( result => {
                if ( result === null){
                    return res.sendStatus(404);
                }

                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            });
    }

    async getAllByPacijentId(req: Request, res:Response) {
        const pacijent_id : number = +req.params?.pacijent_id;

        this.RacunService.getAllByPacijentId(pacijent_id, DefaultRacunAdapterOptions )
            .then( result => {
                if ( result === null){
                    return res.sendStatus(404);
                }

                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            });
    }

    async getAllByKorisnikId(req: Request, res:Response) {
        const korisnik_id : number = +req.params?.korisnik_id;

        this.RacunService.getAllByKorisnikId(korisnik_id, DefaultRacunAdapterOptions )
            .then( result => {
                if ( result === null){
                    return res.sendStatus(404);
                }

                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            });
    }


    async add(req: Request, res: Response){
        // "body" content ce automatski biti parsiran (Ako je poslat kao JSON bice pretvoren u objekat koji predstavlja to sto je JSON bio)
        //Ovo radi autmatski jer smo na pocetku u main.ts bili ukljicili da aplikacija (application) koristi (use) express.json()
        // To znaci da ako stigne request koji je oblika JSON bice automatski parsiran i mi ne moramo da ga tretiramo kao String i dodatno obradjujemo
        const data = req.body as IAddRacun; 

        // TODO : VALIDACIJA
        if ( !AddRacunValidator(data) ) {
            return res.status(400).send(AddRacunValidator.errors);
        }


        //Provera sta smo dobili od klijenta i sta prosledjujemo dalje metodi add()...
        /*console.log(data);*/

        this.RacunService.add(data)
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(400).send(error?.message);
            });

    }
}

export default RacunController;