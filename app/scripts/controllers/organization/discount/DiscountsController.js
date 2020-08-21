(function(module) {
	mifosX.controllers = _.extend(module, {
		DiscountsController : function(scope, resourceFactory, location, webStorage, PermissionService, $uibModal, route) {
			
			scope.discounts = [];
			scope.promotiondatas = [];
			scope.PermissionService = PermissionService;
			
			var callingTab = webStorage.get('callingTab', null);
			if (callingTab == null) {
				callingTab = "";
			} else {
				scope.displayTab = callingTab.someString;
				if (scope.displayTab == "Promotioncode") {
					scope.PromotionCodeTab = true;
					webStorage.remove('callingTab');
				}
			}
			
				resourceFactory.discountsResource.getDiscount(function(data) {
					scope.discounts = data;
				});
			
				resourceFactory.promotionResource.get(function(data) {
					scope.promotiondatas = data;
				});
			
			scope.routeToDiscounts = function(id) {
				location.path('/viewdiscounts/' + id);
			};
			scope.routeToPromotion = function(id) {
				location.path('/viewpromotioncode/' + id);
			};
			
			scope.deleteDiscount = function (id){
	         	scope.discountId=id;
	          	 $uibModal.open({
	  	                templateUrl: 'deletePopupForDiscount.html',
	  	                controller: approve,
	  	                resolve:{}
	  	        });
	         };
			
	         function  approve($scope, $uibModalInstance) {
		      		$scope.approve = function () {
		              	resourceFactory.discountResource.remove({discountId: scope.discountId} , {} , function() {
		                    route.reload();
		     });
		              	
		            $uibModalInstance.dismiss('delete');
		      		};
		            $scope.cancel = function () {
		            	$uibModalInstance.dismiss('cancel');
		            };
		        }
		      	  	
	         scope.deletePromotion = function (id){
		      		scope.promotionId = id;
		     	    $uibModal.open({
		     		  	templateUrl: 'deletepopupForPromotionCodes.html',
		               	controller: approvePromotion,
		               	resolve:{}
		           	});
		             
		        };
		        
		        function approvePromotion($scope, $uibModalInstance) {
		        	$scope.approve = function (act) {
		        		scope.approveData = {};
		                resourceFactory.promotionResource.remove({promotioncodeId: scope.promotionId} , {} , function(data) {
		                	webStorage.add("callingTab", {someString: "Promotioncode" });
		                	route.reload();
		        });
		                
		                $uibModalInstance.close('delete');
		            };
		            $scope.cancel = function () {
		            	$uibModalInstance.dismiss('cancel');
		            };
		        };    
		 }
	});
	mifosX.ng.application.controller('DiscountsController',[ 
	    '$scope',
	    'ResourceFactory', 
	    '$location',
	    'webStorage',
	    'PermissionService',
	    '$uibModal',
	    '$route',
	mifosX.controllers.DiscountsController ]).run(function($log) {
	    	$log.info("DiscountsController initialized");
	});
}(mifosX.controllers || {}));