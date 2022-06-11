//Validaciju cemo da implementiramo gde je i sam DTO ...
import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export default interface IAddPrijava_korisnika extends IServiceData {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez prijava_korisnika_id 
    //  jer je to AUTO_INCREMENT polje cija se vrednost automatski dodeljuje
    // Takodje ne ukljucujemo ni polje logged_at jer se automatski dodaje TIMESTAMP trenutnog vremena u bazi 
    
    korisnicko_ime: string;
    lozinka_hash: string;
    logged_at ?: string;
    status: number;
    
}

//Za potrebe validacije (unosimo osobine polja) :
const AddPrijava_korisnikaSchema = {
    type: "object",
    properties: {
        korisnicko_ime: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        lozinka_hash: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        status: {
            type: "number"
        }
    },
    required: [
        "korisnicko_ime",
        "lozinka_hash",
        "status",

    ],
    additionalProperties: false,
};

const AddPrijava_korisnikaValidator = ajv.compile(AddPrijava_korisnikaSchema);

export {AddPrijava_korisnikaValidator};