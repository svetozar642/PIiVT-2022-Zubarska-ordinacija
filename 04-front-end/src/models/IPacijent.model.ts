export default interface IPacijent{
    pacijent_id: number,
    ime: string,
    prezime: string,
    jmbg: string,
    adresa: string,
    telefon: string,
    email: string,
    senioritet: Senioritet,
    status: Status,
    korisnik_id: number
}

enum Status{
    aktivan = "aktivan",
    neaktivan = "neaktivan"
}

enum Senioritet{
    dete = "dete",
    penzioner = "penzioner",
    ostali = "ostali"
}

export {Status,Senioritet};

