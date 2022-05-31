import ZubRouter from './components/zub/ZubRouter.router';

const ApplicationRouters = [
    new ZubRouter(),

    //ovde navodimo sve rutere koje ikad budemo imali u ovoj aplikaciji ...
];

export default ApplicationRouters;


// Ovo necemo koristi jer smo se odlucili da sve rutere dodajemo preko config fajla aplikacije , a ovo je stari nacin koji je takodje prihvatljiv...
//Necemo brisati ovaj fajl kako bi ostao kao primer drugog nacina