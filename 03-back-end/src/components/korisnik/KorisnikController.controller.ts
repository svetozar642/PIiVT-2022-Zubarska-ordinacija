import { Request, Response } from "express";
import IAddKorisnik, { AddKorisnikValidator } from "./dto/IAddKorisnik.dto";
import KorisnikService, { DefaultKorisnikAdapterOptions } from './KorisnikService.service';


class KorisnikController{
    private KorisnikService: KorisnikService;

    constructor(KorisnikService: KorisnikService){
        this.KorisnikService = KorisnikService;
    }

    async getAll(req: Request, res: Response): Promise<void> {

        //await koristimo jer je ovo asinhroni metod koji moze da vrati Promise 
        //Ovaj metod uvek kada vraca Promise vraca samo rezultat, a nikada reject tog promisa (imamo samo "resolve" a nemamo "reject")
        //const korisnici = await this.KorisnikService.getAll();

        //res.send(korisnici);

        //promena zapisa iznad jer sada KorisnikModel moze vratiti prazan [] ili KorisnikModel[] a moze i reject-ovati usled greske

        this.KorisnikService.getAll()
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            })

        /*
        //Ako bi radili sa Promise-om koji ima i "resolve" i "reject" onda je bolje da pisemo na sledeci nacin :
        // "korisnici" je rezultat dobijen iz pozvane getAll() metode
        this.KorisnikService.getAll()
            .then(korisnici => {
                res.send(korisnici);
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
      /*  const korisnik = await this.KorisnikService.getById(id);

        if (korisnik === null){
            return res.sendStatus(404);
        }

        res.send(korisnik);
       */

        this.KorisnikService.getById(id)
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

    async getAllByKorisnicko_ime(req: Request, res:Response) {
        const korisnicko_ime : string = req.params?.korisnicko_ime;

        this.KorisnikService.getAllByKorisnicko_ime(korisnicko_ime, DefaultKorisnikAdapterOptions )
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

    async getAllByIme(req: Request, res:Response) {
        const ime : string = req.params?.ime;

        this.KorisnikService.getAllByIme(ime, DefaultKorisnikAdapterOptions )
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

    async getAllByPrezime(req: Request, res:Response) {
        const prezime : string = req.params?.prezime;

        this.KorisnikService.getAllByPrezime(prezime, DefaultKorisnikAdapterOptions )
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

    async getAllByEmail(req: Request, res:Response) {
        const email : string = req.params?.email;

        this.KorisnikService.getAllByEmail(email, DefaultKorisnikAdapterOptions )
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

    async getAllByJmbg(req: Request, res:Response) {
        const jmbg : string = req.params?.jmbg;

        this.KorisnikService.getAllByJmbg(jmbg, DefaultKorisnikAdapterOptions )
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

    async getAllByIs_active(req: Request, res:Response) {
        const is_active : number = +req.params?.is_active;

        this.KorisnikService.getAllByIs_active(is_active, DefaultKorisnikAdapterOptions )
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
        const data = req.body as IAddKorisnik; 

        // TODO : VALIDACIJA
        if ( !AddKorisnikValidator(data) ) {
            return res.status(400).send(AddKorisnikValidator.errors);
        }


        //Provera sta smo dobili od klijenta i sta prosledjujemo dalje metodi add()...
        /*console.log(data);*/

        this.KorisnikService.add(data)
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(400).send(error?.message);
            });

    }
}

export default KorisnikController;