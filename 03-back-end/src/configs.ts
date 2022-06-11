import IConfig from './common/IConfig.interface';
import ZubRouter from './components/zub/ZubRouter.router';
import UslugaRouter from './components/usluga/UslugaRouter.router';
import PacijentRouter from './components/pacijent/PacijentRouter.router';
import KorisnikRouter from './components/korisnik/KorisnikRouter.router';
import Prijava_korisnikaRouter from './components/prijava_korisnika/Prijava_korisnikaRouter.router';
import KartonRouter from './components/karton/KartonRouter.router';
import RacunRouter from './components/racun/RacunRouter.router';
import Racun_uslugaRouter from './components/racun_usluga/Racun_uslugaRouter.router';

const DevConfig: IConfig = {
    server: {
        port: 10000,
        static: {
            index: false,
            dotfiles: "deny",
            cacheControl: true,
            etag: true,
            maxAge: 1000*60*60*24,
            route: "/assets",
            path: "./static"
        }
    },
    logging:{
        path: "./logs",
        format: ":date[iso]\t:remote-addr\t:method\t:url\t:status\t:res[content-length]\t:response-time ms",
        filename: "access.log",
    },
    database:{
        host: 'localhost',
        port: 3306,
        user: 'aplikacija',
        password: 'aplikacija',
        database: 'zubarska_ordinacija_2018203764',
        charset: 'utf8',
        timezone: '+01:00',
        //supportBigNumbers: true,
    },
    routers: [
        new ZubRouter(),
        new Racun_uslugaRouter(),
        new UslugaRouter(),
        new PacijentRouter(),
        new KorisnikRouter(),
        new Prijava_korisnikaRouter(),
        new KartonRouter(),
        new RacunRouter(),
    ]
}

/*
const TestConfig: IConfig = {
    server: {
        port: 10000,
    },
}

const ProductionConfig: IConfig = {
    server: {
        port: 10000,
    },
}
*/

export {DevConfig};