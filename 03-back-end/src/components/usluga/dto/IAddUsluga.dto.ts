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
    cena_pojedinacna_dete: number;
    cena_pojedinacna_penzioner: number;
    cena_pojedinacna_ostali: number;
    cena_paket_dete: number;
    cena_paket_penzioner: number;
    cena_paket_ostali: number;
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
        cena_pojedinacna_dete: {
            type: "number",
        },
        cena_pojedinacna_penzioner: {
            type: "number",
        },
        cena_pojedinacna_ostali: {
            type: "number",
        },
        cena_paket_dete: {
            type: "number",
        },
        cena_paket_penzioner: {
            type: "number",
        },
        cena_paket_ostali: {
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
        "cena_pojedinacna_dete",
        "cena_pojedinacna_penzioner",
        "cena_pojedinacna_ostali",
        "cena_paket_dete",
        "cena_paket_penzioner",
        "cena_paket_ostali",
        "status"
    ],
    additionalProperties: false,
};

const AddUslugaValidator = ajv.compile(AddUslugaSchema);

export {AddUslugaValidator};