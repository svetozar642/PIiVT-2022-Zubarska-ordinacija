//Validaciju cemo da implementiramo gde je i sam DTO ...
import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";
import { Senioritet, TipUsluge } from "../RacunModel.model";


const ajv = new Ajv();

export default interface IAddRacun extends IServiceData {
    //Iz spoljasnjeg okruzenja od klijenta ocekujemo sledece podatke , bez usluga_id 
    //  jer je to AUTO_INCREMENT polje cija se vrednost automatski dodeljuje
    // takodje ovde ne ukljucujemo ni polje "created_at" jer je to TIMESTAMP tip u bazi i automatski se dodeljuje vrednost trenutnog vremena i datuma prilikom upisa u bazu

    tip_usluge: TipUsluge;
    senioritet: Senioritet;
    
    pacijent_id: number;
    korisnik_id: number;
    
}

//Za potrebe validacije (unosimo osobine polja) :
const AddRacunSchema = {
    type: "object",
    properties: {
        
        tip_usluge: {
            enum: ["pojedinacna","paket"],
        },
        senioritet: {
            enum: ["dete","penzioner", "ostali"],
        },
        pacijent_id: {
            type: "number",
        },
        korisnik_id: {
            type: "number",
        },
        
    },
    required: [
        "tip_usluge",
        "senioritet",
        "pacijent_id",
        "korisnik_id",
    ],
    additionalProperties: false,
};

const AddRacunValidator = ajv.compile(AddRacunSchema);

export {AddRacunValidator};