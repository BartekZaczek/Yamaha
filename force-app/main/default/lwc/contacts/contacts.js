import { LightningElement, wire } from 'lwc';
import 

export default class Contacts extends LightningElement {
    conData;
    @wire(getContacts)
}