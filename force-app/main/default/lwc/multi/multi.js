import { LightningElement, api } from 'lwc';


export default class Multi extends LightningElement {
    @api txt;
    @api red
    @api background;
    @api title;
    @api comm1;
    @api comm2;
    @api comm3;
    @api imageappstore;
    @api imagegoogle;
}