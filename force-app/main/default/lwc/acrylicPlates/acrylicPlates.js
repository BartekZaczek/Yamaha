import { LightningElement } from 'lwc';

export default class AcrylicPlates extends LightningElement {

    get options(){
        return [
            { label: 'Add', value: 'add' },
            { label: 'Delete', value: 'delete'},
        ];
    }

    get optionsAcrylic(){
        return [
            { label: 'White HG', value: 'hg' },
            { label: 'White MAT', value: 'mat'},
        ];
    }
}