import { Request, Response } from "express";
import ZubService from './ZubService.service';

class ZubController{
    private ZubService: ZubService;

    constructor(ZubService: ZubService){
        this.ZubService = ZubService;
    }

    async getAll(req: Request, res: Response): Promise<void> {

        //await koristimo jer je ovo asinhroni metod koji moze da vrati Promise 
        //Ovaj metod uvek kada vraca Promise vraca samo rezultat, a nikada reject tog promisa (imamo samo "resolve" a nemamo "reject")
        //const zubi = await this.ZubService.getAll();

        //res.send(zubi);

        //promena zapisa iznad jer sada ZubModel moze vratiti prazan [] ili ZubModel[] a moze i reject-ovati usled greske

        this.ZubService.getAll()
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            })

        /*
        //Ako bi radili sa Promise-om koji ima i "resolve" i "reject" onda je bolje da pisemo na sledeci nacin :
        // "zubi" je rezultat dobijen iz poyvane getAll() metode
        this.ZubService.getAll()
            .then(zubi => {
                res.send(zubi);
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
      /*  const zub= await this.ZubService.getById(id);

        if (zub === null){
            return res.sendStatus(404);
        }

        res.send(zub);
       */

        this.ZubService.getById(id)
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

export default ZubController;