//Validaciju cemo da implementiramo gde je i sam DTO ...
import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";
import { Status } from "../UslugaModel.model";
import { Kategorija } from "../UslugaModel.model";

const ajv = new Ajv();

export default interface IEditUsluga extends IServiceData {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez usluga_id 
    //  jer je to polje ne smemo da menjamo

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

interface IEditUslugaDto {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez usluga_id 
    //  jer je to polje ne smemo da menjamo
    
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
const EditUslugaSchema = {
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

const EditUslugaValidator = ajv.compile(EditUslugaSchema);

export {EditUslugaValidator, IEditUslugaDto};