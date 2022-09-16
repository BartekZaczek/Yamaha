public with sharing class OrderController {

    @AuraEnabled
    public static OrderShop__c getLatestOrder(){
        try {
            OrderShop__c order = [SELECT CreatedById, LastModifiedById, Name, Id, OwnerId FROM OrderShop__c order by CreatedDate limit 1];
            System.debug(order.Name);
            return order;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}
