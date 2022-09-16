import { LightningElement, track, wire } from 'lwc';
import ANTHRACITE_GREY from '@salesforce/resourceUrl/anthraciteGrey';
import WHITE_HG from '@salesforce/resourceUrl/whiteHg';
import BLACK_MAT from '@salesforce/resourceUrl/blackMat';
import getAcrylic from '@salesforce/apex/AcrylicController.getAcrylic';
import { publish, MessageContext } from 'lightning/messageService';
import MyMessageChannel from '@salesforce/messageChannel/MyMessageChannel__c';
import uId from '@salesforce/user/Id';
import ORDER_SHOP from '@salesforce/schema/OrderShop__c';
import ORDER_NAME from '@salesforce/schema/OrderShop__c.Name';
import { createRecord } from 'lightning/uiRecordApi';


export default class Shop extends LightningElement {
    @track imgColor = WHITE_HG;
    @track colors = [];
    @track mapWithImg = [];
    tempCol  =  '';
    valueCombo = '';
    width = 0;
    height = 0;
    @track orderArray  = [];
    userId = uId;
    orderObj = ORDER_SHOP;
    orderName = 'test test test';
    
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
            console.log(this.userId)
        })
    }

    @wire(MessageContext)
    messageContext;

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

        const message = {messageToSend: 'test'};
        
            publish(this.messageContext, MyMessageChannel, message);
            this.createOrder();
        
    }

    createOrder(){
        var fields = {'Name' : this.orderName};
        var objRecordInput = {'apiName' : 'OrderShop__c', fields}
        createRecord(objRecordInput).then(response => {
            console.log('record created');
        }).catch(error => {
            console.error(JSON.stringify(error));
        })
    }
}