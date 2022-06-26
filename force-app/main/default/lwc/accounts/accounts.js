import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/FetchAccounts.getAccounts';

export default class Accounts extends LightningElement {
    acctData;
    @wire(getAccounts) accts({error, data}){
        if(data){
            this.acctData = data;
            console.log(data)
        }else if(error){
            this.error = error;
        }
    }
}