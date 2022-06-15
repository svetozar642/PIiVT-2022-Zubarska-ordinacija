import { Request, Response } from "express";
import KorisnikService, { DefaultKorisnikAdapterOptions } from './KorisnikService.service';
import IEditKorisnik, { EditKorisnikValidator, IEditKorisnikDto } from './dto/IEditKorisnik.dto';
import * as bcrypt from "bcrypt";
import { AddKorisnikValidator, IAddKorisnikDto } from "./dto/IAddKorisnik.dto";
import * as uuid from "uuid";
import { Status } from "./KorisnikModel.model";
import KorisnikModel from './KorisnikModel.model';


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

        this.KorisnikService.getAll({
            removePassword:true,
            removeActivationCode:true
        })
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

        this.KorisnikService.getById(id, {
            removePassword:true,
            removeActivationCode:true
        })
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
        const is_active : string = req.params?.is_active;

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
        const data = req.body as IAddKorisnikDto; 

        // TODO : VALIDACIJA
        if ( !AddKorisnikValidator(data) ) {
            return res.status(400).send(AddKorisnikValidator.errors);
        }


        //Provera sta smo dobili od klijenta i sta prosledjujemo dalje metodi add()...
        /*console.log(data);*/

        const salt = bcrypt.genSaltSync(10);
        const lozinka_hash = bcrypt.hashSync(data.lozinka, salt);
        

        this.KorisnikService.add({
            korisnicko_ime: data.korisnicko_ime,
            lozinka_hash: lozinka_hash,
            ime: data.ime,
            prezime: data.prezime,
            jmbg: data.jmbg,
            email: data.email,
            is_active: data.is_active,
            aktivacioni_kod: uuid.v4()
        })
            .then( result => {

                //TODO: send mail
                

                res.send(result);
            })
            .catch( error => {
                res.status(400).send(error?.message);
            });

    }

    async activate(req: Request, res: Response){
        const code: string = req.params?.code;
        
        this.KorisnikService.getKorisnikByAktivacioniKod(code, { removeActivationCode:true, removePassword:true})
            .then(result => {
                if (result === null){
                    //sprecavanje brute-force napada "pocekom" ...
                    setTimeout( () => {
                        return res.status(404).send("User not found !");
                    }, 500);
                }

                return result;
            })
            .then( result => {
                const korisnik = result as KorisnikModel;
                
                return this.KorisnikService.editById(korisnik.korisnik_id, 
                    {
                        is_active: Status.aktivan ,
                        aktivacioni_kod: null,
                    } );
            })
            .then( korisnik => {
                res.send(korisnik);
            })
            .catch(error =>{
                //Postavljanje "poceka" - pauze sprecavamo brute-force napad ...
                setTimeout( () => {
                    res.status(500).send(error?.message);
                }, 500);
            })
    }

    async edit(req: Request, res: Response) {
        const id : number = +req.params?.korisnik_id;

        const data = req.body as IEditKorisnikDto;

        //provera prilikom testiranja ...
        //console.log(data);
        //console.log(id)

        // TODO : VALIDACIJA
        if ( !EditKorisnikValidator(data) ) {
            return res.status(400).send(EditKorisnikValidator.errors);
        }

        //Prvi nacin :
       // const salt = bcrypt.genSaltSync(10);
       // const lozinka_hash = bcrypt.hashSync(data.lozinka, salt);

       //Drugi nacin:
        const serviceData: IEditKorisnik = {};

        const salt = bcrypt.genSaltSync(10);

        if (data.lozinka !== undefined) {
            const lozinka_hash = bcrypt.hashSync(data.lozinka, salt); 
            
            serviceData.lozinka_hash = lozinka_hash;
        }

        if (data.is_active !== undefined){
            serviceData.is_active = data.is_active;
        }
        
        if (data.ime !== undefined) {
            serviceData.ime = data.ime;
        }

        if (data.prezime !== undefined) {
            serviceData.prezime = data.prezime;
        }
        

        this.KorisnikService.getById(id, { removePassword:true, removeActivationCode:true})
            .then( result => {

                //za potrebe testiranja...
                //console.log(result);

                if ( result === null){
                    return res.sendStatus(404);
                }

                this.KorisnikService.editById(id, serviceData /* ukoliko prosledjujemo ove informacije kroz serviceData*/ 
                /*{
                    //ovde smo stavili pod komentar korisnicko_ime i jmbg jer ne zelimo da omogucimo izmenu ovih polja ,
                    //ali takodje nismo ni naveli polje created_at iz istog razloga ...
                    //U sustini ona polja kojima ne zelimo da dozvolimo izmenu  od strane korisnika ,jednostavno ne navedemo ovde,
                    //i korisnik cak i da posalje nove vrednosti tih polja one jednostavno ce se ignorisati kao da nisu poslate i nece biti nikakvih izmena u bazi ...
                    //korisnicko_ime: data.korisnicko_ime ,
                    lozinka_hash: lozinka_hash ,
                    ime: data.ime ,
                    prezime: data.prezime ,
                    //jmbg: data.jmbg ,
                    is_active: data.is_active
                }*/ )
                    .then( result => {

                        //za potrebe testiranja..
                        //console.log("edit deo ... "+result);

                        res.send(result);
                    })
                    .catch( error => {
                        return res.sendStatus(404);
                    });
            })
            .catch( error => {
                res.status(500).send(error?.message);
            });

    }
}

export default KorisnikController;