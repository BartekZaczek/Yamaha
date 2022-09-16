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
import getLatestOrder from '@salesforce/apex/OrderController.getLatestOrder';
import getProduct from '@salesforce/apex/ProductController.getProduct';


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
    orderName = 'latest order';
    latestOrderId;
    product;
    
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

    @wire(MessageContext)
    messageContext;

     handleChangeColors(event){
        for(var i = 0; i < this.colors.length; i++){
            if( event.detail.value == this.colors[i].value){
                this.imgColor = this.mapWithImg.get(this.colors[i].label);
                this.valueCombo = this.colors[i].label;
                
            }
        }
    }

    handleChangeHeight(event){
        if(event.detail.value > 0) {
            this.height = event.detail.value;
        }else{
            this.height = 0;
        }
        
        
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
            
        }
        
        const message = {messageToSend: 'test'};
        publish(this.messageContext, MyMessageChannel, message);
    


            this.createOrder();
           
            getLatestOrder().then(result =>{
                this.latestOrderId = result.Id;
                this.createProduct();
            })
            
            
          
            
    }

    createOrder(){
        var fields = {'Name' : this.orderName};
        var objRecordInput = {'apiName' : 'OrderShop__c', fields}
        createRecord(objRecordInput).then(response => {
            console.log('ORDER created');
        }).catch(error => {
            console.error(JSON.stringify(error));
        })

        //IF..............///////
        
        //IF..............///////
        
        //IF..............///////

    
    }

    createProduct(){
        console.log(this.latestOrderId)
        var fields = {  'Width__c' : this.width,
                        'Height__c' : this.height,
                        'OrderShop__c' : this.latestOrderId,
                        //acrylic__c
                        'Name' : 'latestorder PRODUCT' }
        var objRecordInput = {'apiName' : 'ProductShop__c', fields}
        createRecord(objRecordInput).then(response => {
            console.log('PRODUCT created');
        }).catch(error => {
            console.error(JSON.stringify(error));
        })
    }
}