import { LightningElement, api } from 'lwc';

export default class Nav extends LightningElement {
     basketLable = "basket : ";
     basketSize = 0;
     basket = this.basketLable + ' ' + this.basketSize.toString();

    
}