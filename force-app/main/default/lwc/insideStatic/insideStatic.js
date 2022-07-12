import { LightningElement } from 'lwc';
import GOOGLEPLAY from '@salesforce/resourceUrl/googlePLay';
import APPSTORE from '@salesforce/resourceUrl/appStore';
import RED from '@salesforce/resourceUrl/red';
import GREY from '@salesforce/resourceUrl/Grey';

export default class InsideStatic extends LightningElement {
    imageGoogle = GOOGLEPLAY;
    imageAppStore = APPSTORE;
    red = RED;
    get backgroundGrey(){
        return `height:250px; width:auto; background-image:url(${GREY})`;
    }
}