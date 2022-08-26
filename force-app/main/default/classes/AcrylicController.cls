public class AcrylicController {
    @AuraEnabled
    public static List<Acrylic__c> getAcrylic(){
        List<Acrylic__c> acrylics = [SELECT Id, Name, Quantity__c FROM Acrylic__c];
        return acrylics;
    }
}
