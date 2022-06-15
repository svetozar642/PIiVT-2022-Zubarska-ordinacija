//Validaciju cemo da implementiramo gde je i sam DTO ...
import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";
import { Status } from "../KorisnikModel.model";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

export default interface IEditKorisnik extends IServiceData {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez korisnik_id 
    //  jer je to polje ne smemo da menjamo prilikom edit-a
    // Takodje ne ukljucujemo ni polje created_at jer se automatski dodaje TIMESTAMP u bazi trenutnog vremena i to takodje ne smemo da menjamo
    
    //necemo da dozvolimo mogucnost promene korisnickog imena i email adrese i jmbg-a korisnika, kao i izmenu created_at polja
    korisnicko_ime?: string; 
    lozinka_hash?: string;
    ime?: string;
    prezime?: string;
    jmbg?: string;
    email?: string;
    created_at ?: string;
    is_active?: Status;
    aktivacioni_kod?: string;
    
}

interface IEditKorisnikDto {
    //korisnicko_ime?: string;
    lozinka?: string;
    ime?: string;
    prezime?: string;
    //jmbg?: string;
    //email?: string;
    //created_at ?: string;
    is_active?: Status;
}

//Za potrebe validacije (unosimo osobine polja) :
const EditKorisnikSchema = {
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
        //Ni jedno od ovih polja nisu obavezni :

        //"korisnicko_ime",
        //"lozinka_hash",
        //"lozinka",
        //"ime",
        //"prezime",
        //"jmbg",
        //"email",
        //"created_at",
        //"is_active"
    ],
    additionalProperties: false,
};

const EditKorisnikValidator = ajv.compile(EditKorisnikSchema);

export {
    EditKorisnikValidator,
    IEditKorisnikDto
};