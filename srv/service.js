const cds = require('@sap/cds/libx/_runtime/cds');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = async function (srv) { 

    const {Customer,PurchaseEnquiry,Vehicle,PurchaseOrder, Files, Quotation, PaymentDetails, SalesOrder, PaymentSettings} = srv.entities;


function generateInvoice1(invoice) {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument({ margin: 50 });

        // Create a buffer stream to store the PDF in memory
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers); // Combine buffer parts into one
            resolve(pdfData); // Resolve the Promise with the PDF data
        });

        // Add the logo on the right and "INVOICE" text on the left
        doc.image('logo/logo.png', 400, 45, { width: 150 })
            .fontSize(20)
            .text("INVOICE", 50, 50)
            .moveDown();

        // Invoice header
        doc.fontSize(10)
            .text(`Invoice Number: ${invoice.invoiceNumber}`, 50, 120)
            .text(`Date: ${invoice.date}`, 50, 135)
            .text(`Due Date: ${invoice.dueDate}`, 50, 150)
            .moveDown();

        // Customer details
        doc.fontSize(10)
            .text(`Bill To:`, 50, 180)
            .text(`${invoice.customerName}`, 50, 195)
            .text(`${invoice.customerAddress}`, 50, 210)
            .moveDown(2);

        // Draw a horizontal line to separate header from item details
        doc.moveTo(50, 250)
            .lineTo(550, 250)
            .stroke();

        // Invoice table header with borders and centered text
        let tableTop = 260;
        drawTableRow(doc, tableTop, "Description", "Unit Price", "Quantity", "Total", true);

        // Add a table for the invoice items with borders and centered text
        let itemIndex = 0;
        let totalAmount = 0;
        invoice.items.forEach(item => {
            const description = item.vehicleName + ', ' + item.vehicleColor;
            const y = tableTop + 25 + (itemIndex * 25);
            drawTableRow(doc, y, description, item.price.toFixed(2), item.quantity, (item.price * item.quantity).toFixed(2), false);
            totalAmount += item.price * item.quantity;
            itemIndex++;
        });

        // Add total amount at the bottom
        const totalY = tableTop + (itemIndex * 25) + 50;
        doc.fontSize(12)
            .text(`Total Amount: $${totalAmount.toFixed(2)}`, 400, totalY, { align: 'right' });

        // Draw a horizontal line above the total
        doc.moveTo(50, totalY - 10)
            .lineTo(550, totalY - 10)
            .stroke();

        // Footer
        doc.moveDown(2);
        doc.fontSize(10)
            .text("Thank you for your business!", 50, totalY + 50, { align: 'center' })
            .text("Please make payment by the due date.", 50, totalY + 65, { align: 'center' });

        // Finalize and store the PDF
        doc.end();
    });
}

