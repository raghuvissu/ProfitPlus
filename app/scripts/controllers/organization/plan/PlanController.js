(function(module) {
  mifosX.controllers = _.extend(module, {
	  PlanController: function(scope, resourceFactory,location,$uibModal,route) {
        scope.plans = [];
        //scope.PermissionService = PermissionService;
        resourceFactory.planResource.query(function(data) {
            scope.plans= data;
        });
        scope.routeTo = function(id){
            location.path('/viewplan/'+ id);
          };
          
          scope.deleteplan=function(value){
        	  scope.planId=value;
        	  $uibModal.open({
                  templateUrl: 'deleteplan.html',
                  controller: Approve,
                  resolve:{}
              });
          };
          
          scope.editPlanQualifier=function(value){
        	  scope.planId=value;
        	  $uibModal.open({
                  templateUrl: 'editplanqualifier.html',
                  controller: ApproveQualifier,
                  resolve:{}
              });
          };
          
          
         function Approve($scope, $uibModalInstance) {
        	  
              $scope.approve = function () {
            	  
                  scope.approveData = {};
                  resourceFactory.planResource.remove({planId:scope.planId},{},function(){
                      route.reload();
                  });
                  $uibModalInstance.close('delete');
              };
              $scope.cancel = function () {
            	  $uibModalInstance.dismiss('cancel');
              };
          }
         
         function ApproveQualifier($scope, $uibModalInstance) {
        	 $scope.selectedServices = [];
        	 $scope.partners = [];
        	 $scope.allowed = [];
        	 $scope.restricted = [];
        	 $scope.formData = {};
        	 resourceFactory.planQualifierResource.get({planId:scope.planId},function(data) {
        		 //$scope.planqualifiers= data;
        		 $scope.availabePartnersDatas = data.availabePartnersDatas;
        		 $scope.partnersDatas = data.partnersDatas;
             });
             $scope.approve = function () {
            		var temp = [];
                 for ( var i in $scope.partnersDatas) {					
						temp[i] = $scope.partnersDatas[i].id;					
					}					
                 $scope.formData.partners = temp;		
                 resourceFactory.planQualifierResource.update({planId:scope.planId},$scope.formData,function(){
                     route.reload();
                 });
                 $uibModalInstance.close('delete');
             };
             $scope.cancel = function () {
            	 $uibModalInstance.dismiss('cancel');
             };
             
             $scope.restrict = function() {				
 				for ( var i in this.allowed) {				
 					for ( var j in $scope.availabePartnersDatas) {					
 						if ($scope.availabePartnersDatas[j].id == this.allowed[i]) {				
 							var temp = {};								
 							temp.id = this.allowed[i];				
 							temp.partnerName = $scope.availabePartnersDatas[j].partnerName;
 							$scope.partnersDatas.push(temp);
 							$scope.availabePartnersDatas.splice(j, 1);						
 						}					
 					}			
 				}						
 			};
 			
 			$scope.allow = function() {					
				for ( var i in this.restricted) {						
					for ( var j in $scope.partnersDatas) {							
						if ($scope.partnersDatas[j].id == this.restricted[i]) {								
							var temp = {};								
							temp.id = this.restricted[i];
							temp.partnerName = $scope.partnersDatas[j].partnerName;
							$scope.availabePartnersDatas.push(temp);
							$scope.partnersDatas.splice(j, 1);						
						}						
					}						
				}					
			};
         }					
    }
  });
  mifosX.ng.application.controller('PlanController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     '$uibModal',
     '$route', 
     mifosX.controllers.PlanController]).run(function($log) {
    $log.info("PlanController initialized");
  });
}(mifosX.controllers || {}));
