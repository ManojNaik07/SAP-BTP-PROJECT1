sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/PDFViewer"
], function(MessageToast, PDFViewer) {
    'use strict';

    return {
        generateInvoice: async function(oEvent) {
            debugger
            const oView = this._view;
			const oPage = oView.getContent()[0];
			const oFooter = oPage.getAggregation("footer");
			const aSections = oPage.getSections();

            // const regex = /paymentId='([^']+)'/; // Match the paymentId inside single quotes
            // const match = oEvent.sPath.match(regex);
            // const paymentId =  match[1]; 

            let oContext = oEvent.oBinding.oElementContext;  // Get the element context
            let oBindingData = oContext.getObject();   // Retrieve the bound object data
            console.log(oBindingData);

            const baseUrl = oEvent.oModel.sServiceUrl;
            // const aUrl = baseUrl + 'Files(ID=d9ecaf52-ee95-4739-b380-d005bd786506)';
            // jQuery.ajax({ 
            //     url: aUrl,
            //     method: "DELETE",
            //     success: function (data) {
            //         console.log(data);
            //     },
            // })

            const openUrl = baseUrl + oEvent.sPath.slice(1) + '/paymentToFiles'
            const response1 = await fetchData(openUrl);

            const sUrl = baseUrl + `generateInvoice(paymentId='${oBindingData.paymentId}')`

            if(!response1) {
                const response2 = await fetchData(sUrl);
                console.log(response2);
                const wUrl = baseUrl + response2.value;
                var oModel = new sap.ui.model.json.JSONModel({
                    pdfSource: wUrl
                });
                this._view.setModel(oModel, "pdfModel");
                oFooter.setVisible(false);
				aSections[3].setVisible(true);
            } else {
            }


            async function fetchData (url) {
                return new Promise((resolve, reject) => {
                    jQuery.ajax({
                        url: url,
                        method: "GET",
                        dataType: "json",
                        success: function (data) {
                            resolve(data);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            reject(new Error(textStatus + ': ' + errorThrown));
                        }
                    });
                });
            }

        }
    };
});

