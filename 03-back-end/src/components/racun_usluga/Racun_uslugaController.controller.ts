import { Request, Response } from "express";
import IAddRacun_usluga, { AddRacun_uslugaValidator } from "./dto/IAddRacun_usluga.dto";
import Racun_uslugaService, { DefaultRacun_uslugaAdapterOptions } from './Racun_uslugaService.service';

class Racun_uslugaController{
    private Racun_uslugaService: Racun_uslugaService;

    constructor(Racun_uslugaService: Racun_uslugaService){
        this.Racun_uslugaService = Racun_uslugaService;
    }

    async getAll(req: Request, res: Response): Promise<void> {

        //await koristimo jer je ovo asinhroni metod koji moze da vrati Promise 
        //Ovaj metod uvek kada vraca Promise vraca samo rezultat, a nikada reject tog promisa (imamo samo "resolve" a nemamo "reject")
        //const racuni_usluge = await this.Racun_uslugaService.getAll();

        //res.send(racuni_usluge);

        //promena zapisa iznad jer sada ZubModel moze vratiti prazan [] ili Racun_uslugaModel[] a moze i reject-ovati usled greske

        this.Racun_uslugaService.getAll()
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            })

        /*
        //Ako bi radili sa Promise-om koji ima i "resolve" i "reject" onda je bolje da pisemo na sledeci nacin :
        // "racuni_usluge" je rezultat dobijen iz poyvane getAll() metode
        this.Racun_uslugaService.getAll()
            .then(racuni_usluge => {
                res.send(racuni_usluge);
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
      /*  const racun_usluga= await this.Racun_uslugaService.getById(id);

        if (racun_usluga === null){
            return res.sendStatus(404);
        }

        res.send(racun_usluga);
       */

        this.Racun_uslugaService.getById(id)
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

    async getAllByZubId(req: Request, res:Response) {
        const id : number = +req.params?.id;

        this.Racun_uslugaService.getAllByZubId(id, DefaultRacun_uslugaAdapterOptions )
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

    async getAllByUslugaId(req: Request, res:Response) {
        const id : number = +req.params?.id;

        this.Racun_uslugaService.getAllByUslugaId(id, DefaultRacun_uslugaAdapterOptions )
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
        const id : number = +req.params?.id;

        this.Racun_uslugaService.getAllByPacijentId(id, DefaultRacun_uslugaAdapterOptions )
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

    async getAllByRacunId(req: Request, res:Response) {
        const id : number = +req.params?.id;

        this.Racun_uslugaService.getAllByRacunId(id, DefaultRacun_uslugaAdapterOptions )
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
        const data = req.body as IAddRacun_usluga; 

        // TODO : VALIDACIJA
        if ( !AddRacun_uslugaValidator(data) ) {
            return res.status(400).send(AddRacun_uslugaValidator.errors);
        }


        //Provera sta smo dobili od klijenta i sta prosledjujemo dalje metodi add()...
        /*console.log(data);*/

        this.Racun_uslugaService.add(data)
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(400).send(error?.message);
            });

    }
}

export default Racun_uslugaController;