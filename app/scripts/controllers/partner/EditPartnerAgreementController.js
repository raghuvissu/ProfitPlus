(function(module) {
	  mifosX.controllers = _.extend(module, {
		  EditPartnerAgreementController: function(scope, resourceFactory, location,dateFilter,$rootScope,webStorage,routeParams) {
		     
			  scope.formData = {};
			  scope.agreementId= routeParams.id;
			  scope.partnerId= routeParams.partnerId;
			  scope.minDate=dateFilter(new Date(),'dd MMMM yyyy');
			  scope.agreementTypes = [];
			  scope.sourceDatas = [];
			  scope.partnerSourceData = [];
			  scope.exitSourceData = [];
			  scope.sourceData = []; 
			  scope.removeData = [];
			  scope.index=0;
			  scope.partnerName =  webStorage.get("partnerName");
		
		        	 resourceFactory.agreementResource.query({agreementId: routeParams.id,anotherResource:'details',template : 'true'} , function(data) {
		        	    scope.agreements = data;
		        	    scope.officeId = scope.agreements[0].officeId;
		        	    for(var i=0; i< scope.agreements.length; i++){
		        	    if(scope.agreements[i].id)	{
		        	    	scope.formData.agreementStatus=  scope.agreements[i].agreementStatus;
		        	        var  actDate = dateFilter(scope.agreements[i].startDate,'dd MMMM yyyy');
		        	        scope.formData.startDate=new Date(actDate);
		        	        if(scope.agreements[i].endDate){
		        	        var  actDate1 = dateFilter(scope.agreements[i].endDate,'dd MMMM yyyy');
		        	     	scope.formData.endDate=new Date(actDate1);
		        	       }
							scope.exitSourceData.push({
							  source :scope.agreements[i].source,
							  shareType : scope.agreements[i].shareType,
							  shareAmount : scope.agreements[i].shareAmount,
							  detailId : scope.agreements[i].detailId,
							  locale : scope.optlang.code
						  });
					    }else{
							    scope.agreementTypes =scope.agreements[i].agreementTypes;
							    scope.sourceDatas = scope.agreements[i].sourceData;
								scope.shareTypes = scope.agreements[i].shareTypes;
							}
		        	    
		        	    }
		        	    for(var i in scope.exitSourceData ){
		        	    for (var j in scope.sourceDatas){
	            			if(scope.exitSourceData[i].source == scope.sourceDatas[j].mCodeValue){
	            				scope.exitSourceData[i].source = scope.sourceDatas[j].id;
	            			}
		        	     }
		        	   }
		        	 });
			  
			  scope.partnersTab=function(){
		        	webStorage.add("callingTab", {someString: "Partners" });
		        };
				  
				  scope.addSourceCategories = function(){

					  scope.exitSourceData.push({
						  source : scope.sourceData.source,
						  shareType : scope.sourceData.shareType,
						  shareAmount : scope.sourceData.shareAmount,
						  locale : scope.optlang.code
						  
					  });
			        };	  
				  
			        scope.removeSourceCategories = function(detailId,index){
			        	if(detailId){
			        		scope.removeData.push(scope.exitSourceData[index]);
			        		scope.exitSourceData.splice(index,1);
			        	}else{
			        	scope.exitSourceData.splice(index,1);	
			        	
			        }
			        	
			        };  
			        
			 
			        
		   
			  scope.submit =function(){
				  
					scope.formData.locale = scope.optlang.code;
				    scope.formData.dateFormat = 'dd MMMM yyyy';
				    var startDate = dateFilter(scope.formData.startDate, 'dd MMMM yyyy');
				    var endDate = dateFilter(scope.formData.endDate, 'dd MMMM yyyy');
			        scope.formData.startDate = startDate;
			        scope.formData.endDate = endDate || "";
		            scope.formData.sourceData = scope.exitSourceData;
		            scope.formData.removeSourceData = scope.removeData;
			        resourceFactory.agreementResource.update({agreementId: routeParams.id},scope.formData,function(data){
			    	location.path('/viewpartner/' +scope.partnerId + '/' + data.officeId);
			    	
			      },function(errors){
			    	  for(var i in  scope.partnerSourceData){
			    		var error= $("#source" +scope.partnerSourceData[i].index).val();
			    		var error1= $("#shareType" +scope.partnerSourceData[i].index).val();
			    		var error2= $("#shareAmount" +scope.partnerSourceData[i].index).val();
			    	
			    		if(error == "?"){
			    		$("#source" +scope.partnerSourceData[i].index).addClass("validationerror");}
			    		if(error1 == "?"){
			    		$("#shareType" +scope.partnerSourceData[i].index).addClass("validationerror");}
			    		if(error2 == ""){
			    		$("#shareAmount" +scope.partnerSourceData[i].index).addClass("validationerror");}
			    	  }
			      });
	    };        
		 
		  }
	  });
	  mifosX.ng.application.controller('EditPartnerAgreementController',
		['$scope', 
		 'ResourceFactory', 
		 '$location',
		 'dateFilter',
		 '$rootScope',
		 'webStorage',
		 '$routeParams', mifosX.controllers.EditPartnerAgreementController]
	  ).run(function($log) {
	    $log.info("EditPartnerAgreementController initialized");
	  });
	}(mifosX.controllers || {}));