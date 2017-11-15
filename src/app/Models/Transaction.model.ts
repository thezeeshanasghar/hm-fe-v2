import { AccountModel } from './account.model';
export class TransactionModel{
   
    constructor(
        public Id:number,
        public AccountNumber:string,
        public Amount:number,
        public AccountID:number,
        public Account:AccountModel

    ) {
        
        
    }
}