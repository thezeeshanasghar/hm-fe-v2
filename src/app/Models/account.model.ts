export class AccountModel{
    constructor(
        public Id:number,
        public Name:string,
        public AccountNumber:String,
        public MobileNumber:string,
        public Email:string,
        public CNIC:string,
        public Address:string,
        public Date:Date,
        public Balance:number
    ){

    }
}