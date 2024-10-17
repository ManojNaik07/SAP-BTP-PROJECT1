sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'mahindrapricing3app',
            componentId: 'PurchaseOrderList',
            contextPath: '/PurchaseOrder'
        },
        CustomPageDefinitions
    );
});