import { LightningElement } from 'lwc';
import GREY from '@salesforce/resourceUrl/Grey';
export default class Site extends LightningElement {
    greyStaticResource = GREY;
    
    get backgroundStyle(){
        return `height:200px; width:auto; background-image:url(${GREY})`;
    }
}