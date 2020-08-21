(function(module) {
  mifosX.controllers = _.extend(module, {
    SchedulerJobsController: function(scope, resourceFactory, route,location,$uibModal,PermissionService,$rootScope,dateFilter) {
      var jobIdArray = [];
      var jobNameArray = [];
      scope.PermissionService = PermissionService;
      scope.formData={};
      resourceFactory.jobsResource.get(function(data) {
          scope.jobs = data;
      });
     
      scope.routeTo = function(jobid){
          location.path('/viewschedulerjob/'+ jobid);
        };

      resourceFactory.schedulerResource.get(function(data) {
          scope.schedulerstatus = data.active == true ? 'Active' :'Standby';
      });

      scope.selectAll = function(selectAll) {
        scope.active = selectAll;
        if(selectAll == true) {
          for(var i in scope.jobs) {
            jobIdArray.push(scope.jobs[i].jobId);
            
          }
        } else {
          for(var i in scope.jobs) {
            jobIdArray = _.without(jobIdArray,scope.jobs[i].jobId);
          }
        }
      }

      scope.selectAll =function(job){
    	
    	  this.formData.displayName=job.name;
    	  this.formData.cronExpression=job.cronExpression;
    	  this.formData.active=job.active;

          resourceFactory.jobsResource.update({jobId:job.jobId}, this.formData, function(data){
            location.path('/jobs/');
          });
        
    	  
      };
      scope.runJobSelected = function(job, active) {
        if(active == true) {
        	if(job.displayName == "Messanger"){
        		jobNameArray.push(job.jobId);
        	
        	}
          jobIdArray.push(job.jobId);
        } else {
          jobIdArray = _.without(jobIdArray,job.jobId);
        }
      };

      scope.runSelectedJobs = function() {
    	  scope.sentForExecution = [];
    	  var jobidd;
          for(var i in jobIdArray) {
            for(var j in scope.jobs) {
              if(scope.jobs[j].jobId == jobIdArray[i]) {
            	 
                scope.sentForExecution.push(scope.jobs[j].displayName);
            	 
              }
            }
          }
          for(var i in jobIdArray) {
        	           if(jobNameArray[i] == jobIdArray[i]){
        	            		  jobidd=scope.jobs[j].jobId;
        	            		  $uibModal.open(
        	                			  {
        	                          templateUrl: 'approve1.html',
        	                          controller: Approve,
        	                          resolve:{
        	                        	  name:function(){
        	                        		return jobIdArray[i];
        	                        	  }
        	                          }
        	                      });
        	            		 
        	           }else{
        	    	resourceFactory.jobsResource.save({jobId: jobIdArray[i], command : 'executeJob'}, {}, function(data){
            });
        	           }
          }
      }
      
      scope.editJobParametrsPopUp = function (JobParametrid) {
          $uibModal.open({
              templateUrl: 'editjobparameters.html',
              controller: EditJobParametersCtrl,
              resolve:{
            	  JobParametrid:function(){
            		return JobParametrid;
            	  }
              }
          });
      };
      
      var EditJobParametersCtrl = function($scope,$uibModalInstance,JobParametrid){
    	  	$scope.reportDatas = [];
			$scope.billingMessageDatas = [];
			$scope.jobparameters = [];
			$scope.provisionSysData = [];
			$scope.editJobFormData = [];
			$scope.date = {};
			resourceFactory.jobsparameters.get({jobId : JobParametrid},function(data) {
				$scope.reportDatas = data.queryData;
				$scope.billingMessageDatas = data.billingMessageDatas;
				$scope.jobparameters = data.jobparameters;
				$scope.provisionSysData = data.provisionSysData;
				$scope.editJobFormData = data;
				$scope.templateDatas = data.templateData;
				//processDate
				if ($scope.jobparameters.processDate) {
					var actDate = dateFilter($scope.jobparameters.processDate,'dd MMMM yyyy');
					$scope.date.processDate = new Date(actDate);
				}
				//dueDate
				if ($scope.jobparameters.dueDate) {
					var dueDate = dateFilter($scope.jobparameters.dueDate,'dd MMMM yyyy');
					$scope.date.dueDate = new Date(dueDate);
				}
				//exipiryDate
				if ($scope.jobparameters.exipiryDate) {
					var exipiryDate = dateFilter($scope.jobparameters.exipiryDate,'dd MMMM yyyy');
					$scope.date.exipiryDate = new Date(exipiryDate);
				}

				if (data.jobparameters.isDynamic == "Y") {
					$scope.editJobFormData.isDynamic = true;
				}

				if (data.jobparameters.isAutoRenewal == "Y") {
					$scope.editJobFormData.isAutoRenewal = true;
				}

				if (data.jobparameters.updateStatus == "Y") {
					$scope.editJobFormData.isUpdateStatus = true;
				}

				if (data.jobparameters.createTicket == "Y") {
					$scope.editJobFormData.isCreateTicket = true;
				}
				if (data.jobparameters.addonExipiry == "Y") {
					$scope.editJobFormData.addonExipiry = true;
				} 
				else {
					$scope.editJobFormData.isCreateTicket = false;
				}

			});						

			/*$scope.cancel = function() {
				location.path('/jobs');
			};	*/			

			$scope.editjobaccept = function() {

				this.editJobFormData.jobName = this.editJobFormData.name;
				this.editJobFormData.dateFormat = 'dd MMMM yyyy';
				this.editJobFormData.locale = scope.optlang.code;
				this.editJobFormData.reportName = this.editJobFormData.jobparameters.batchName;
				this.editJobFormData.messageTemplate = this.editJobFormData.jobparameters.messageTemplate;
				this.editJobFormData.emailId = this.editJobFormData.jobparameters.emailId;
				this.editJobFormData.URL = this.editJobFormData.jobparameters.url;
				this.editJobFormData.system = this.editJobFormData.jobparameters.provSystem;
				this.editJobFormData.Username = this.editJobFormData.jobparameters.username;
				this.editJobFormData.Password = this.editJobFormData.jobparameters.password;				

				if (this.editJobFormData.name == "Invoicing") {this.editJobFormData.processDate = dateFilter($scope.date.processDate,'dd MMMM yyyy');}
				if (this.editJobFormData.name == "Prepare Statements") {this.editJobFormData.dueDate = dateFilter($scope.date.dueDate, 'dd MMMM yyyy');}
				if (this.editJobFormData.name == "Auto Exipiry") {this.editJobFormData.exipiryDate = dateFilter($scope.date.exipiryDate,'dd MMMM yyyy');}
				if (this.editJobFormData.name == "Make PDFs") {this.editJobFormData.processDate = dateFilter($scope.date.processDate,'dd MMMM yyyy');}
				if (this.editJobFormData.name == "Export Data") {this.editJobFormData.processDate = dateFilter($scope.date.processDate,'dd MMMM yyyy');}
				if (this.editJobFormData.name == "Reseller Commission") {this.editJobFormData.processDate = dateFilter($scope.date.processDate,'dd MMMM yyyy');}

				delete this.editJobFormData.jobId;
				delete this.editJobFormData.displayName;
				delete this.editJobFormData.name;
				delete this.editJobFormData.cronExpression;
				delete this.editJobFormData.cronDescription;
				delete this.editJobFormData.active;
				delete this.editJobFormData.currentlyRunning;
				delete this.editJobFormData.lastRunHistory;
				delete this.editJobFormData.queryData;
				delete this.editJobFormData.jobparameters;
				delete this.editJobFormData.nextRunTime;
				delete this.editJobFormData.billingMessageDatas;
				delete this.editJobFormData.historyId;
				delete this.editJobFormData.initializingError;
				delete this.editJobFormData.provisionSysData;	
				delete this.editJobFormData.templateData;

				resourceFactory.jobsparameters.update({jobId : JobParametrid}, this.editJobFormData, function(data) {
					location.path('/viewschedulerjob/'+ data.resourceId);
				});
				$uibModalInstance.dismiss('cancel');
			};
			$scope.reject = function(){
				$uibModalInstance.dismiss('cancel');
			};
      };

      scope.suspendJobs = function() {
        resourceFactory.schedulerResource.save({command : 'stop'}, {}, function(data) {
          route.reload();
        });
      }

      scope.activeJobs = function() {
        resourceFactory.schedulerResource.save({command : 'start'}, {}, function(data) {
          route.reload();
        });
      }

      scope.refresh = function() {
        route.reload();
      }
      
      var Approve = function($scope,$uibModalInstance,name){
    	
    	var a=name;
    
    	
    	$scope.jobParams=[];
    	$scope.reportDatas=[];
    	$scope.billingMessageDatas=[];
    	 
    	  resourceFactory.jobsparameters.get({jobId : a}, function(data) {
    		  $scope.reportDatas = data.queryData;
    		  $scope.billingMessageDatas=data.billingMessageDatas;
    	       
    	      });
			$scope.accept = function(date){
				$scope.flagapprove=true;
			        	this.formData.jobName="Messanger";
			        	this.formData.dateFormat="dd MMMM yyyy";
			        	this.formData.locale=scope.optlang.code;
			            resourceFactory.jobsparameters.update({jobId:a}, this.formData, function(data){
			            	$uibModalInstance.dismiss('delete');
			              },function(errData){
			            	  $scope.flagapprove=false;
			        	  $scope.error = errData.data.errors[0].userMessageGlobalisationCode;
			        	  
			        	  
			          });
			            resourceFactory.jobsResource.save({jobId: a, command : 'executeJob'}, {}, function(data){
	                      });    
			};
			$scope.reject = function(){
				$uibModalInstance.dismiss('cancel');
			};
		};
    }
  });
  mifosX.ng.application.controller('SchedulerJobsController', ['$scope', 'ResourceFactory', '$route', '$location','$uibModal','PermissionService','$rootScope',
                                                               'dateFilter',mifosX.controllers.SchedulerJobsController]).run(function($log) {
    $log.info("SchedulerJobsController initialized");
  });
}(mifosX.controllers || {}));
