import getAcrylic from '@salesforce/apex/AcrylicController.getAcrylic';
import { LightningElement, track, wire } from 'lwc';

export default class AcrylicPlates extends LightningElement {

    @track optionsArray = [];
    @track value = '';
    @track label = '';
    @track quantity = 0;
    @track quantityToShow = 0;

    @wire(getAcrylic)
        acrylics;

    get optionsAddDelete() {
         return [
            { label: 'Add', value: 'add' },
            { label: 'Delete', value: 'delete' },
        ];
    }    

    connectedCallback(){
        getAcrylic()
        .then( result => {
            let arr = [];
            for(var i=0; i<result.length; i++){
                arr.push({label : result[i].Name, value : result[i].Id, quantity : result[i].Quantity__c})
                console.log(arr[i])
            }
            this.optionsArray = arr;
        })
    }

   

    handleChange(event){
        this.value = event.detail.value;
        for(var i = 0; i<this.optionsArray.length; i++){
            if(this.value == this.optionsArray[i].value){
                this.quantity = this.optionsArray[i].quantity;
                this.quantityToShow = this.quantity;
            }
        }
    }

    handleClick(){
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.value;
        
    }
    
}