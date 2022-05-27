import { TimerOptions } from "timers";

class ZubModel{
    zubId: number;
    broj: number;
    vilica: Vilica;
    tip: Tip;
    strana: Strana;
    sifra_zuba: string;
}

enum Vilica{
    gornja = "gornja",
    donja = "donja"
}

enum Tip{
    sekutic = "sekutic",
    ocnjak = "ocnjak",
    kutnjak = "kutnjak"
}

enum Strana{
    leva = "leva",
    desna = "desna"
}

export default ZubModel;
export  {Vilica,Tip,Strana};
