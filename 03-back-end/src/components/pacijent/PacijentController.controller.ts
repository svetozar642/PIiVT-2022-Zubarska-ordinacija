import { Request, Response } from "express";
import IAddPacijent, { AddPacijentValidator } from "./dto/IAddPacijent.dto";
import IEditPacijentDto, { EditPacijentValidator } from "./dto/IEditPacijent.dto";
import PacijentService, { DefaultPacijentAdapterOptions } from './PacijentService.service';

class PacijentController{
    private PacijentService: PacijentService;

    constructor(PacijentService: PacijentService){
        this.PacijentService = PacijentService;
    }

    async getAll(req: Request, res: Response): Promise<void> {

        //await koristimo jer je ovo asinhroni metod koji moze da vrati Promise 
        //Ovaj metod uvek kada vraca Promise vraca samo rezultat, a nikada reject tog promisa (imamo samo "resolve" a nemamo "reject")
        //const pacijenti = await this.PacijentService.getAll();

        //res.send(pacijenti);

        //promena zapisa iznad jer sada PaicijentModel moze vratiti prazan [] ili PaicjentModel[] a moze i reject-ovati usled greske

        this.PacijentService.getAll(DefaultPacijentAdapterOptions)
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(500).send(error?.message);
            })

        /*
        //Ako bi radili sa Promise-om koji ima i "resolve" i "reject" onda je bolje da pisemo na sledeci nacin :
        // "pacijenti" je rezultat dobijen iz pozvane getAll() metode
        this.PacijentService.getAll()
            .then(pacijenti => {
                res.send(pacijenti);
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
      /*  const pacijent= await this.PacijentService.getById(id);

        if (pacijent === null){
            return res.sendStatus(404);
        }

        res.send(pacijent);
       */

        this.PacijentService.getById(id, DefaultPacijentAdapterOptions)
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

    async getAllBySenioritet(req: Request, res:Response) {
        const senioritet : string = req.params?.senioritet;

        this.PacijentService.getAllBySenioritet(senioritet, DefaultPacijentAdapterOptions )
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

        this.PacijentService.getAllByIme(ime, DefaultPacijentAdapterOptions )
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

        this.PacijentService.getAllByPrezime(prezime, DefaultPacijentAdapterOptions )
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

        this.PacijentService.getAllByJmbg(jmbg, DefaultPacijentAdapterOptions )
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

    async getAllByAdresa(req: Request, res:Response) {
        const adresa : string = req.params?.adresa;

        this.PacijentService.getAllByAdresa(adresa, DefaultPacijentAdapterOptions )
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

    async getAllByTelefon(req: Request, res:Response) {
        const telefon : string = req.params?.telefon;

        this.PacijentService.getAllByTelefon(telefon, DefaultPacijentAdapterOptions )
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

        this.PacijentService.getAllByEmail(email, DefaultPacijentAdapterOptions )
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
        const status : string = req.params?.status;

        this.PacijentService.getAllByStatus(status, DefaultPacijentAdapterOptions )
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

    async getAllByKorisnikId(req: Request, res:Response) {
        const korisnik_id : number = +req.params?.korisnik_id;

        this.PacijentService.getAllByKorisnikId(korisnik_id, DefaultPacijentAdapterOptions )
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
        const data = req.body as IAddPacijent; 

        // TODO : VALIDACIJA
        if ( !AddPacijentValidator(data) ) {
            return res.status(400).send(AddPacijentValidator.errors);
        }


        //Provera sta smo dobili od klijenta i sta prosledjujemo dalje metodi add()...
        /*console.log(data);*/

        this.PacijentService.add(data)
            .then( result => {
                res.send(result);
            })
            .catch( error => {
                res.status(400).send(error?.message);
            });

    }

    async edit(req: Request, res: Response) {
        const id : number = +req.params?.pacijent_id;

        const data = req.body as IEditPacijentDto;

        //TODO: utvrdjivanje indentiteta korisnika ID iz auth tokena koji pokusava da izvrsi izmenu pacijenta i ID korisnika  iz tog pacijenta kog pokusavamo da izmenimo 
        // PS: samo korisnik koji je dodeljen nekom pacijentu moze da menja podatke o njemu      
        if ( req.authorisation?.role === "korisnik") {
            if (req.authorisation?.id !== data.korisnik_id ){
                return res.status(403).send("You do not have access to edit this resource !");
            }
        }

        //provera prilikom testiranja ...
        //console.log(data);
        //console.log(id)

        // TODO : VALIDACIJA
        if ( !EditPacijentValidator(data) ) {
            return res.status(400).send(EditPacijentValidator.errors);
        }

        this.PacijentService.getById(id)
            .then( result => {

                //za potrebe testiranja...
                //console.log(result);

                if ( result === null){
                    return res.sendStatus(404);
                }

                this.PacijentService.editById(id, {
                    ime: data.ime,
                    prezime: data.prezime,
                    adresa: data.adresa,
                    telefon: data.telefon,
                    senioritet: data.senioritet,
                    status: data.status,
                    korisnik_id: data.korisnik_id
                })
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

export default PacijentController;