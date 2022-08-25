import getAcrylic from '@salesforce/apex/AcrylicController.getAcrylic';
import { LightningElement, wire, track } from 'lwc';
let i=0;
export default class SupplyMain extends LightningElement {
    @track items = []; //this will hold key, value pair
    @track value = ''; //initialize combo box value
    @track chosenValue = '';
    aData

    @wire(getAcrylic) acrylics({error, data}){
        if(data){
            this.aData = data;
            console.log(this.aData);
            for(i=0; i<data.lenght;i++) {
                this.items = data.map(items => ({ label: data[i].Name, value: data[i].Id }));
            }
            console.log(this.items);
        }else if(error){
            this.error = error;
        }
    }

    get acrylicOptions(){
        return this.items;
    }

    handleChange(event) {
        const selectedOption = event.detail.value;
        console.log('selected value=' + selectedOption);
        this.chosenValue = selectedOption;
    }

    get selectedValue(){
        return this.chosenValue;
    }
}
