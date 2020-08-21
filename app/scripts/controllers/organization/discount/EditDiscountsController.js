(function(module) {
	mifosX.controllers = _.extend(module, {
		EditDiscountsController : function(scope, resourceFactory, location, routeParams, dateFilter) {
			
			scope.reportParameters = [];
			scope.discountTypeDatas = [];
			scope.statuses = [];
			scope.start = {};
			scope.formData = {};
			scope.date = {};
			scope.discountIdForCancel = routeParams.id;
			scope.minDate = new Date();
	        scope.prevDate = new Date();
	        scope.discountPricesFormData = [];
			
			resourceFactory.discountsResource.getDiscountDetails({discountId : routeParams.id,template : 'true'	},	function(data) {
				scope.discountdetail = data;
				scope.discountTypeDatas = data.discountTypeData;
			    scope.statusDatas = data.statusData;
				scope.formData = data;
				scope.clientCategoryDatas =data.clientCategoryDatas;
				scope.clientCategoryDatas.push({"id":0,"mCodeValue":"Default"});
				var actDate = dateFilter(data.discountStartDate,'dd MMMM yyyy');
			    scope.start.startDate = new Date(actDate);
			    scope.discountPrices=data.discountDetailDatas;

			});
			
			scope.doSomething =function(){
		     	   scope.prevDate=scope.start.date;
		        };

			
			 scope.addDiscountPrice = function () {
				 console.log("hi");
		           if (scope.discountPricesFormData.discountRate) {
		        	   
		                scope.discountPrices.push({categoryId:scope.discountPricesFormData.categoryId, 
		                	locale:scope.optlang.code,id:scope.discountPricesFormData.id,
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
				this.formData.startDate = dateFilter(scope.start.startDate,	'dd MMMM yyyy');
				this.formData.discountStatus;
				this.formData.discountType;
				 scope.formData.discountPrices =new Array();
                   if (scope.discountPrices.length > 0) {
                	   for (var i in scope.discountPrices) {
                		   scope.formData.discountPrices.push({categoryId:scope.discountPrices[i].categoryId,
                			   id:scope.discountPrices[i].id,
	                	   discountRate:scope.discountPrices[i].discountRate,locale:scope.optlang.code});
	                 };
	              }
                   this.formData.discountPrices = scope.formData.discountPrices;
				delete this.formData.id;
				delete this.formData.status;
				delete this.formData.discountTypeData;
				delete this.formData.statusData;
				delete this.formData.discountStartDate;
				delete this.formData.clientCategoryDatas;
				delete this.formData.discountDetailDatas;
				
				
				resourceFactory.discountsResource.update({discountId : routeParams.id}, this.formData, function(data) {
					location.path('/viewdiscounts/' + data.resourceId);
				});
			};
			
		}
	});
	mifosX.ng.application.controller('EditDiscountsController',	[
		    '$scope', 
		    'ResourceFactory',
		    '$location', 
		    '$routeParams',	
		    'dateFilter', 
		   
   mifosX.controllers.EditDiscountsController ]).run(function($log) {
		    $log.info("EditDiscountsController initialized");
   });
}(mifosX.controllers || {}));