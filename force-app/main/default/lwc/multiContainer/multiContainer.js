import { LightningElement } from 'lwc';
import BLUE from '@salesforce/resourceUrl/Blue';
import GREY from '@salesforce/resourceUrl/Grey';
import RED from '@salesforce/resourceUrl/red';
import GOOGLEPLAY from '@salesforce/resourceUrl/googlePLay';
import APPSTORE from '@salesforce/resourceUrl/appStore';

export default class MultiContainer extends LightningElement {
    
    get backgroundBlue(){
        return `height:250px; width:auto; background-image:url(${BLUE})`;
    }
    get backgroundGrey(){
        return `height:250px; width:auto; background-image:url(${GREY})`;
    }
    get backgroundBlueShort(){
        return `height:170px; width:auto; background-image:url(${BLUE})`;
    }
    get backgroundGreyShort(){
        return `height:170px; width:auto; background-image:url(${GREY})`;
    }

    blue = BLUE;
    red = RED;
    imageGoogle = GOOGLEPLAY;
    imageAppStore = APPSTORE;
}