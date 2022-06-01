import { Request, Response } from "express";
import IAddIntervencija_log, { AddIntervencija_logValidator } from "./dto/IAddIntervencija_log.dto";
import Intervencija_logService, { DefaultIntervencija_logAdapterOptions } from './Intervencija_logService.service';

class Intervencija_logController{
    private Intervencija_logService: Intervencija_logService;

    constructor(Intervencija_logService: Intervencija_logService){
        this.Intervencija_logService = Intervencija_logService;
    }

    async getAll(req: Request, res: Response): Promise<void> {

        //await koristimo jer je ovo asinhroni metod koji moze da vrati Promise 
        //Ovaj metod uvek kada vraca Promise vraca samo rezultat, a nikada reject tog promisa (imamo samo "resolve" a nemamo "reject")
        //const intervencije = await this.Intervencija_logService.getAll();

        //res.send(intervencije);

        //promena zapisa iznad jer sada ZubModel moze vratiti prazan [] ili Intervencija_logModel[] a moze i reject-ovati usled greske

        this.Intervencija_logService.getAll()
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            })

        /*
        //Ako bi radili sa Promise-om koji ima i "resolve" i "reject" onda je bolje da pisemo na sledeci nacin :
        // "intervencije" je rezultat dobijen iz poyvane getAll() metode
        this.Intervencija_logService.getAll()
            .then(intervencije => {
                res.send(intervencije);
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
      /*  const intervencija= await this.Intervencija_logService.getById(id);

        if (intervencija === null){
            return res.sendStatus(404);
        }

        res.send(intervencija);
       */

        this.Intervencija_logService.getById(id)
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

        this.Intervencija_logService.getAllByZubId(id, DefaultIntervencija_logAdapterOptions )
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
        const data = req.body as IAddIntervencija_log; 

        // TODO : VALIDACIJA
        if ( !AddIntervencija_logValidator(data) ) {
            return res.status(400).send(AddIntervencija_logValidator.errors);
        }


        //Provera sta smo dobili od klijenta i sta prosledjujemo dalje metodi add()...
        /*console.log(data);*/

        this.Intervencija_logService.add(data)
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(400).send(error?.message);
            });

    }
}

export default Intervencija_logController;