import { LightningElement } from 'lwc';
import BLUE from '@salesforce/resourceUrl/Blue';
import GREY from '@salesforce/resourceUrl/Grey';
import RED from '@salesforce/resourceUrl/red';

export default class MultiContainer extends LightningElement {
    
    get backgroundBlue(){
        return `height:250px; width:auto; background-image:url(${BLUE})`;
    }
    get backgroundGrey(){
        return `height:250px; width:auto; background-image:url(${GREY})`;
    }

    blue = BLUE;

    red = RED;
}