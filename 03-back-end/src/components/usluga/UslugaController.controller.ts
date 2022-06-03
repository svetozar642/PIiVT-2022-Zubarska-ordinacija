import { Request, Response } from "express";
import UslugaService, { DefaultUslugaAdapterOptions } from './UslugaService.service';

class UslugaController{
    private UslugaService: UslugaService;

    constructor(UslugaService: UslugaService){
        this.UslugaService = UslugaService;
    }

    async getAll(req: Request, res: Response): Promise<void> {

        //await koristimo jer je ovo asinhroni metod koji moze da vrati Promise 
        //Ovaj metod uvek kada vraca Promise vraca samo rezultat, a nikada reject tog promisa (imamo samo "resolve" a nemamo "reject")
        //const zubi = await this.ZubService.getAll();

        //res.send(usluge);

        //promena zapisa iznad jer sada ZubModel moze vratiti prazan [] ili UslugaModel[] a moze i reject-ovati usled greske

        this.UslugaService.getAll(DefaultUslugaAdapterOptions)
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            })

        /*
        //Ako bi radili sa Promise-om koji ima i "resolve" i "reject" onda je bolje da pisemo na sledeci nacin :
        // "usluge" je rezultat dobijen iz pozvane getAll() metode
        this.UslugaService.getAll()
            .then(usluge => {
                res.send(usluge);
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
      /*  const usluga= await this.UslugaService.getById(id);

        if (zub === null){
            return res.sendStatus(404);
        }

        res.send(usluga);
       */

        this.UslugaService.getById(id, DefaultUslugaAdapterOptions)
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
}

export default UslugaController;