import { Request, Response } from "express";
import IAddKarton, { AddKartonValidator } from "./dto/IAddKarton.dto";
import KartonService, { DefaultKartonAdapterOptions } from './KartonService.service';


class KartonController{
    private KartonService: KartonService;

    constructor(KartonService: KartonService){
        this.KartonService = KartonService;
    }

    async getAll(req: Request, res: Response): Promise<void> {

        //await koristimo jer je ovo asinhroni metod koji moze da vrati Promise 
        //Ovaj metod uvek kada vraca Promise vraca samo rezultat, a nikada reject tog promisa (imamo samo "resolve" a nemamo "reject")
        //const kartoni = await this.KartonService.getAll();

        //res.send(kartoni);

        //promena zapisa iznad jer sada KorisnikModel moze vratiti prazan [] ili KartonModel[] a moze i reject-ovati usled greske

        this.KartonService.getAll()
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            })

        /*
        //Ako bi radili sa Promise-om koji ima i "resolve" i "reject" onda je bolje da pisemo na sledeci nacin :
        // "kartoni" je rezultat dobijen iz pozvane getAll() metode
        this.KartonService.getAll()
            .then(kartoni => {
                res.send(kartoni);
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
      /*  const karton = await this.KartonService.getById(id);

        if (karton === null){
            return res.sendStatus(404);
        }

        res.send(karton);
       */

        this.KartonService.getById(id)
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

    async getAllByIntervencija_log(req: Request, res:Response) {
        const intervencija_log_id : number = +req.params?.intervencija_log_id;

        this.KartonService.getAllByIntervencija_log(intervencija_log_id, DefaultKartonAdapterOptions )
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

        this.KartonService.getAllByPacijentId(pacijent_id, DefaultKartonAdapterOptions )
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
        const data = req.body as IAddKarton; 

        // TODO : VALIDACIJA
        if ( !AddKartonValidator(data) ) {
            return res.status(400).send(AddKartonValidator.errors);
        }


        //Provera sta smo dobili od klijenta i sta prosledjujemo dalje metodi add()...
        /*console.log(data);*/

        this.KartonService.add(data)
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(400).send(error?.message);
            });

    }
}

export default KartonController;