import { LightningElement, track } from 'lwc';
import WHITE_MAT from '@salesforce/resourceUrl/whiteMat';
import WHITE_HG from '@salesforce/resourceUrl/whiteHg';
import BLACK_MAT from '@salesforce/resourceUrl/blackMat';
import getAcrylic from '@salesforce/apex/AcrylicController.getAcrylic';


export default class Shop extends LightningElement {
    whiteHg = WHITE_HG;
    whiteMat = WHITE_MAT;
    blackMat = BLACK_MAT;
    imgColor = this.whiteHg
    @track colors = [];
    imgColor = '';
    staticList = [];
    valueCombo = '';
    colorToShow;

    connectedCallback(){
        getAcrylic()
        .then( result => {
            let arr = [];

            for(var i = 0; i < result.length; i++){
                
                arr.push({label : result[i].Name, value : result[i].Id, color : result[i].acrylicColor__c})
                console.log(arr[i]);
            }
            this.valueCombo = arr[0];
            this.colors = arr;
            this.colorToShow = arr[0].color;
            console.log(this.colorToShow);
        })
    }

    handleChangeColors(event){
        for(var i = 0; i < this.colors.length; i++){
            if( event.detail.value == this.colors[i].value){
                this.imgColor = this.whiteHg;
            }
        }
       
    }

}