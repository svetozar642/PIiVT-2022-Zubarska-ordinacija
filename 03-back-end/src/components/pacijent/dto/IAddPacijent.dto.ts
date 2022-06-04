//Validaciju cemo da implementiramo gde je i sam DTO ...
import Ajv from "ajv";
import { Status } from "../PacijentModel.model";

const ajv = new Ajv();

export default interface IAddPacijent {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez pacijent_id 
    //  jer je to AUTO_INCREMENT polje cija se vrednost automatski dodeljuje
    
    ime: string;
    prezime: string;
    jmbg: string;
    adresa: string;
    telefon:string;
    email: string;
    status: Status;

    //FKs: 
    korisnikId: number;
    
}

//Za potrebe validacije (unosimo osobine polja) :
const AddPacijentSchema = {
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
        status: {
            enum: ["aktivan", "neaktivan"]

        },
        korisnikId: {
            type: "number",
        },
        
    },
    required: [
        "ime",
        "prezime",
        "jmbg",
        "adresa",
        "telefon",
        "email",
        "status",
        "korisnikId"
    ],
    additionalProperties: false,
};

const AddPacijentValidator = ajv.compile(AddPacijentSchema);

export {AddPacijentValidator};