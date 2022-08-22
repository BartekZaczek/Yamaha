import { LightningElement, api } from 'lwc';

export default class Pagination extends LightningElement {
    totalRecords
    @api recordSize = 2
    totalPage = 0
    currentPage = 1

    get records(){
        return this.visibleRecords
    }

    @api
    set records(data){
        if(data){
            this.totalRecords = data;
            this.recordSize = Number(this.recordSize);
            this.totalPage = Math.ceil(data.length/this.recordSize);
            this.updateRecords()
        }
        
    }

    updateRecords(){
        const start = (this.currentPage-1)*this.recordSize
        const end = this.recordSize*this.currentPage
        this.visibleRecords = this.totalRecords.slice(start, end)
        this.dispatchEvent(new CustomEvent('update',{
            detail:{
                records:this.visibleRecords
            }
        }))
    }

    nextHandler(){
        if(this.currentPage < this.totalPage){
            this.currentPage = this.currentPage+1
            this.updateRecords()
        }
    }

    previousHandler(){
        if(this.currentPage > 1){
            this.currentPage = this.currentPage-1
            this.updateRecords()
        }
    }

    get disableNext(){
        return this.currentPage >= this.totalPage
    }

    get disablePrevious(){
        return this.currentPage <= 1
    }
}