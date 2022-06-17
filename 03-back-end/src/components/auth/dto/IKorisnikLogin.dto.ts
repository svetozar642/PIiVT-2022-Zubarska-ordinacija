import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

//ovaj interfejs predstavalja sta treba korisnik da dostavi iz spoljasnjeg okruzenja (dto) ...
export interface IKorisnikLoginDto {
    korisnicko_ime: string;
    lozinka: string;
}

const KorisnikLoginValidator = ajv.compile({
    type: "object",
    properites: {
        korisnicko_ime: {
            type: "string",
            pattern: "^[a-z\-]{2,64}$"
        },
        lozinka: {
            type: "string",
            pattern: "^([A-Z]*?[a-z]*?[0-9]*?.*?){6,64}$"
        }
    },
    required: [
        "korisnicko_ime",
        "lozinka"
    ],
    additionalProperties: false,
});

export {KorisnikLoginValidator};