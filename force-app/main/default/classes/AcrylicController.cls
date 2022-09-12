public class AcrylicController {
    @AuraEnabled(cacheable=true)
    public static List<Acrylic__c> getAcrylic(){
        List<Acrylic__c> acrylics = [SELECT Id, Name, Quantity__c, acrylicColor__c  FROM Acrylic__c];
        return acrylics;
    }
}
