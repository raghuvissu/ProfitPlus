(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateEventPriceController : function(scope, routeParams, resourceFactory, location,PermissionService,$rootScope) {
		
			scope.optTypes=[];
			scope.clientTypes=[]; 
			scope.format=[];
			scope.discountdata=[];
			scope.formData={};
			scope.hideForGame = true;
			resourceFactory.eventPriceTemplateResource.getpriceDetails({eventId: routeParams.id} ,function(data) {
				
				scope.eventId=data.eventId;
				scope.catId = data.categoryId;
				scope.formData=data;
				if(scope.catId == '999991'){
					scope.hideForGame = false;
					scope.formData.formatType='SD';
				}
				scope.OptTypes = data.optTypes;				
				scope.Format = data.format;				
				scope.Discountdatas = data.discountdata;				
				scope.ClientTypes = data.clientTypes;
				
				
			});						
			scope.submit = function() {
				delete this.formData.optTypes;
				delete this.formData.discountdata;
				delete this.formData.format;
				delete this.formData.clientTypes;
				delete this.formData.categoryId;
				this.formData.locale = scope.optlang.code;
				resourceFactory.eventpriceResource.save({'eventId': routeParams.id}, this.formData,
						function(data) {
						if(PermissionService.showMenu('READ_EVENTPRICE'))
							location.path('/viewEventPrice/'+ data.resourceId);
						else
							location.path('/viewEvent/'+scope.eventId);							
						});
			};
		}
	});
	mifosX.ng.application.controller('CreateEventPriceController', ['$scope', '$routeParams', 'ResourceFactory', '$location','PermissionService','$rootScope', mifosX.controllers.CreateEventPriceController]).run(function($log) {
	    $log.info("CreateEventPriceController initialized");
	  });
}(mifosX.controllers || {}));