// Helper function to draw a table row with borders and centered text
function drawTableRow(doc, y, description, unitPrice, quantity, total, isHeader) {
    const rowHeight = 25;
    const textPadding = 5;
    
    // Draw borders for the row
    doc.rect(50, y, 150, rowHeight).stroke(); // Description column
    doc.rect(200, y, 100, rowHeight).stroke(); // Unit Price column
    doc.rect(300, y, 100, rowHeight).stroke(); // Quantity column
    doc.rect(400, y, 100, rowHeight).stroke(); // Total column

    // Set bold font for header
    if (isHeader) {
        doc.font('Helvetica-Bold');
    } else {
        doc.font('Helvetica');
    }

    // Center align the text inside the columns
    doc.fontSize(10)
        .text(description, 50, y + textPadding, { width: 150, align: 'center' })
        .text(`$${unitPrice}`, 200, y + textPadding, { width: 100, align: 'center' })
        .text(quantity, 300, y + textPadding, { width: 100, align: 'center' })
        .text(`$${total}`, 400, y + textPadding, { width: 100, align: 'center' });
}


    
    this.on('generateInvoice', async (req) => {
        debugger

        const paymentId1 = req.data.paymentId;
        console.log(paymentId1);

        var payment = await SELECT.one.from(PaymentDetails).where ({paymentId : paymentId1});
        var sales = await SELECT.one.from(SalesOrder).where ({soID : payment.soID});
        var purchase = await SELECT.one.from(PurchaseOrder).where ({poID : sales.poID});
        var quotation = await SELECT.one.from(Quotation).where ({quotationID : purchase.quotationID});
        var enquiry = await SELECT.one.from(PurchaseEnquiry).where ({purchaseEnquiryID : quotation.purchaseEnquiryID});
        var vehicle = await SELECT.from(Vehicle).where ({purchaseEnquiryID : enquiry.purchaseEnquiryID});
        var customer = await SELECT.one.from(Customer).where ({customerID  : enquiry.customerID });

        //Sample invoice data
        const invoice = {
            invoiceNumber: paymentId1,
            date: new Date().toLocaleDateString('en-CA'),
            dueDate: '2024-10-15',
            customerName: customer.name,
            customerAddress: customer.address,
            items: vehicle
        };

        const pdfData = await generateInvoice1(invoice);

        const file = {
            content: pdfData,       
            mediaType: 'application/pdf', 
            fileName: `invoice_${paymentId1}.pdf`, 
            size: pdfData.length, 
            invoiceID: paymentId1,
            paymentId: paymentId1    
          }

          const result = await INSERT.into(Files).entries(file);
          const fileID = result.req.query.INSERT.entries[0].ID;
          const urll = `Files(ID=${fileID})/content`
          await cds.update(Files).set({url:urll}).where({ID : fileID});

          console.log(result);

        return urll;

    });

    // this.before('CREATE', Files, async (req) => { 
    //     const url = `Files(ID=${req.data.ID})/content`;
    //     req.data.url = url;
    // });


//     async function postCall(csrfToken, cookies, data) {
//       debugger
//       const username = 'DEVELOPER04';
//       const password = 'Peol@12345';
  
//       const url = `https://ashvirtual:8003/sap/opu/odata/sap/Z_ODATA_CREATE_SO_22_SRV/so_headerSet`; 
      
  
//           const response = await axios.post(url, data, {
//               auth: {
//                   username: username,
//                   password: password
//               },
//               httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }), // Ignore SSL certificate for dev environments
//               headers: {
//                   'Content-Type': 'application/json',
//                   'X-CSRF-Token': csrfToken, // Include the CSRF token
//                   'Cookie': cookies // Include the session cookies
//               }
//           });
          
//           return response.data;
  
//   }
  
//   async function fetchCsrfToken() {
//       const username = 'DEVELOPER04';
//       const password = 'Peol@12345';
  
//       const url = `https://ashvirtual:8003/sap/opu/odata/sap/Z_SALESORDER_16_SRV`;
  
//       try {
//           // Send a GET request to fetch the CSRF token
//           const response = await axios.get(url, {
//               auth: {
//                   username: username,
//                   password: password
//               },
//               httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }), // Ignore SSL certificate for dev environments
//               headers: {
//                   'X-CSRF-Token': 'Fetch'  // Request CSRF token
//               }
//           });
  
//           // Extract the CSRF token and session cookies from the response headers
//           const csrfToken = response.headers['x-csrf-token'];
//           const cookies = response.headers['set-cookie'];
          
//           console.log('CSRF Token:', csrfToken);
//           console.log('Cookies:', cookies);
          
//           return { csrfToken, cookies };
//       } catch (error) {
//           console.error('Error fetching CSRF token:', error.response ? error.response.data : error.message);
//       }
//   }


//     this.on('generateSO', async (req) => { 
//         debugger
//         const jsonString = req.data.data;  // This is the stringified JSON object
//         const poData = JSON.parse(jsonString);  // Parse it back into an object

