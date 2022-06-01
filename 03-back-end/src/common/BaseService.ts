import * as mysql2 from 'mysql2/promise';
import IModel from './IModel.interface';
import IAdapterOptions from './IAdapterOptions.interface';

//Ovu BASE SERVICE klasu pravimo kao abstract jer ne zelimo da neko moze da je extend-uje
export default abstract class BaseService<ReturnModel extends IModel, AdapterOptions extends IAdapterOptions> {
    //Referenca ka database konekciji
    private database: mysql2.Connection;

    //Konstruktor kojim se ta konekcija stavlja na raspolaganje
    constructor(databaseConnection: mysql2.Connection){
        this.database = databaseConnection;
    }

    //Getter metoda za dohvatanje ,iz spoljnog okruzenja, privatnog propertija database (konekcija ka bazi podataka)
    protected get db(): mysql2.Connection {
        return this.database;
    }
    //Kada budemo korsitili ovu get metodu samo cemo je pozvati sa "this.db.execute" , bez zagrada ...
    //Da nismo stavili da je ova metoda "get" morali bi da je pozivamo sa zagradama "this.db().execute" ...

    abstract tableName(): string;

    protected abstract adaptToModel(data: any , options: AdapterOptions): Promise<ReturnModel>;
    
    public getAll(options?: AdapterOptions): Promise<ReturnModel[]>{
        const tableName = this.tableName();
        
        return new Promise<ReturnModel[]>(
            (resolve, reject) => {
                const sql: string = `SELECT * FROM \`${tableName}\`;`;
                this.db.execute(sql)
                    .then( async ( [ rows ] ) => {
                        if( rows === undefined){
                            return resolve([]);
                        }

                        const items: ReturnModel[] = [];

                        for (const row of rows as mysql2.RowDataPacket[]){
                            // (transformisacemo row podatke u pojedanacne ReturnModel-e) pomocu adaptera:
                            items.push( await this.adaptToModel( row, options ) );
                        }
                        resolve(items);
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        );
    }

    public getById(id:number, options?: AdapterOptions): Promise<ReturnModel | null> {
        const tableName = this.tableName();
        
        return new Promise<ReturnModel>(
            (resolve, reject) => {
                const sql: string = `SELECT * FROM \`${tableName}\` WHERE ${tableName}_id = ?;` ;

                this.db.execute(sql, [id])
                    .then( async ( [ rows ] ) => {
                        if( rows === undefined){
                           return resolve(null);
                        }

                        if (Array.isArray(rows) && rows.length === 0){
                            return resolve(null);
                        }

                        resolve(await this.adaptToModel(
                            rows[0],
                            options
                        ));
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        );
    }
    
    protected async getAllByFieldNameAnValue(fieldName:string, value: any, options?: AdapterOptions): Promise<ReturnModel[]>{
        
        const tableName = this.tableName();

        return new Promise<ReturnModel[]>(
            (resolve, reject) => {
                const sql: string = `SELECT * FROM \`${tableName}\` WHERE \`${fieldName}\` = ? ;`;

                this.db.execute(sql, [value])
                    .then( async ( [ rows ] ) => {
                        if( rows === undefined){
                            resolve([]);
                        }

                        const items: ReturnModel[] = [];

                        for (const row of rows as mysql2.RowDataPacket[]){
                            // (transformisacemo row podatke u pojedanacne IModel-e) pomocu adaptera:
                            items.push( await this.adaptToModel(row, options) );
                        }
                        resolve(items);
                    })
                    .catch(error => {

                    });
            }
        );

    }
}