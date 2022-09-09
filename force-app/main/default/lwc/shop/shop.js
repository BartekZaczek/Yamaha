import { LightningElement } from 'lwc';
import WHITE_MAT from '@salesforce/resourceUrl/whiteMat';
import WHITE_HG from '@salesforce/resourceUrl/whiteHg';
import BLACK_MAT from '@salesforce/resourceUrl/blackMat';

export default class Shop extends LightningElement {
    whiteHg = WHITE_HG;
    whiteMat = WHITE_MAT;
    blackMat = BLACK_MAT;
}