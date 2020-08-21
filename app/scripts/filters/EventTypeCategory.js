(function(module) {
  mifosX.filters = _.extend(module, {
	  EventTypeCategory: function () {
                    return function(history,val,resourceId) {
                    		
                    	var historyData = history;
                    	var jsonStringData = historyData.replace("{","");
                    	jsonStringData = jsonStringData.replace("}","");
                    	jsonStringData = jsonStringData.replace(/"/g,"");
                    	var jsonArray = JSON.parse(historyData);
                    	var serialNumber = "";
                    	if(jsonArray.serialNumber){
                    		serialNumber = jsonArray.serialNumber[0].serialNumber;
                    	}
                    	var  eventTypeCategoryMsg = {
                    	
                        //client related data
                        "CREATE CLIENT" : "Client Created successfully with Name:"+jsonArray.firstname+jsonArray.lastname,
                        "UPDATE CLIENT" : "{"+jsonStringData+"}",
                        "UPDATE ADDRESS" : "Client Address Updated successfully with "+jsonStringData,
                        "DELETE CLIENT" : "Client Closed successfully with reason id "+jsonArray.closureReasonId,
                        
                        
                       //order related data 
                        "CREATE ORDER" : "PlanCode :"+jsonArray.planCode+" Contract Period :"+jsonArray.contractPeriod,
                        "CHANGEPLAN ORDER" : "PlanCode :"+jsonArray.planCode+" Contract Period :"+jsonArray.contractPeriod,
                        "DELETE ORDER" : "Order Deleted successfully",
                        "EXTENSION ORDER" : "Order Extended to "+jsonArray.extensionPeriod+" Due To "+jsonArray.extensionReason,
                        "RECONNECT ORDER" : "Order Re-Connected successfully with OrderId:"+resourceId,
                        "REACTIVE ORDER" : "Order Re-Actived successfully with OrderId:"+resourceId,
                        "SUSPEND ORDER" : "Order Suspended with reason "+jsonArray.suspensionReason+" and Description "+jsonArray.suspensionDescription,
                        "RETRACKOSDMESSAGE ORDER" : "Order Re-Track OSD Message Added with commandName "+jsonArray.commandName,
                        "APPLYPROMO ORDER" : "Apply Promo Added for Order With Promo Id "+jsonArray.promoId,
                        "TERMINATE ORDER" : "Order Terminated successfully with OrderId:"+resourceId,
                        "DISCONNECT ORDER" : "Order Disconnected successfully with OrderId:"+resourceId,
                        
                        //payments related Data
                        "CREATE PAYMENT" : "Payment done successfully Amount:"+jsonArray.amountPaid+"Reciept NO"+jsonArray.receiptNo,
                        "CANCEL PAYMENT" : "Payment Canceled successfully with remarks "+jsonArray.cancelRemark,
                        
                        //itemsale related data
                        "CREATE ONETIMESALE" : "Item Sale Created Successfully with Charge Code "+jsonArray.chargeCode+" ,UnitPrice "+jsonArray.unitPrice+"" +
                        						" ,Total Price "+jsonArray.totalPrice+" ,Quantity "+jsonArray.quantity+" and SaleType "+jsonArray.saleType+"",
                        						
                        						
                         "CREATE NEWSALE" : "NEWSALE Created Successfully  with Price "+jsonArray.totalPrice+" ," +
                         		"Quantity "+jsonArray.quantity+" and SaleType "+jsonArray.saleType+" With Serial Number "+serialNumber,
                         		
                        "DEALLOCATE INVENTORY" : "Deallocated item",
                        "DELETE ONETIMESALE"   : "Item sale deleted Successfully",
                        "RENEWAL ORDER"   : "Order Renewaled Sucessfully",
                        
                        "CREATE EVENTORDER" : "Event Order Done Successfully Event Id"+jsonArray.eventId+", Format "+jsonArray.formatType,
                        
                        
                        //more info related data
                        "CREATE PARENTCLIENT" : "Parent Added to Client successfully",
                        "CREATE CLIENTCARDDETAILS" : "Client Credit Card Details Added successfully",
                        
                        //notes related data
                        "CREATE CLIENTNOTE" : "Client Notes Created successfully",
                        
                        
                        //statement related data
                        "DELETE BILLMASTER" : "Bill Statement Deleted successfully",
                        
                        //client identifier related data
                        "CREATE CLIENTIDENTIFIER" : "Client Identifier Added successfully",
                        "DELETE CLIENTIDENTIFIER" : "Client Identifier Deleted successfully",
                        
                        
                        //ticket related data
                        "CREATE TICKET" : "Ticket Created successfully",
                        "CLOSE TICKET" : "Ticket Closed successfully",
                        
                        //client contact information related data
                        "CREATE Client_Contact_Info" : "Client Contact Information Added successfully",
                        "UPDATE Client_Contact_Info" : "Client Contact Information Updated successfully",
                        "DELETE Client_Contact_Info" : "Client Contact Information Deleted successfully",
                        
                        
                        //credit distribution related data
                        "CREATE CREDITDISTRIBUTION" : "Credit Distribution ",
                        
                        
                        //adjustment related data
                        "CREATE ADJUSTMENT" : "AmountPaid:"+jsonArray.amount_paid+" AdjustmentType:"+jsonArray.adjustment_type+" AdjustmentCode:"+jsonArray.adjustment_code+" Remarks:"+jsonArray.Remarks,
                        
                        
                        "CREATE OWNEDHARDWARE" : "Owned Hardware Created",
                        "CREATE ALLOCATION" : "Allocation Added successfully",
                        
                        
                        
                       //self care related data 
                        "SELFREGISTRATION ACTIVATE" : "Selfcare Registration Activated",
                        "CREATE SELFCARE" : "Selfcare Account Created successfully with UserName:"+jsonArray.userName,
                        
                        // Redemption related data
                        "CREATE REDEMPTION":"Redemption done successfully PinNumber:"+jsonArray.pinNumber,
                        
                        // ServiceTransfer related data
                        "CREATE SERVICETRANSFER":"Service transfered from "+jsonArray.oldPropertyCode +" to "+jsonArray.newPropertyCode+" with Shift Charge Amount "+jsonArray.shiftChargeAmount,
                        
                        //clientservice related data
                         "CREATE CLIENTSERVICE":"Client Service created successfully for service id:"+jsonArray.serviceId+"",
                        
                         //clientsimpleactivation data
                         "CREATE CLIENTSIMPLEACTIVATION" : "Client simple activation successfully for service id:"+jsonArray.serviceId+"",
                        	
                         //provisioning details data
                         "CONFIRM PROVISIONINGDETAILS" :"provisioning details confirmed",
                         
                        //client serviceactivation data
                         "CREATE CLIENTSERVICEACTIVATION" :"client service activated successfully",
                         
                         //clientservice terminate data
                         "TERMINATE CLIENTSERVICE" :"clientservice terminated successfully",
                         
                         //swaphardware device data
                         "SWAP HARDWAREDEVICE" :"Device swapped successfully From :"+jsonArray.oldSerialNo +" To:"+jsonArray.newSerialNo+"",
                         
                         //clientservice suspend data
                         "SUSPEND CLIENTSERVICE" :"clientservice suspended successfully "
                        
                     };

                      
                      return eventTypeCategoryMsg[val];
                  };
                }
  });
  mifosX.ng.application.filter('EventTypeCategory', [mifosX.filters.EventTypeCategory]).run(function($log) {
    $log.info("EventTypeCategory filter initialized");
  });
}(mifosX.filters || {}));
