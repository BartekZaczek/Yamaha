public with sharing class AcrylicController {
    @AuraEnabled(cacheable=true)
    public static List<Acrylic__c> getAcrylic(){
        try{
            List<Acrylic__c> acrylics = [SELECT Id, Name, Quantity__c FROM Acrylic__c];
            System.debug(acrylics);
            return acrylics;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
}
