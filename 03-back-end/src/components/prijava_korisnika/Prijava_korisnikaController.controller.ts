import { Request, Response } from "express";
import IAddPrijava_korisnika, { AddPrijava_korisnikaValidator, IAddPrijava_korisnikaDto } from "./dto/IAddPrijava_korisnika.dto";
import Prijava_korisnikaService , { DefaultPrijava_korisnikaAdapterOptions } from './Prijava_korisnikaService.service';
import * as bcrypt from "bcrypt";

class Prijava_korisnikaController{
    private Prijava_korisnikaService: Prijava_korisnikaService;

    constructor(Prijava_korisnikaService: Prijava_korisnikaService){
        this.Prijava_korisnikaService = Prijava_korisnikaService;
    }

    async getAll(req: Request, res: Response): Promise<void> {

        //await koristimo jer je ovo asinhroni metod koji moze da vrati Promise 
        //Ovaj metod uvek kada vraca Promise vraca samo rezultat, a nikada reject tog promisa (imamo samo "resolve" a nemamo "reject")
        //const prijave_korisnika = await this.Prijava_korisnikaService.getAll();

        //res.send(prijava_korisnika);

        //promena zapisa iznad jer sada KorisnikModel moze vratiti prazan [] ili Prijava_korisnikaModel[] a moze i reject-ovati usled greske

        this.Prijava_korisnikaService.getAll()
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            })

        /*
        //Ako bi radili sa Promise-om koji ima i "resolve" i "reject" onda je bolje da pisemo na sledeci nacin :
        // "korisnici" je rezultat dobijen iz poyvane getAll() metode
        this.Prijava_korisnikaService.getAll()
            .then(prijave_korisnika => {
                res.send(prijave_korisnika);
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
      /*  const prijava_korisnika = await this.Prijava_korisnikaService.getById(id);

        if (prijava_korisnika === null){
            return res.sendStatus(404);
        }

        res.send(prijava_korisnika);
       */

        this.Prijava_korisnikaService.getById(id)
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

        this.Prijava_korisnikaService.getAllByKorisnicko_ime(korisnicko_ime, DefaultPrijava_korisnikaAdapterOptions )
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
        const status : number = +req.params?.status;

        this.Prijava_korisnikaService.getAllByStatus(status, DefaultPrijava_korisnikaAdapterOptions )
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
        const data = req.body as IAddPrijava_korisnikaDto; 

        // TODO : VALIDACIJA
        if ( !AddPrijava_korisnikaValidator(data) ) {
            return res.status(400).send(AddPrijava_korisnikaValidator.errors);
        }

        const salt = bcrypt.genSaltSync(10);
        const lozinka_hash = bcrypt.hashSync(data.lozinka, salt);


        //Provera sta smo dobili od klijenta i sta prosledjujemo dalje metodi add()...
        /*console.log(data);*/


        //Kada zelimo da uvedemo mogucnost prosledjivanja opcionih polja koja mogu a i ne moraju da se dostave ...
        const serviceData: IAddPrijava_korisnika = {
            korisnicko_ime: data.korisnicko_ime,
            lozinka_hash: lozinka_hash,
            //logged_at : data.logged_at,
            status: data.status
        }

        if (data.logged_at !== undefined){
            serviceData.logged_at = data.logged_at;
        }

        this.Prijava_korisnikaService.add(serviceData)
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(400).send(error?.message);
            });

    }
}

export default Prijava_korisnikaController;