sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('mahindrapricing3app.ext.controller.SalesObject', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf mahindrapricing3app.ext.controller.SalesObject
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				var oModel = new sap.ui.model.json.JSONModel({
					input: false,  // Initial state is display mode
					text: true,
					input1: false,
					text1: true,
				});
				this.getView().setModel(oModel, "editModel");
			},
			routing: {
				onAfterBinding: async function (oUrl) { 

					const oView = this.base.getView();
					const oPage = oView.getContent()[0];
					const aSections = oPage.getSections();

					const buttons = this.base.getView().findAggregatedObjects(true, function (control) {
						return control.isA("sap.m.Button") && (control.getId().includes("release-so") || control.getId().includes("Edit"));
					});

					var editModel = this.getView().getModel("editModel");
					
					const regex1 = /IsActiveEntity=(true|false)/;
					const match1 = oUrl.sPath.match(regex1);
					const IsActiveEntity =  match1[1]; 

					if(IsActiveEntity === "false") {
						buttons[1].setVisible(false);
						editModel.setProperty("/input", true);
						editModel.setProperty("/text", false);
						editModel.setProperty("/input1", true);
						editModel.setProperty("/text1", false);
					} else {
						buttons[1].setVisible(true);
						editModel.setProperty("/input", false);
						editModel.setProperty("/text", true);
						editModel.setProperty("/input1", false);
						editModel.setProperty("/text1", true);
					}

					setTimeout(function() {
						let oContext = oUrl.oBinding.oElementContext;  // Get the element context
						let oBindingData = oContext.getObject(); 
						console.log(oBindingData);

						if(IsActiveEntity === "true") {

						// if(oBindingData.status != 'Pending') {
						// 	buttons[0].setVisible(false);
						// 	buttons[1].setVisible(false);
						// } else {
						// 	buttons[0].setVisible(true);
						// 	buttons[1].setVisible(true);
						// }

						if(oBindingData.status === 'Pending'){
							buttons[0].setVisible(true);
							buttons[1].setVisible(true);
						} else if(oBindingData.status === 'Approved' || oBindingData.status === 'Paid' ) {
							buttons[0].setVisible(true);
							buttons[1].setVisible(false);
						} else if(oBindingData.status === 'Sent For Approval'){
							buttons[0].setVisible(false);
							buttons[1].setVisible(false);
						}
					} else {
						if(oBindingData.status === 'Approved' || oBindingData.status === 'Paid' ) { 
							editModel.setProperty("/input", false);
							editModel.setProperty("/text", true);
							editModel.setProperty("/text1", false);
						}
					}

						if(oBindingData.status === 'Pending'){
							aSections[3].setVisible(false);
							aSections[4].setVisible(false);
						} else if(oBindingData.status === 'Approved') {
							aSections[3].setVisible(true);
							aSections[4].setVisible(false);
						} else if(oBindingData.status === 'Paid'){
							aSections[3].setVisible(false);
							aSections[4].setVisible(true);
						} else if(oBindingData.status === 'Sent For Approval'){
							aSections[3].setVisible(false);
							aSections[4].setVisible(false);
						}
					}.bind(this), 400); 
				}
			}
		}
	});
});
