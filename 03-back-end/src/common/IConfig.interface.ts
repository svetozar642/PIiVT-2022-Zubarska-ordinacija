import IRouter from "./IRouter.interface";

interface IConfig{
    server:{
        port: number;
        static: {
            index: string | false;
            dotfiles: "allow" | "deny";
            cacheControl: boolean;
            etag: boolean;
            maxAge: number;

            route: string;
            path: string;
        }
    },
    logging:{
        path: string,
        filename: string,
        format: string
    },
    database:{
        host: string,
        port: number,
        user:string,
        password: string,
        database: string,
        charset: string,
        timezone: string,
        //supportBigNumbers: boolean,
    },
    routers: IRouter[],
    
}

/* Ako modul exportuje samo ovo i nista drugo i ako zelimo da ovaj interfejs bude glavna i jedina stvar 
koja se moze eksportovati iz njega , tada koristimo rezervisanu rec "default" nakon "export" */
export default IConfig;

/* Alternativni zapis koji se koristi kada imamo jednu ili vise stvari za export (prilikom nabrajanja odvajamo ih ","-om):
    export {IConfig};
*/

/*Ovaj interfejs propisuje sta treba  da sadrzi nas config , ali mi pored toga moramo da napravimo taj jedan konkretan config
(npr. development config, test config, production config), mozemo imati vise razlicitih config-a za razlicite namene i pokretanja nase aplikacije */

//Nakon sto smo napravili ovaj interfejs , naredni korak je da napravimo jedan novi fajl pod imenom "dev.config.ts"