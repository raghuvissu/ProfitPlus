(function (module) {
    mifosX.controllers = _.extend(module, {
    	SearchSubmitController: function (scope, location, resourceFactory, $uibModal) {
    		
    		scope.columnName ="serial_no";
    		
    		scope.searchSubmit = function(){
    			
    	  		resourceFactory.searchClientDataResource.get({columnName:scope.columnName,columnValue: scope.columnValue } , function(data){
    	  			if(data.id !=null){
    	  				location.path('/viewclient/id/'+data.id);
    	  			}else{
    	  				$uibModal.open({
    	  	                  templateUrl: 'searchClient.html',
    	  	                  controller: searchClientCtrl,
    	  	                  resolve:{}
    	  	              });
    	  			}
    	  		});
    	  	};
    	  	
    	  	function searchClientCtrl($scope, $uibModalInstance) {
    	          $scope.cancel = function () {
    	              $uibModalInstance.dismiss('cancel');
    	          };
    	      }
    		
        }
    });
    mifosX.ng.application.controller('SearchSubmitController', ['$scope', '$location', 'ResourceFactory', '$uibModal',
                                                                mifosX.controllers.SearchSubmitController]).run(function ($log) {
        $log.info("SearchSubmitController initialized");
    });
}(mifosX.controllers || {}));
