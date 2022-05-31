import { Request, Response } from "express";
import Intervencija_logService from './Intervencija_logService.service';

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
}

export default Intervencija_logController;