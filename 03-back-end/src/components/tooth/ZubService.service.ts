import ZubModel, { Strana, Tip, Vilica } from "./ZubModel.model";


class ZubService{
    public async getAll(): Promise<ZubModel[]>{
        const zubi: ZubModel[] = []; 

        zubi.push({
            zubId: 1,
            broj: 2,
            vilica: Vilica.gornja,
            tip: Tip.sekutic,
            strana: Strana.leva,
            sifra_zuba: "GLS2"
        });

        zubi.push({
            zubId: 2,
            broj: 5,
            vilica: Vilica.donja,
            tip: Tip.kutnjak,
            strana: Strana.desna,
            sifra_zuba: "DDK5"
        });

        return zubi;
    }

    public async getById(zubId: number): Promise<ZubModel | null>{
        if(zubId == 4){
            return null;
        }

        return {
            zubId: zubId,
            broj: 2,
            vilica: Vilica.gornja,
            tip: Tip.sekutic,
            strana: Strana.leva,
            sifra_zuba: "GLS2"
        }
    }
}

export default ZubService;