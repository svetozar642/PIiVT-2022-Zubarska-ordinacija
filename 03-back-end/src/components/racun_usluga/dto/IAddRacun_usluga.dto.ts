//Validaciju cemo da implementiramo gde je i sam DTO ...
import Ajv from "ajv";

const ajv = new Ajv();

export default interface IAddIntervencija_log {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez racun_usluga_id 
    //  jer je to AUTO_INCREMENT polje cija se vrednost automatski dodeljuje
    
    
    //FKs: 
    zubId: number;
    uslugaId: number;
    pacijentId: number;
    racunId: number;
}

//Za potrebe validacije (unosimo osobine polja) :
const AddRacun_uslugaSchema = {
    type: "object",
    properties: {
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
        "zubId",
        "uslugaId",
        "pacijentId",
        "racunId",
    ],
    additionalProperties: false,
};

const AddRacun_uslugaValidator = ajv.compile(AddRacun_uslugaSchema);

export {AddRacun_uslugaValidator};