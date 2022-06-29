export default interface IKorisnik {
    korisnik_id: number;
    korisnicko_ime: string;
    lozinka_hash: string|null;
    ime:string;
    prezime:string;
    email:string;
    jmbg:string;
    createdAt: string;
    isActive: Status;
}

enum Status{
    aktivan = "aktivan",
    neaktivan = "neaktivan"
}

export {Status};