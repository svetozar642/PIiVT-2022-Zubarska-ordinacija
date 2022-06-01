//Validaciju cemo da implementiramo gde je i sam DTO ...
import Ajv from "ajv";

const ajv = new Ajv();

export default interface IAddIntervencija_log {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez intervencija_log_id 
    //  jer je to AUTO_INCREMENT polje cija se vrednost automatski dodeljuje
    
    sifra_zuba: string;
    sifra_usluge: string;
    
    //FKs: 
    zubId: number;
    uslugaId: number;
    pacijentId: number;
    racunId: number;
}

//Za potrebe validacije (unosimo osobine polja) :
const AddIntervencija_logSchema = {
    type: "object",
    properties: {
        sifra_zuba: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        sifra_usluge: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        zubId: {
            type: "number",
        },
        uslugaId: {
            type: "number",
        },
        pacijentId: {
            type: "number",
        },
        racunId: {
            type: "number",
        },
    },
    required: [
        "sifra_zuba",
        "sifra_usluge",
        "zubId",
        "uslugaId",
        "pacijentId",
        "racunId",
    ],
    additionalProperties: false,
};

const AddIntervencija_logValidator = ajv.compile(AddIntervencija_logSchema);

export {AddIntervencija_logValidator};