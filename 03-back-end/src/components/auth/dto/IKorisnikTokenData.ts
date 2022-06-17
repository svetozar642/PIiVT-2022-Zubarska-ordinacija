export default interface IKorisnikTokenData {
    //ovako bi bilo ako imamo samo jednu rolu ..
    //korisnik_id: number;
    //korisnicko_ime: string;

    //ako zelimo da generalizujemo mozemo da napravimo univerzalni interfejs koji ce vaziti i ako nekad bude bilo vise rola pomocu enuma "role" ...
    role: "korisnik" // | "administrator" npr mozemo da dodajemo razlicite uloge ako ih imamo vise, ali mi imamo samo jednu ulogu a to je "korisnik"
    id: number;
    identity: string; 
}