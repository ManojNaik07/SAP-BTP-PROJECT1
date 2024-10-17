sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('mahindrapricing3app.ext.controller.InvoiceObject', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf mahindrapricing3app.ext.controller.InvoiceObject
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			routing: {
				onBeforeBinding: async function (oUrl) { 
					debugger
					const oView = this.base.getView();
					const oPage = oView.getContent()[0];
					const oFooter = oPage.getAggregation("footer");
					const aSections = oPage.getSections();
					
					const oSection = this.getView().byId("mahindrapricing3app::PaymentDetailsObjectPage--fe::CustomSubSection::Invoice");
					//oSection.setVisible(false); 
					const footer = this.getView().byId("mahindrapricing3app::PaymentDetailsObjectPage--fe::FooterBar::_fc");
					console.log(footer);
					const baseUrl = oUrl.oModel.sServiceUrl;
					const openUrl = baseUrl + oUrl.sPath.slice(1) + '/paymentToFiles'
					console.log(openUrl);

					const response = await new Promise((resolve, reject) => {
						$.ajax({
            		    url: openUrl,
            		    method: "GET",
            		    success: function (oData) {
            		        resolve(oData);
            		    }
            		});
					});
			
					console.log(response);
					if(response) {
						var oModel = new sap.ui.model.json.JSONModel({
							pdfSource: baseUrl + response.url
						});
						this.getView().setModel(oModel, "pdfModel");
						oFooter.setVisible(false); 
						aSections[3].setVisible(true);
					} else {
						aSections[3].setVisible(false);
						oFooter.setVisible(true); 
					}
					
				}
			}
		}
	});
});
