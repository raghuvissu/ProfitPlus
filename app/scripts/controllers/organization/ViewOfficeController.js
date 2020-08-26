(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewOfficeController: function (scope, routeParams, route, location, resourceFactory, 
            paginatorService, $uibModal, Upload, $rootScope, API_VERSION, $http, $timeout) {
            scope.charges = [];
            scope.imageLoader = true;
            
            resourceFactory.officeResource.get({officeId: routeParams.id}, function (data) {
                scope.office = data;
                scope.getImages();
            });

            resourceFactory.DataTablesResource.getAllDataTables({apptable: 'm_office'}, function (data) {
                scope.officedatatables = data;
            });
            scope.dataTableChange = function (officedatatable) {
                resourceFactory.DataTablesResource.getTableDetails({datatablename: officedatatable.registeredTableName,
                    entityId: routeParams.id, genericResultSet: 'true'}, function (data) {
                    scope.datatabledetails = data;
                    scope.datatabledetails.isData = data.data.length > 0 ? true : false;
                    scope.datatabledetails.isMultirow = data.columnHeaders[0].columnName == "id" ? true : false;
                    scope.showDataTableAddButton = !scope.datatabledetails.isData || scope.datatabledetails.isMultirow;
                    scope.showDataTableEditButton = scope.datatabledetails.isData && !scope.datatabledetails.isMultirow;
                    scope.singleRow = [];
                    for (var i in data.columnHeaders) {
                        if (scope.datatabledetails.columnHeaders[i].columnCode) {
                            for (var j in scope.datatabledetails.columnHeaders[i].columnValues) {
                                for (var k in data.data) {
                                    if (data.data[k].row[i] == scope.datatabledetails.columnHeaders[i].columnValues[j].id) {
                                        data.data[k].row[i] = scope.datatabledetails.columnHeaders[i].columnValues[j].value;
                                    }
                                }
                            }
                        }
                    }
                    if (scope.datatabledetails.isData) {
                        for (var i in data.columnHeaders) {
                            if (!scope.datatabledetails.isMultirow) {
                                var row = {};
                                row.key = data.columnHeaders[i].columnName;
                                row.value = data.data[0].row[i];
                                scope.singleRow.push(row);
                            }
                        }
                    }
                });
            };

            scope.deleteAll = function (apptableName, entityId) {
                resourceFactory.DataTablesResource.delete({datatablename: apptableName, entityId: entityId, genericResultSet: 'true'}, {}, function (data) {
                    route.reload();
                });
            };

            scope.viewDataTable = function (registeredTableName, data){
                if (scope.datatabledetails.isMultirow) {
                    location.path("/viewdatatableentry/"+registeredTableName+"/"+scope.office.id+"/"+data.row[0]);
                }else{
                    location.path("/viewsingledatatableentry/"+registeredTableName+"/"+scope.office.id);
                }
            };

            scope.getPayments = function(offset, limit,callback, payment) {
                resourceFactory.FiletransForOtp.get({offset : offset,limit : limit,type : 'PAYMENT', otp : scope.enteredOtp, officeId:scope.office.id}, callback);
            };

            scope.confirmOtpSubmit = function(otp){
                scope.enteredOtp = otp;
                scope.financialPayments = paginatorService.paginate(scope.getPayments, 14);
            }


            scope.confirmPayment = function (paymentId, clientId){
                 $uibModal.open({
                     templateUrl: 'confirmPaymentPopup.html',
                     controller: approveConfirmPaymentCtrl,
                     resolve : {
                                paymentObj : function() {
                                    return {id: paymentId, clientId: clientId, otp: scope.enteredOtp};
                                }
                            }
                 });
             };
                  
             function  approveConfirmPaymentCtrl($scope, $uibModalInstance, paymentObj) {
                 $scope.approve = function () {

                    var params = {paymentId: paymentObj.id, otp: paymentObj.otp};
                    console.log(params);
                    $scope.flagconfirmpayment = true;
                    resourceFactory.confirmPaymentResource.update(params, {}, function(data) {
                        location.path('/viewclient/id/'+ paymentObj.clientId);
                        $uibModalInstance.dismiss('delete');
                    },function(errData) {
                        $scope.flagconfirmpayment = false;
                    });
                             
                 };

                 $scope.cancel = function () {
                     $uibModalInstance.dismiss('cancel');
                 };
             }
             
             scope.errorTxt = "";
             scope.isError = false;
             scope.getImages = function(){
            	 scope.imageArr = [];
            	 $http({
                     method: 'GET',
                     url: $rootScope.hostUrl + API_VERSION + '/offices/images/' + scope.office.id
                 }).then(function (imageData) {
                 	console.log(imageData);
                 	if(imageData.data){
                 		angular.forEach(imageData.data, function(img, fileName){
                 			scope.imageArr.push({name: fileName, image: img});
                 		});
                 	}
                 	
                 	$timeout(function(){
                 		scope.imageLoader = false;
                 	}, 3000)
                 });
             }
             
             scope.deleteImg = function (fileName, idx) {
            	 var modalInstance = $uibModal.open({
    				 templateUrl: 'deleteImg.html',
    				 controller: deleteImageController,
    				 resolve : {
                         imgObj : function() {
                             return {fileName: fileName, officeId: scope.office.id};
                         }
                     }
    			 });
            	 
            	 modalInstance.result.then(function (result) {
  	        	   if(result){
  	        		 scope.imageArr.splice(idx, 1);
  	        	   }
  	           }, function () {});
            	 
             };
             
             function  deleteImageController($scope, $uibModalInstance, imgObj) {
                 $scope.approveDelete = function () {

                    resourceFactory.officeImgResource.delete({officeId: imgObj.officeId, fileName: imgObj.fileName}, {}, function(data) {
                        $uibModalInstance.close('delete');
                    },function(errData) {
                    });
                             
                 };

                 $scope.cancel = function () {
                     $uibModalInstance.dismiss('cancel');
                 };
             }
             
             var formdata = new FormData();var totalFiles = [];
             scope.onFileSelect = function ($files) {
            	 formdata = new FormData(); totalFiles = [];
                 angular.forEach($files, function (value, key) {
                	 console.log(value);
                     formdata.append('file', value);
                     totalFiles.push(value);
                 });
             };
             
             scope.uploadImage = function () {
            	 scope.errorTxt = "";
                 scope.isError = false;
                 
                 $timeout(function(){
            		 scope.errorTxt = "";
                     scope.isError = false;
            	 }, 3000);
                 
            	 if(totalFiles.length == 0){
            		 scope.errorTxt = "Please choose at least one image";
                     scope.isError = true;
            		 return ;
            	 }
            	 if(scope.imageArr.length >= 6){
            		 scope.errorTxt = "You already uploaded 6 images...first delete the image(s), then upload.";
                     scope.isError = true;
            		 return ;
            	 }
            	 
            	 var totalImgCount = scope.imageArr.length + totalFiles.length;
            	 var remaingImgCount = 6-scope.imageArr.length;
            	 
            	 if(totalImgCount > 6 && scope.imageArr.length > 0){
            		 scope.errorTxt = "You already uploaded "+scope.imageArr.length+" images...You can choose only "+remaingImgCount+" image(s).";
                     scope.isError = true;
            		 return ;
            	 }
            	 
            	 if(totalFiles.length > 6){
            		 scope.errorTxt = "Not allowed more than 6 images.";
                     scope.isError = true;
            		 return ;
            	 }
            	 
            	 $http({
            	        method: "POST",
            	        url: $rootScope.hostUrl+ API_VERSION +'/offices/upload/images/'+scope.office.id,
            	        headers: { "Content-Type": undefined },
            	        params: {},
            	        data: formdata
            	    }).then(function (response) {
            	        console.log(response);
            	        scope.imageLoader = true;
            	        scope.getImages();
            	    }, function (error) {
            	        console.log(error);
            	    });

             };

             scope.disableConfirmation = function () {
                $uibModal.open({
                    templateUrl: 'disableoffice.html',
                    controller: OfficeDisableCtrl
                });
            };

            var OfficeDisableCtrl = function ($scope, $uibModalInstance) {
                $scope.disableOffice = function () {
                    var formData = {
                        isEnabled : 'N',
                        officeType : 115
                    }

                    resourceFactory.officeResource.update({'officeId': routeParams.id},formData,function(data){
                        $uibModalInstance.close();
                        location.path('/offices');
                    });
                };
                $scope.cancelDisableOffice = function () {
                    $uibModalInstance.dismiss('cancelDisableOffice');
                };
            };

            scope.enableConfirmation = function () {
                $uibModal.open({
                    templateUrl: 'enableoffice.html',
                    controller: OfficeEnableCtrl
                });
            };

            var OfficeEnableCtrl = function ($scope, $uibModalInstance) {
                $scope.enableOffice = function () {
                    var formData = {
                        isEnabled : 'Y',
                        officeType : 115
                    }

                    resourceFactory.officeResource.update({'officeId': routeParams.id},formData,function(data){
                        $uibModalInstance.close();
                        location.path('/offices');
                    });
                };
                $scope.cancelEnableOffice = function () {
                    $uibModalInstance.dismiss('cancelEnableRole');
                };
            };



        }

    });
    mifosX.ng.application.controller('ViewOfficeController', ['$scope', '$routeParams', 
        '$route', '$location', 'ResourceFactory','PaginatorService', '$uibModal','Upload', '$rootScope', 'API_VERSION','$http', '$timeout',
        mifosX.controllers.ViewOfficeController]).run(function ($log) {
        $log.info("ViewOfficeController initialized");
    });
}(mifosX.controllers || {}));