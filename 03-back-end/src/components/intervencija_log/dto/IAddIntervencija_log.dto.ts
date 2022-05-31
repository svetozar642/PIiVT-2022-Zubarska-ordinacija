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