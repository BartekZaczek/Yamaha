public with sharing class ProductController {
    @AuraEnabled
    public static ProductShop__c getProduct(){
        try {
            ProductShop__c product = [SELECT Id, Name, OrderShop__c FROM ProductShop__c LIMIT 1];
            System.debug(product.Name);
            return product;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
