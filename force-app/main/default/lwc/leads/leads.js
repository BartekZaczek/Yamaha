import { LightningElement, wire } from 'lwc';
import getLeads from '@salesforce/apex/FetchData.getLeads';
export default class Leads extends LightningElement {
    leadsData;
    @wire(getLeads) leads({error, data}){
        if(data){
            this.leadsData = data;
        }else if(error){
            this.error = error;
        }
    }
}