import { LightningElement } from 'lwc';
import GOOGLEPLAY from '@salesforce/resourceUrl/googlePLay';
import APPSTORE from '@salesforce/resourceUrl/appStore';

export default class InsideStatic extends LightningElement {
    imageGoogle = GOOGLEPLAY;
    imageAppStore = APPSTORE;
}