sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('mahindrapricing3app.ext.controller.PurchaseObject', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf mahindrapricing3app.ext.controller.PurchaseObject
             */
			onInit: function () {
				debugger
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				var oModel = new sap.ui.model.json.JSONModel({
					input: false,  // Initial state is display mode
					text: false
				});
				this.getView().setModel(oModel, "editModel");
			},
			routing: {
				onAfterBinding: async function (oUrl) {
				debugger
				const buttons = this.base.getView().findAggregatedObjects(true, function (control) {
					return control.isA("sap.m.Button") && (control.getId().includes("generate-so") || control.getId().includes("Edit"));
				});

				buttons[0].setText("Enter Details")

				var editModel = this.getView().getModel("editModel");
				
				const regex1 = /IsActiveEntity=(true|false)/;
				const match1 = oUrl.sPath.match(regex1);
				const IsActiveEntity =  match1[1]; 

				if(IsActiveEntity === "false") {
					buttons[1].setVisible(false);
					editModel.setProperty("/input", true);
					editModel.setProperty("/text", false);
				} else {
					buttons[1].setVisible(true);
					editModel.setProperty("/input", false);
					editModel.setProperty("/text", true);
				}

				setTimeout(function() {
					let oContext = oUrl.oBinding.oElementContext;  // Get the element context
					let oBindingData = oContext.getObject(); 
					console.log(oBindingData);

					if(IsActiveEntity === "true") {

					if(oBindingData.status === 'Generated') {
						buttons[0].setVisible(false);
						buttons[1].setVisible(false);
					} else {
						buttons[0].setVisible(true);
						buttons[1].setVisible(true);
					}
				}
				}.bind(this), 1000);

			}
		}
		}
	});
});
