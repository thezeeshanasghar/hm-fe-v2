import { CarOwner } from './carOwner.model';
export class Car{

    Id:number;
    Name:string;
    EngineNumber:string;
    ModelNumber:string;
    ChasisNumber:string;
    RegistrationNumber:string;
    Color:string;
    Maker:string;
    Token:string;
    ComputerizedNoPlate:boolean;
    NoOfPapers:number;
    PurchasePrice:number;
    PurchaseDate:Date;
    receiptNumber:number;
    carOwner:CarOwner[];
}