public with sharing class FetchData {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        try {
            List<Account> accts = [SELECT Id, Name, Phone FROM Account LIMIT 2 ];
            System.debug(accts);
            return accts;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        try {
            List<Contact> cnts = [SELECT Id, Name, Phone FROM Contact LIMIT 2];
            return cnts;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Lead> getLeads(){
        try {
            List<Lead> leads = [SELECT Id, Name, Status FROM Lead LIMIT 2];
            return leads;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities(){
        try {
            List<Opportunity> oppts = [SELECT Id, Name, Amount FROM Opportunity LIMIT 2];
            return oppts;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}