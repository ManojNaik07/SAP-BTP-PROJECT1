sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'mahindrapricing3app/test/integration/FirstJourney',
		'mahindrapricing3app/test/integration/pages/PurchaseOrderList',
		'mahindrapricing3app/test/integration/pages/PurchaseOrderObjectPage'
    ],
    function(JourneyRunner, opaJourney, PurchaseOrderList, PurchaseOrderObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('mahindrapricing3app') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePurchaseOrderList: PurchaseOrderList,
					onThePurchaseOrderObjectPage: PurchaseOrderObjectPage
                }
            },
            opaJourney.run
        );
    }
);