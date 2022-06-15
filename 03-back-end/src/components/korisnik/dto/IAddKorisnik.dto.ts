//Validaciju cemo da implementiramo gde je i sam DTO ...
import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";
import { Status } from "../KorisnikModel.model";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

//Ono sto servis treba da trazi za bazu podataka (ono sto dostavljamo mi bazi) :
export default interface IAddKorisnik extends IServiceData {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez korisnik_id 
    //  jer je to AUTO_INCREMENT polje cija se vrednost automatski dodeljuje
    // Takodje ne ukljucujemo ni polje created_at jer se automatski dodaje TIMESTAMP u bazi trenutnog vremena
    
    korisnicko_ime: string;
    lozinka_hash: string;
    //lozinka: string;
    ime: string;
    prezime: string;
    jmbg: string;
    email: string;
    created_at ?: string;
    is_active: Status;
    aktivacioni_kod: string;
    
}

//Ono sto dostavlja klijent serveru (za kontroler) :
interface IAddKorisnikDto {
    
    korisnicko_ime: string;
    //lozinka_hash: string;
    lozinka: string;
    ime: string;
    prezime: string;
    jmbg: string;
    email: string;
    created_at ?: string;
    is_active: Status;
    
}

//Za potrebe validacije (unosimo osobine polja) :
const AddKorisnikSchema = {
    type: "object",
    properties: {
        korisnicko_ime: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        /*lozinka_hash: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },*/
        lozinka: {
            type: "string",
            pattern: "^([A-Z]*?[a-z]*?[0-9]*?.*?){6,64}$"
        },
        ime: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        prezime: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        jmbg: {
            type: "string",
            minLength: 13,
            maxLength: 13,
        },
        email: {
            type: "string",
            format: "email"
        },
        created_at: {
            type: "string"
        },
        is_active: {
            enum: ["aktivan", "neaktivan"]
        }
    },
    required: [
        "korisnicko_ime",
        //"lozinka_hash",
        "lozinka",
        "ime",
        "prezime",
        "jmbg",
        "email",
        //"created_at",
        //"is_active"
    ],
    additionalProperties: false,
};

const AddKorisnikValidator = ajv.compile(AddKorisnikSchema);

export {AddKorisnikValidator, IAddKorisnikDto};