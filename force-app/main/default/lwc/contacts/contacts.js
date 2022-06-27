import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/FetchData.getContacts';

export default class Contacts extends LightningElement {
    conData;
    @wire(getContacts) cnts({error, data}){
        if(data){
            this.conData = data;
        }else if(error){
            this.error = error;
        }
    }
}