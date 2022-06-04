//Validaciju cemo da implementiramo gde je i sam DTO ...
import Ajv from "ajv";
import { Status } from "../UslugaModel.model";
import { Kategorija } from "../UslugaModel.model";

const ajv = new Ajv();

export default interface IAddUsluga {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez usluga_id 
    //  jer je to AUTO_INCREMENT polje cija se vrednost automatski dodeljuje
    
    naziv: string;
    opis: string;
    sifra_usluge: string;
    kategorija: Kategorija;
    cena: number;
    popust_paket: number;
    popust_dete: number;
    popust_penzioner: number;
    status: Status;
}

//Za potrebe validacije (unosimo osobine polja) :
const AddUslugaSchema = {
    type: "object",
    properties: {
        naziv: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        opis: {
            type: "string",
            minLength: 2,
            maxLength: 250,
        },
        sifra_usluge: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        kategorija: {
            enum: ["preventivna","redovna", "hirurska"],
        },
        cena: {
            type: "number",
        },
        popust_paket: {
            type: "number",
        },
        popust_dete: {
            type: "number",
        },
        popust_penzioner: {
            type: "number",
        },
        status: {
            enum: ["aktivna", "neaktivna"]
        },
        
    },
    required: [
        "naziv",
        "opis",
        "sifra_usluge",
        "kategorija",
        "cena",
        "popust_paket",
        "popust_dete",
        "popust_penzioner",
        "status"
    ],
    additionalProperties: false,
};

const AddUslugaValidator = ajv.compile(AddUslugaSchema);

export {AddUslugaValidator};