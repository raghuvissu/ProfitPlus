(function(module) {
	mifosX.controllers = _.extend(module, {
		AddBillModesController : function(scope,webStorage, routeParams , location, resourceFactory,dateFilter) {
			
		    scope.formData = {};
			scope.currencydatas = [];
			billFrequencyCodeDatas = [];
			billSupressionDatas = [];
			scope.clientId = routeParams.clientId;
			scope.date = {};
			
			resourceFactory.clientBillProfileResource.get({clientId: routeParams.clientId, template : 'true'} ,function(data){
				
				scope.currencydatas = data.currencyData.currencyOptions;
				scope.billFrequencyCodeDatas = data.billFrequencyCodeData;
				scope.billSupressionDatas = data.billSupressionData;
				
				scope.formData = {
					billDayOfMonth : data.billDayOfMonth,
					billCurrency : data.billCurrency,
					billFrequency : data.billFrequency,
					billSegment : data.billSegment,
					nextBillDay : data.nextBillDay,
					lastBillDay : data.lastBillDay,
					lastBillNo : data.lastBillNo,
					paymentType : data.paymentType,
					billSuppressionFlag : data.billSuppressionFlag,
					billSuppressionId : data.billSuppressionId,
					firstBill : data.firstBill,
					hotBill : data.hotBill,
				};
				
				var nextBillDay =data.nextBillDay; 
	            var lastBillDay =data.lastBillDay;
	            
	            if(nextBillDay){
	            scope.date.nextBillDay = dateFilter(new Date(nextBillDay),'dd MMMM yyyy');
	            }
	            if(lastBillDay){
	            	 scope.date.lastBillDay = dateFilter(new Date(lastBillDay),'dd MMMM yyyy');
	            }
				
			});
			
			scope.getBothcurrency = function(code,name){
				return code+"--"+name;
	        };
	        
	        scope.getBothbillSupression = function(id,minBillValue,noOfCycleSuppress){
				return id+"--"+minBillValue+"--"+noOfCycleSuppress;
	        };
			 
			scope.submit = function() {
				scope.formData.dateFormat = "dd MMMM yyyy";
				scope.formData.nextBillDay = dateFilter(scope.date.nextBillDay,scope.formData.dateFormat);
	            scope.formData.lastBillDay = dateFilter(scope.date.lastBillDay,scope.formData.dateFormat);
				
				this.formData.locale = scope.optlang.code;
				resourceFactory.clientBillInfoResource.update({'clientId' : routeParams.clientId}, scope.formData, function(data) {
					location.path('/viewclient/' + data.resourceId);
				});
		    };
				
		}
	
	});
	mifosX.ng.application.controller('AddBillModesController', [
		 '$scope',
		 'webStorage', 
		 '$routeParams',
		 '$location', 
		 'ResourceFactory', 
		 'dateFilter',
		 mifosX.controllers.AddBillModesController]).run(function($log) {
			 $log.info("AddBillModesController initialized");
		 });
}(mifosX.controllers || {}));
