import { LightningElement } from 'lwc';
import GREY from '@salesforce/resourceUrl/Grey';
import BLUE from '@salesforce/resourceUrl/Blue';

export default class Site extends LightningElement {

    
    get backgroundGrey(){
        return `height:250px; width:auto; background-image:url(${GREY})`;
    }

    get backgroundBlue(){
        return `height:250px; width:auto; background-image:url(${BLUE})`;
    }
}