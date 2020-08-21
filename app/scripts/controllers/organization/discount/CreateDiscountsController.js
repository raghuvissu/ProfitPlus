(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateDiscountsController: function(scope, resourceFactory, location, dateFilter, $rootScope) {
			  
			    scope.discountTypeDatas = [];
		        scope.statusDatas = [];
		        scope.start = {};
		        scope.discountPricesFormData={};
		        scope.clientCategoryDatas=[];
		        scope.discountPrices =[];
		        scope.start.date = dateFilter(new Date(), 'dd MMMM yyyy');
		        scope.minDate = new Date();
		        scope.prevDate = new Date();
			  
		        resourceFactory.discountTemplateResource.get(function(data) {
		        	scope.discountTypeDatas = data.discountTypeData;
		            scope.statusDatas = data.statusData;
		            scope.clientCategoryDatas =data.clientCategoryDatas;
		            scope.clientCategoryDatas.push({"id":0,"mCodeValue":"Default"});
		            scope.formData = {};
		        });
		        
		        scope.doSomething =function(){
			     	   scope.prevDate=scope.start.date;
			        };
			     
		        scope.addDiscountPrice = function () {
			           if (scope.discountPricesFormData.discountRate) {
			        	   
			                scope.discountPrices.push({categoryId:scope.discountPricesFormData.categoryId, 
			                	locale:scope.optlang.code,
			                discountRate:scope.discountPricesFormData.discountRate
			    });
			                
	                scope.discountPricesFormData.categoryId = undefined;
	                scope.discountPricesFormData.discountRate = undefined;
	                
			         }
			    };     
				
			    scope.removeDiscountPrices = function (index) {
		            scope.discountPrices.splice(index,1);
		        };
		        
		        scope.submit = function() {  
		        	
		        	 this.formData.locale = scope.optlang.code;
		             this.formData.dateFormat = "dd MMMM yyyy";
		             var startDate = dateFilter(scope.start.date, 'dd MMMM yyyy');
		             this.formData.startDate = startDate;
		             this.formData.discountRate=0;
		             this.formData.discountPrices = scope.discountPrices;
		             
		            resourceFactory.discountResource.save(this.formData, function(data){
		            		location.path('/discounts');
		             });
		          
		        };	    
		  }
     });
	 mifosX.ng.application.controller('CreateDiscountsController', [
	      '$scope',
	      'ResourceFactory',
	      '$location',
	      'dateFilter',
	      '$rootScope',
	 mifosX.controllers.CreateDiscountsController ]).run(function($log) {
	      $log.info("CreateDiscountsController initialized");
	 });
}(mifosX.controllers || {}));