//         const data = {
//             "doc_type": "TA",
//             "sales_org": "1000",
//             "distr_chan": "10",
//             "division": "00",
//         "so_itemSet": [
//         {
//             "itm_number": "000010",
//             "material": "100-100",
//             "target_qty": "100",
//             "t_unit_iso": "ST",
//             "sales_unit": "ST",
//             "partn_role": "AG",
//             "partn_numb": "0000001000"
//         }
//         ]
//         };   

//         // const csrfData = await fetchCsrfToken();
//         // const { csrfToken, cookies } = csrfData;
//         // const response = await postCall(csrfToken, cookies, data);
//         // console.log(response);

//         const SoID = '000' + Math.floor(10000 + Math.random() * 90000).toString();
        
//         const sales = {
//         soID : SoID,
//         poID : poData.poID,
//         dealerCode : 'DO11',
//         status: 'Pending'
//       }
      
//       const result = await INSERT.into(SalesOrder).entries(sales);
//       const st = 'Generated'
//       await cds.update(PurchaseOrder).set({status:st}).where({ poID : poData.poID});

//       const settings = await INSERT.into(PaymentSettings).entries({
//         soID : SoID
//       });
//       return 'Generated Sales Order';

//     });
  

//     async function getOAuthToken() {
//         const tokenResponse = await axios.post('https://8c69b62etrial.authentication.us10.hana.ondemand.com/oauth/token', {
//           grant_type: 'client_credentials',
//           client_id: 'sb-f298f944-e8da-4490-9191-d668029c5b94!b344672|xsuaa!b49390',
//           client_secret: '7af3afa2-38d9-4d40-89e2-8e572191f51c$sILcmKdCXZiovKuSlCf1cTiR1xb59kCSFQqqVpRmPz8='
//         }, {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//           }
//         });
//         return tokenResponse.data.access_token;
//     }


//       this.on('sendForRelease', async (req) => { 
//         debugger
//         const jsonString = req.data.data;  // This is the stringified JSON object
//         const data = JSON.parse(jsonString);  // Parse it back into an object

//         const purchase = data.salesToPurchase;
//         const quotation = purchase.purchaseToQuotation;
//         const enquiry =  quotation.quototionToEnquiry;
//         const vehicle = enquiry.enquiryToVehicle;
//         const customer = enquiry.enquiryToCustomer;

//         const vehicleDetails =JSON.stringify(vehicle);

//         const baseUrl = 'https://c8d78be1trial-dev-04-mahindra2-04-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/'
//         const url = baseUrl + `PurchaseEnquiry(purchaseEnquiryID='${enquiry.purchaseEnquiryID}',IsActiveEntity=true)/enquiryToVehicle`
    
//         const oauthToken = await getOAuthToken();

//         const workflowData =
//         {
//             "definitionId": "us10.8c69b62etrial.workflowformmfinance.releaseSO",
//             "context": {
//                 "customerid": customer.customerID,
//                 "_name": customer.name,
//                 "address": customer.address,
//                 "link": vehicleDetails,
//                 "companyname": "Acme Corp",
//                 "contactperson": "Jane Smith",
//                 "contactnumber": "+1-800-555-1234",
//                 "email": "mailto:contact@acmecorp.com",
//                 "van": "VAN00123",
//                 "address_1": "456 Elm St, Springfield",
//                 "soid": data.soID,
//                 "poid": purchase.poID
//             }
//         }
//         const token = `Bearer ${oauthToken}`;

                  
              
//               try {
//                 const res = await axios.post(
//                     "https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances",
//                     workflowData,
//                     {
//                         headers: {
//                             "Accept-Language": "en",
//                             "DataServiceVersion": "2.0",
//                             "Accept": "application/json",
//                             "Content-Type": "application/json",
//                             "Authorization": token
//                         }
//                     }
        
//                 );
//         console.log("Workflow started successfully:", res.data);
//         const st = 'Sent For Approval';
//         //await cds.update(SalesOrder).set({status:st}).where({ soID : data.soID});
//     } catch (error) {
//     // Log the detailed error response
//     console.error("Error starting workflow:", error.response ? error.response.data : error.message);
//     }

//         return 'SO Sent For Release';
//       });
}

