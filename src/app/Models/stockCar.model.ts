import { AccountModel } from './account.model';
export class StockCar{
    public Id:Number;
    public Name:string;
    public EntryDate:Date;
    public RegistrationNumner:string;
    public Maker:string;
    public Model:string;
    public EngineNumber:string;
    public ChassisNumer:string;
    public ManufacturingYear:Date;
    public Owner:AccountModel;
    public PurchasePrice:number;
    public PurchaseDate:Date;
    public SellPrice:number;
    public SellDate:Date;


}