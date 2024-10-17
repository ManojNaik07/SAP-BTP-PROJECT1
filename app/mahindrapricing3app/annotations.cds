using MyService as service from '../../srv/service';
annotate service.PurchaseOrder with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.name,
                Label : 'name',
            },
            {
                $Type : 'UI.DataField',
                Value : purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.customerID,
                Label : 'customerID',
            },
            {
                $Type : 'UI.DataField',
                Value : purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.email,
                Label : 'email',
            },
            {
                $Type : 'UI.DataField',
                Value : purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.phone,
                Label : 'phone',
            },
            {
                $Type : 'UI.DataField',
                Value : purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.address,
                Label : 'address',
            },
            {
                $Type : 'UI.DataField',
                Label : 'poID',
                Value : poID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'quotationID',
                Value : quotationID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'deliveryLocation',
                Value : deliveryLocation,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status',
                Value : status,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Header Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'poID',
            Value : poID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'quotationID',
            Value : quotationID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'deliveryLocation',
            Value : deliveryLocation,
        },
        {
            $Type : 'UI.DataField',
            Label : 'status',
            Value : status,
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Pending',
                        },
                    ],
                },
            ],
        },
        Text : 'Pending',
    },
    UI.LineItem #tableView : [
    ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View 1',
    },
);

annotate service.SalesOrder with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : soID,
            Label : 'soID',
        },
        {
            $Type : 'UI.DataField',
            Value : poID,
            Label : 'poID',
        },
        {
            $Type : 'UI.DataField',
            Value : dealerCode,
            Label : 'dealerCode',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
            GroupBy : [
                status,
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Pending',
                        },
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Sent For Approval',
                        },
                    ],
                },
            ],
        },
        Text : 'Sales Order',
    },
    UI.LineItem #tableView1 : [
        {
            $Type : 'UI.DataField',
            Value : soID,
            Label : 'soID',
        },
        {
            $Type : 'UI.DataField',
            Value : poID,
            Label : 'poID',
        },
        {
            $Type : 'UI.DataField',
            Value : dealerCode,
            Label : 'dealerCode',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
    ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approved',
                        },
                    ],
                },
            ],
        },
        Text : 'Add Payment Details',
    },
    UI.LineItem #tableView2 : [
        {
            $Type : 'UI.DataField',
            Value : soID,
            Label : 'soID',
        },
        {
            $Type : 'UI.DataField',
            Value : poID,
            Label : 'poID',
        },
        {
            $Type : 'UI.DataField',
            Value : dealerCode,
            Label : 'dealerCode',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
    ],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView2',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Paid',
                        },
                    ],
                },
            ],
        },
        Text : 'Tentative Vehicle Allocation',
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Header Details',
            ID : 'HeaderDetails',
            Target : '@UI.FieldGroup#HeaderDetails',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Payment Details',
            ID : 'PaymentDetails',
            Target : '@UI.FieldGroup#PaymentDetails',
        },
    ],
    UI.FieldGroup #HeaderDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : salesToPurchase.purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.name,
                Label : 'name',
            },
            {
                $Type : 'UI.DataField',
                Value : salesToPurchase.purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.customerID,
                Label : 'customerID',
            },
            {
                $Type : 'UI.DataField',
                Value : salesToPurchase.purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.phone,
                Label : 'phone',
            },
            {
                $Type : 'UI.DataField',
                Value : salesToPurchase.purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.email,
                Label : 'email',
            },
            {
                $Type : 'UI.DataField',
                Value : salesToPurchase.purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.address,
                Label : 'address',
            },
            {
                $Type : 'UI.DataField',
                Value : soID,
                Label : 'soID',
            },
            {
                $Type : 'UI.DataField',
                Value : poID,
                Label : 'poID',
            },
            {
                $Type : 'UI.DataField',
                Value : dealerCode,
                Label : 'dealerCode',
            },
            {
                $Type : 'UI.DataField',
                Value : status,
            },
        ],
    },
    UI.FieldGroup #PaymentDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : salesToSettings.accHoldersName,
                Label : 'accHoldersName',
            },
            {
                $Type : 'UI.DataField',
                Value : salesToSettings.accNumber,
                Label : 'accNumber',
            },
            {
                $Type : 'UI.DataField',
                Value : salesToSettings.ifscCode,
                Label : 'ifscCode',
            },
            {
                $Type : 'UI.DataField',
                Value : salesToSettings.bankName,
                Label : 'bankName',
            },
            {
                $Type : 'UI.DataField',
                Value : salesToSettings.branch,
                Label : 'branch',
            },
            {
                $Type : 'UI.DataField',
                Value : salesToSettings.dueDate,
                Label : 'dueDate',
            },
        ],
    },
);

annotate service.PaymentDetails with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : accountNo,
            Label : 'accountNo',
        },
        {
            $Type : 'UI.DataField',
            Value : amount,
            Label : 'amount',
        },
        {
            $Type : 'UI.DataField',
            Value : transactionId,
            Label : 'transactionId',
        },
        {
            $Type : 'UI.DataField',
            Value : paymentId,
            Label : 'paymentId',
        },
        {
            $Type : 'UI.DataField',
            Value : paymentMethod,
            Label : 'paymentMethod',
        },
        {
            $Type : 'UI.DataField',
            Value : soID,
            Label : 'soID',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Invoice',
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Customer Details',
            ID : 'CustomerDetails',
            Target : '@UI.FieldGroup#CustomerDetails',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Payment Details',
            ID : 'PaymentDetails',
            Target : '@UI.FieldGroup#PaymentDetails',
        },
    ],
    UI.FieldGroup #CustomerDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : paymentToSales.salesToPurchase.purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.name,
                Label : 'name',
            },
            {
                $Type : 'UI.DataField',
                Value : paymentToSales.salesToPurchase.purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.customerID,
                Label : 'customerID',
            },
            {
                $Type : 'UI.DataField',
                Value : paymentToSales.salesToPurchase.purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.email,
                Label : 'email',
            },
            {
                $Type : 'UI.DataField',
                Value : paymentToSales.salesToPurchase.purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.phone,
                Label : 'phone',
            },
            {
                $Type : 'UI.DataField',
                Value : paymentToSales.salesToPurchase.purchaseToQuotation.quototionToEnquiry.enquiryToCustomer.address,
                Label : 'address',
            },
            {
                $Type : 'UI.DataField',
                Value : paymentToSales.soID,
                Label : 'soID',
            },
        ],
    },
    UI.FieldGroup #PaymentDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : accountNo,
                Label : 'accountNo',
            },
            {
                $Type : 'UI.DataField',
                Value : amount,
                Label : 'amount',
            },
            {
                $Type : 'UI.DataField',
                Value : paymentId,
                Label : 'paymentId',
            },
            {
                $Type : 'UI.DataField',
                Value : paymentMethod,
                Label : 'paymentMethod',
            },
            {
                $Type : 'UI.DataField',
                Value : transactionId,
                Label : 'transactionId',
            },
            {
                $Type : 'UI.DataField',
                Value : soID,
                Label : 'soID',
            },
            {
                $Type : 'UI.DataField',
                Value : status,
                Label : 'status',
            },
        ],
    },
);

annotate service.SalesOrder with {
    status @Common.Label : 'Status'
};

