//Validaciju cemo da implementiramo gde je i sam DTO ...
import Ajv from "ajv";

const ajv = new Ajv();

export default interface IAddKarton {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez karton_id 
    //  jer je to AUTO_INCREMENT polje cija se vrednost automatski dodeljuje
    
    pacijentId: number;
    intervencija_logId: number;
    
}

//Za potrebe validacije (unosimo osobine polja) :
const AddKartonSchema = {
    type: "object",
    properties: {
        kartonId: {
            type: "number",
        },
        pacijentId: {
            type: "number",
        },
        intervencija_logId: {
            type: "number",
        },
    },
    required: [
        "pacijentId",
        "intervencija_logId",
    ],
    additionalProperties: false,
};

const AddKartonValidator = ajv.compile(AddKartonSchema);

export {AddKartonValidator};