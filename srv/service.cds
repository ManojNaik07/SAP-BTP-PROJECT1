using {  db} from '../db/schema';

service MyService {
    @odata.draft.enabled
    @odata.draft.bypass
    entity Customer as projection on db.Customer;
    @odata.draft.enabled
    @odata.draft.bypass
    entity SalesOrder as projection on db.SalesOrder;
    entity PaymentSettings as projection on db.PaymentSettings;
    @odata.draft.enabled
    @odata.draft.bypass
    entity PurchaseOrder as projection on db.PurchaseOrder;
    @odata.draft.enabled
    @odata.draft.bypass
    entity PurchaseEnquiry as projection on db.PurchaseEnquiry;
    @odata.draft.enabled
    @odata.draft.bypass
    entity Vehicle as projection on db.Vehicle;
    @odata.draft.enabled
    @odata.draft.bypass
    entity Quotation as projection on db.Quotation;
    entity Stocks as projection on db.Stocks;
    @odata.draft.enabled
    @odata.draft.bypass
    entity PaymentDetails as projection on db.PaymentDetails;
    @odata.draft.enabled
    @odata.draft.bypass
    entity Invoice as projection on db.Invoice;
    @odata.draft.enabled
    @odata.draft.bypass
    entity AllocationSchedule as projection on db.AllocationSchedule;

    entity Files as projection on db.Files;

    function generateInvoice(
        paymentId  : String 
    ) returns String;

    function generateSO(
        data : String
    ) returns String;

    function sendForRelease(
        data  : String
    ) returns String;

}
