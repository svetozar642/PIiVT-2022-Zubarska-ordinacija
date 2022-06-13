//Validaciju cemo da implementiramo gde je i sam DTO ...
import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";
import { Senioritet, Status } from "../PacijentModel.model";

const ajv = new Ajv();

export default interface IEditPacijent extends IServiceData {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez pacijent_id 
    //  jer je to polje ne smemo da menjamo
    
    ime: string;
    prezime: string;
    jmbg?: string;
    adresa: string;
    telefon:string;
    email?: string;
    senioritet: Senioritet;
    status: Status;

    //FKs: 
    korisnik_id: number;
    
}

interface IEditPacijentDto {

    ime: string;
    prezime: string;
    jmbg?: string;
    adresa: string;
    telefon:string;
    email?: string;
    senioritet: Senioritet;
    status: Status;

    //FKs: 
    korisnik_id: number;
    
}

//Za potrebe validacije (unosimo osobine polja) :
const EditPacijentSchema = {
    type: "object",
    properties: {
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
        adresa: {
            type: "string",
            minLength: 2,
            maxLength: 128,
        },
        telefon: {
            type: "string",
            minLength: 9,
            maxLength: 15,
        },
        email: {
            type: "string",
            minLength: 5,
            maxLength: 64,
        },
        senioritet: {
            enum: ["dete", "penzioner", "ostali"]
        },
        status: {
            enum: ["aktivan", "neaktivan"]

        },
        korisnik_id: {
            type: "number",
        },
        
    },
    required: [
        "ime",
        "prezime",
        //"jmbg",
        "adresa",
        "telefon",
        //"email",
        "senioritet",
        "status",
        "korisnik_id"
    ],
    additionalProperties: false,
};

const EditPacijentValidator = ajv.compile(EditPacijentSchema);

export {EditPacijentValidator, IEditPacijentDto};