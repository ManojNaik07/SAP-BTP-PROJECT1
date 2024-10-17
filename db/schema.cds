namespace db;

entity Customer {
  key customerID : String;
  name : String;
  address : String;
  email : String;
  phone : String;
  status : String;
  customerToEnquiry : Association to many PurchaseEnquiry on customerToEnquiry.enquiryToCustomer = $self;
}

entity PurchaseEnquiry {
  key purchaseEnquiryID : String;
  customerID : String;
  deliveryLocation : String;
  
  enquiryToCustomer : Association to one Customer on enquiryToCustomer.customerID=customerID;
  enquiryToVehicle : Association to  many Vehicle on enquiryToVehicle.vehicleToEnquiry = $self;
  enquiryToQuotation : Association to  many Quotation on enquiryToQuotation.quototionToEnquiry = $self;
}

entity Vehicle { 
    key vehicleCode : String;
    purchaseEnquiryID : String;
    vehicleName : String;
    vehicleColor : String;
    quantity : Int16;
    price : Int16;

    deliveryLeadTime : String;
    deliveryDate :String;
    shippingMethod : String;
    shippingCharges : String;

    vehicleToEnquiry : Association to one PurchaseEnquiry on vehicleToEnquiry.purchaseEnquiryID = purchaseEnquiryID;
    vehicleToSchedule : Association to one AllocationSchedule on vehicleToSchedule.scheduleToVehicle = $self;
}


entity Quotation {
  key quotationID : String;
  customerID : String;
  purchaseEnquiryID : String;
  totalPrice : Decimal;
  deliveryLeadTime : String;
  validity : Date;
  quototionToEnquiry : Association to one PurchaseEnquiry on quototionToEnquiry.purchaseEnquiryID = purchaseEnquiryID;
  quotationToPurchase : Association to one PurchaseOrder on quotationToPurchase.purchaseToQuotation = $self; 
}

entity PurchaseOrder @(UI: {CreateHidden: true, DeleteHidden: true}) {
  key poID : String;
  quotationID : String;
  deliveryLocation : String;

  status : String default 'Pending';
  purchaseToQuotation : Association to one Quotation on purchaseToQuotation.quotationID = quotationID;
  purchaseToSales : Association to  one SalesOrder on purchaseToSales.salesToPurchase = $self; 
}

entity SalesOrder @(UI: {CreateHidden: true, DeleteHidden: true }) {
  key soID : String;
  poID : String;
  dealerCode : String;
  status : String default 'Pending';
  salesToPurchase : Association to one PurchaseOrder on salesToPurchase.poID = poID ; 
  salesToPayment : Association to one PaymentDetails on  salesToPayment.paymentToSales = $self;
  salesToSettings : Composition of one PaymentSettings on salesToSettings.settingToSales = $self;
} 

entity  PaymentSettings {
  key settingId : UUID;
  soID : String;
  bankName : String;
  accNumber : String;
  ifscCode : String;
  branch : String;
  accHoldersName : String;
  dueDate : Date;
  settingToSales : Association to one SalesOrder on settingToSales.soID = soID;
}

entity AllocationSchedule {
  key scheduleID : UUID;
  vehicleCode : String;
  plannedQuantity: String;
  shippingDate: Date;
  expectedDeliveryDate : Date;
  allocationStatus: String;

  scheduleToVehicle : Association to one Vehicle on scheduleToVehicle.vehicleCode = vehicleCode;


}

entity PaymentDetails @(UI: {CreateHidden: true, DeleteHidden: true ,  UpdateHidden: true}) {
  key paymentId : String;
  transactionId: String;
  accountNo : String;
  amount : String;
  paymentMethod : String;
  status : String;
  soID : String;
  paymentToSales : Association to many SalesOrder on paymentToSales.soID = soID;
  paymentToInvoice : Association to one Invoice on paymentToInvoice.invoiceToPayment = $self;
  paymentToFiles : Association to one Files on paymentToFiles.fileTotPayment = $self;
}

entity Invoice {
  key invoiceID : String;
  paymentId : String;
  billedTo : String;
  invoiceDate : String;
  invoiceStatus : String;
  invoiceToPayment : Association to one PaymentDetails on invoiceToPayment.paymentId = paymentId;
  invoiceToFiles : Association to one Files on invoiceToFiles.fileTotInvoice = $self;
}
using {
    cuid,
    managed
} from '@sap/cds/common';

entity Files: cuid, managed{
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    invoiceID : String;
    paymentId : String;
    fileTotInvoice : Association to many Invoice on fileTotInvoice.invoiceID = invoiceID;
    fileTotPayment : Association to many PaymentDetails on fileTotPayment.paymentId = paymentId;
    
}

entity Stocks {
    key vehicleCode : String;
    vehicleName : String;
    vehicleColor : String;
    pricePerUnit : Decimal;
    quantity : Int16;
}
