import { LightningElement, wire } from 'lwc';
import { createMessageContext, APPLICATION_SCOPE, MessageContext, releaseMessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import MyMessageChannel from '@salesforce/messageChannel/MyMessageChannel__c';

export default class Cart extends LightningElement {

txt = '';
subscription = null;

    @wire(MessageContext)
    messageContext;

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                MyMessageChannel,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

     unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        this.txt = message.messageToSend;
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }
}