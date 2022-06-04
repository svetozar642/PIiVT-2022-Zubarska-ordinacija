import { Request, Response } from "express";
import UslugaService, { DefaultUslugaAdapterOptions } from './UslugaService.service';
import IAddUsluga, { AddUslugaValidator } from './dto/IAddUsluga.dto';

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

    async getAllByNaziv(req: Request, res:Response) {
        const naziv: string = req.params?.naziv;

        this.UslugaService.getAllByNaziv(naziv, DefaultUslugaAdapterOptions )
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

    async getAllBySifra_usluge(req: Request, res:Response) {
        const sifra_usluge: string = req.params?.sifra_usluge;

        this.UslugaService.getAllBySifra_usluge(sifra_usluge, DefaultUslugaAdapterOptions )
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

    async getAllByKategorija(req: Request, res:Response) {
        const kategorija: string = req.params?.kategorija;

        this.UslugaService.getAllByKategorija(kategorija, DefaultUslugaAdapterOptions )
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

    async getAllByStatus(req: Request, res:Response) {
        const status: string = req.params?.status;

        this.UslugaService.getAllByStatus(status, DefaultUslugaAdapterOptions )
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
        const data = req.body as IAddUsluga; 

        // TODO : VALIDACIJA
        if ( !AddUslugaValidator(data) ) {
            return res.status(400).send(AddUslugaValidator.errors);
        }


        //Provera sta smo dobili od klijenta i sta prosledjujemo dalje metodi add()...
        /*console.log(data);*/

        this.UslugaService.add(data)
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(400).send(error?.message);
            });

    }
}

export default UslugaController;