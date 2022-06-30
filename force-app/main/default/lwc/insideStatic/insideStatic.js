import { LightningElement } from 'lwc';
import GOOGLEPLAY from '@salesforce/resourceUrl/googlePLay';
import APPSTORE from '@salesforce/resourceUrl/appStore';
import RED from '@salesforce/resourceUrl/red';

export default class InsideStatic extends LightningElement {
    imageGoogle = GOOGLEPLAY;
    imageAppStore = APPSTORE;
    red = RED;
}