import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/FetchData.getAccounts';

export default class Accounts extends LightningElement {
     acctData;
     visibleAcct
    @wire(getAccounts) accts({error, data}){
        if(data){
            this.acctData = data;
            console.log(this.acctData)
        }else if(error){
            this.error = error;
        }
    }

    updateAccountHandler(event){
        this.visibleAcct = [...event.detail.records]
        console.log(event.detail.records)}
}