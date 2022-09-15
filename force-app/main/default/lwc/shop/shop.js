import { LightningElement, track } from 'lwc';
import ANTHRACITE_GREY from '@salesforce/resourceUrl/anthraciteGrey';
import WHITE_HG from '@salesforce/resourceUrl/whiteHg';
import BLACK_MAT from '@salesforce/resourceUrl/blackMat';
import getAcrylic from '@salesforce/apex/AcrylicController.getAcrylic';


export default class Shop extends LightningElement {
    @track imgColor = WHITE_HG;
    @track colors = [];
    @track mapWithImg = [];
    tempCol  =  '';
    valueCombo = '';
    width = 0;
    height = 0;
    @track orderArray  = [];
    
    connectedCallback(){
        getAcrylic()
        .then( result => {
            let arr = [];
            let map = new Map();
            for(var i = 0; i < result.length; i++){
                switch (result[i].Name){
                    case  'Black Mat' :
                        this.tempCol = BLACK_MAT;
                        break;
                    case 'White HG':
                        this.tempCol = WHITE_HG;
                        this.valueCombo = result[i].Name;
                        break;
                    case 'Anthracite Grey':
                        this.tempCol = ANTHRACITE_GREY;
                        break;
                    
                }
                map.set(result[i].Name,  this.tempCol);
                arr.push({label : result[i].Name, value : result[i].Id})
            }
            this.colors = arr;
            this.mapWithImg = map;  
        })
    }

     handleChangeColors(event){
        for(var i = 0; i < this.colors.length; i++){
            if( event.detail.value == this.colors[i].value){
                this.imgColor = this.mapWithImg.get(this.colors[i].label);
                this.valueCombo = this.colors[i].label;
                console.log(this.colors[i].label)
            }
        }
    }

    handleChangeHeight(event){
        if(event.detail.value > 0) {
            this.height = event.detail.value;
        }else{
            this.height = 0;
        }
        
        console.log(this.height)
    }

    handleChangeWidth(event){
        if(event.detail.value > 0) {
            this.width = event.detail.value;
        }else{
            this.width = 0;
        }
    }

    handleClick(){
        
        this.orderArray.push({width : this.width, color : this.valueCombo})
        for(var i = 0; i < this.orderArray.length; i++ ){
console.log(this.orderArray[i])
        }
        console.log(this.width + ' ' +  this.height + this.valueCombo)
    }
}