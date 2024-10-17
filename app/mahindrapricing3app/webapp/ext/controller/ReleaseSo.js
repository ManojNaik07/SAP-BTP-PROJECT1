sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text"
], function(MessageToast, Dialog, Button, Text) {
    'use strict';

    return {
        releaseSo: async function(oEvent) {
            debugger
            const buttons = this._view.findAggregatedObjects(true, function (control) {
                return control.isA("sap.m.Button") && (control.getId().includes("release-so") || control.getId().includes("Edit"));
            });
            
            var oDialog = new Dialog({
                title: "Confirmation",
                type: "Message",
                content: new Text({ text: "Are you sure?" }),
                beginButton: new Button({
                    text: "Confirm",
                    press: async function () { 
                        onPress();
                        oDialog.close();
                    } 
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oDialog.close();
                    }
                })
            });
            //MessageToast.show("Custom handler invoked.");

            async function onPress() {
                debugger
                let oContext = oEvent.oBinding.oElementContext;  // Get the element context
                let oBindingData = oContext.getObject();   // Retrieve the bound object data
                const aData =JSON.stringify(oBindingData);

                const baseUrl = oEvent.oModel.sServiceUrl;
                const sUrl = baseUrl + `sendForRelease(data='${encodeURIComponent(aData)}')`;

                const response = await fetchData(sUrl);
                console.log(response);

                if(response.value) {
                    MessageToast.show('Sent for release!');
                    buttons[0].setVisible(false);
                    buttons[1].setVisible(false);
                }

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

            oDialog.open();

        }
    };
});
