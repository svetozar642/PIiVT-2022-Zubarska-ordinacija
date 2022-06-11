//Validaciju cemo da implementiramo gde je i sam DTO ...
import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export default interface IAddIntervencija_log extends IServiceData {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez racun_usluga_id 
    //  jer je to AUTO_INCREMENT polje cija se vrednost automatski dodeljuje
    
    
    //FKs: 
    zub_id: number;
    usluga_id: number;
    pacijent_id: number;
    racun_id: number;
}

//Za potrebe validacije (unosimo osobine polja) :
const AddRacun_uslugaSchema = {
    type: "object",
    properties: {
        zub_id: {
            type: "number",
        },
        usluga_id: {
            type: "number",
        },
        pacijent_id: {
            type: "number",
        },
        racun_id: {
            type: "number",
        },
    },
    required: [
        "zub_id",
        "usluga_id",
        "pacijent_id",
        "racun_id",
    ],
    additionalProperties: false,
};

const AddRacun_uslugaValidator = ajv.compile(AddRacun_uslugaSchema);

export {AddRacun_uslugaValidator};