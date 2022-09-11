import { LightningElement, track } from 'lwc';
import WHITE_MAT from '@salesforce/resourceUrl/whiteMat';
import WHITE_HG from '@salesforce/resourceUrl/whiteHg';
import BLACK_MAT from '@salesforce/resourceUrl/blackMat';
import getAcrylic from '@salesforce/apex/AcrylicController.getAcrylic';


export default class Shop extends LightningElement {
    whiteHg = WHITE_HG;
    whiteMat = WHITE_MAT;
    blackMat = BLACK_MAT;

    @track colors = [];
    selectedColorValue = '';
    imgColor = '';
    staticList = [];

    connectedCallback(){
        getAcrylic()
        .then( result => {
            let arr = [];
            let staticArr = [];
            
            for(var i = 0; i < result.length; i++){
                arr.push({label : result[i].Name, value : result[i].Id})
                console.log(arr[i]);
            }
            this.colors = arr;
        })
    }

    handleChangeColors(event){
        this.selectedColorValue = event.detail.value;
        for(var i = 0; i < this.colors.length; i++){
            if(this.selectedColorValue == this.colors[i].value){
                this.imgColor = this.colors
            }
        }
       
    }

}