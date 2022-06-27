import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/FetchData.getOpportunities';

export default class Opportunities extends LightningElement {
    opptData
    @wire(getOpportunities) oppts({error, data}){
        if(data){
            this.opptData = data;
        }else if(error){
            this.error = error;
        }
    }
}