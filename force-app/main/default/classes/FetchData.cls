public with sharing class FetchAccounts {
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
}
