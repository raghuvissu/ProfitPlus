(function(module) {
    mifosX.controllers = _.extend(module, {
    	RichDashboard: function(scope, resourceFactory,location,dateFilter) {
            scope.client = [];
            scope.offices = [];
            scope.cOfficeName = 'Head Office';
            scope.dOfficeName = 'Head Office';
            scope.bOfficeName = 'Head Office';
            scope.sOfficeName = 'Head Office';
            scope.chartType = 'Days';
            scope.collectionPieData = [];
            scope.cumCustomersPieData = [];
            scope.disbursedPieData = [];
            scope.formData = {};
            scope.ClientDetailsTab="active";
            scope.dashModel = 'dashboard';
            scope.config = {};
            scope.clientStatusData = [];
            scope.totalClients = "";
            
            scope.switch1 = function() {
	        	location.path('/home');
			};
           
            scope.formatdate = function(){
                var bardate = new Date();
                scope.formattedDate = [];
                for(var i=0; i<12;i++)
                {
                    var temp_date = bardate.getDate();
                    bardate.setDate(temp_date - 1);
                    var curr_date = bardate.getDate();
                    var curr_month = bardate.getMonth() +1;
                    scope.formattedDate[i] = curr_date + "/" + curr_month;
                }
            };
            scope.formatdate();
            
            scope.getWeek = function() {
                scope.formattedWeek = [];
                var checkDate = new Date();
                checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
                var time = checkDate.getTime();
                checkDate.setMonth(0);
                checkDate.setDate(1);
                var week = Math.floor(Math.round((time - checkDate) / 86400000) / 7);
                for(var i=0;i<12;i++)
                {
                    if(week==0)
                    {
                        week = 52;
                    }
                    scope.formattedWeek[i] = week - i;

                }
            };scope.getWeek();

            scope.getMonth = function(){
                var today = new Date();
                var aMonth = today.getMonth();
                scope.formattedMonth= [];
                var month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
                for (var i=0; i<12; i++)
                {
                    scope.formattedMonth.push(month[aMonth]);
                    aMonth--;
                    if (aMonth < 0)
                    {
                        aMonth = 11;
                    }
                }
            }; 
            scope.getMonth();

            scope.getBarData = function(firstData,secondClientData,secondLoanData){
                scope.BarData = [
                        {
                            "key": "New Client Joining",
                            "values": [
	                                [ firstData[11] , secondClientData[11]] ,
	                                [ firstData[10] , secondClientData[10]] ,
	                                [ firstData[9] , secondClientData[9]] ,
	                                [ firstData[8] , secondClientData[8]] ,
	                                [ firstData[7] , secondClientData[7]] ,
	                                [ firstData[6] , secondClientData[6]] ,
	                                [ firstData[5] , secondClientData[5]] ,
	                                [ firstData[4] , secondClientData[4]] ,
	                                [ firstData[3] , secondClientData[3]] ,
	                                [ firstData[2] , secondClientData[2]] ,
	                                [ firstData[1] , secondClientData[1]] ,
	                                [ firstData[0] , secondClientData[0]]
                            ]
                        },
                        {
                            "key": "New Orders Created",
                            "values": [
                                [ firstData[11] , secondLoanData[11]] ,
                                [ firstData[10] , secondLoanData[10]] ,
                                [ firstData[9] , secondLoanData[9]] ,
                                [ firstData[8] , secondLoanData[8]] ,
                                [ firstData[7] , secondLoanData[7]] ,
                                [ firstData[6] , secondLoanData[6]] ,
                                [ firstData[5] , secondLoanData[5]] ,
                                [ firstData[4] , secondLoanData[4]] ,
                                [ firstData[3] , secondLoanData[3]] ,
                                [ firstData[2] , secondLoanData[2]] ,
                                [ firstData[1] , secondLoanData[1]] ,
                                [ firstData[0] , secondLoanData[0]]
                            ]
                        }
                    ];
                };

            scope.getFcount = function (dateData,retrievedDateData,responseData) {
                for(var i in dateData )
                {    scope.fcount[i] = 0;
                    for(var j in retrievedDateData)
                    {
                        if(dateData[i]==retrievedDateData[j])
                        {
                            scope.fcount[i]=responseData[j].count;

                        }
                    }
                }
            };
            scope.getLcount = function (dateData,retrievedDateData,responseData) {
                for(var i in dateData )
                {    scope.lcount[i] = 0;
                    for(var j in retrievedDateData)
                    {
                        if(dateData[i]==retrievedDateData[j])
                        {
                            scope.lcount[i]=responseData[j].lcount;

                        }
                    }
                }
            };
            
           scope.id = this.officeId || 1;	
        
           scope.getRunReports = function(){
	           resourceFactory.runReportsResource.get({reportSource: 'ClientCounts',genericResultSet:false} , function(data) {
	        	   scope.clientStatusData = [];
	        	   scope.totalClients = 0;
	        	   scope.reportData = angular.copy(data);
	        	   for(var i in scope.reportData){
	        		   if(scope.reportData[i].status == 'New')
	         			  scope.newClients = scope.reportData[i].ccounts;
	        		   	if(scope.reportData[i].status == 'Active')
	          			  scope.activeClients = scope.reportData[i].ccounts;
	          		    if(scope.reportData[i].status == 'Inactive')
	          			  scope.InActiveClients = scope.reportData[i].ccounts;
	          		    if(scope.reportData[i].status == 'Pending')
	          			  scope.PendingClients = scope.reportData[i].ccounts;
	        		   	scope.clientStatusData.push({key:scope.reportData[i].status,value:scope.reportData[i].ccounts});	
	        		   	scope.totalClients = parseInt(scope.totalClients)+parseInt(scope.reportData[i].ccounts);
	      	  		}
	        		scope.clientStatusData.push({key:'totalClients',value:scope.totalClients});
	
	           	});
           };
             
           scope.getRunReports();  
           
       //tab clientdetails
       scope.clientDetailsTabFun = function(){
    	   	 scope.ClientDetailsTab="active";
    	     scope.ClientTrendsTab="";
        	 scope.AountCollectedTab="";
        	 scope.StockItemDetailsTab="";
        	 scope.TicketsStatisticsTab="";
        	 scope.STBCountTab="";
        	 scope.id = this.officeIdCollection || 1;
        	 scope.getRunReports(); 
       };
       //tab1 active
       scope.clientTrendsTabFun = function(){
    	 scope.ClientDetailsTab="";
    	 scope.ClientTrendsTab="active";
      	 scope.AountCollectedTab="";
      	 scope.StockItemDetailsTab="";
      	 scope.TicketsStatisticsTab="";
      	 scope.STBCountTab="";
		 scope.id = this.officeId || 1;	
            resourceFactory.runReportsResource.get({reportSource: 'ClientTrendsByDay',R_officeId:scope.id, genericResultSet:false} , function(data) {
                scope.client = data;
                scope.days = [];
                scope.tempDate = [];
                scope.fcount = [];
                for(var i in scope.client)
                {
                    scope.days[i] = scope.client[i].days;
                }
                for(var i in scope.days)
                {
                	if(scope.days[i] && scope.days[i].length > 2){
                    var tday = scope.days[i][2];
                    var tmonth = scope.days[i][1];
                    var tyear = scope.days[i][0];
                    scope.tempDate[i] = tday + "/" + tmonth;
                	}
                }
                scope.getFcount(scope.formattedDate,scope.tempDate,scope.client);
                scope.id = this.officeId || 1;
                resourceFactory.runReportsResource.get({reportSource: 'OrderTrendsByDay',R_officeId:scope.id, genericResultSet:false} , function(data) {
                    scope.ldays = [];
                    scope.ltempDate = [];
                    scope.lcount = [];
                    for(var i in data)
                    {
                        scope.ldays[i] = data[i].days;
                    }
                    for(var i in scope.ldays)
                    {
                    	if(scope.ldays[i] && scope.ldays[i].length > 2){
                        var tday = scope.ldays[i][2];
                        var tmonth = scope.ldays[i][1];
                        var tyear = scope.ldays[i][0];
                        scope.ltempDate[i] = tday + "/" + tmonth;
                    	}
                    }
                    scope.getLcount(scope.formattedDate,scope.ltempDate,data);
                    scope.getBarData(scope.formattedDate,scope.fcount,scope.lcount);
                });
            });
            
       };
       resourceFactory.groupTemplateResource.get(function(data) {scope.offices = data.officeOptions;scope.officeId=data.officeId;});

       //tab2 active
 
       scope.aountCollectedTabFun = function(){
    	   scope.ClientDetailsTab="";
		   scope.ClientTrendsTab="";
		   scope.AountCollectedTab="active";
		   scope.StockItemDetailsTab="";
		   scope.TicketsStatisticsTab="";
		   scope.STBCountTab="";

		   /* Paymode Collection Chart */
		 scope.id = this.officeIdCollection || 1;
		 
		 var date = new Date(), y = date.getFullYear(), m = date.getMonth();
		 scope.startdate = new Date(y, m, 1);
		 scope.enddate = new Date(y, m + 1, 0);
		 var reqDate = dateFilter(scope.startdate,'yyyy-MM-dd');
         scope.formData.dateFormat = 'yyyy-mmmm-dd';
         scope.startdate = reqDate;
         var reqDate1 = dateFilter(scope.enddate,'yyyy-MM-dd');
		 scope.enddate = reqDate1;
		 
         resourceFactory.runReportsResource.get({reportSource: 'Paymode Collection Chart',R_endDate:scope.enddate,R_officeId:scope.id,R_startDate:scope.startdate, genericResultSet:false} , function(data) 
        	{	
        	 	scope.collectedData = [];
	   	   		scope.reportData = angular.copy(data);
	   	   		for(var i in scope.reportData){
	   	   			scope.collectedData.push({key:scope.reportData[i].Paymode,value:scope.reportData[i].Amount});	
	   	   		}
	   	   		//scope.collectedData.push({key:Paymode,y:scope.Amount});
	      });
       };
            
 		/* status wise orders */
		 scope.id = this.officeIdCum || 1;

		 //tab3 active 
		 scope.stockItemDetailsTabFun = function(){
		     scope.ClientDetailsTab="";
		     scope.ClientTrendsTab="";
			 scope.AountCollectedTab="";
			 scope.StockItemDetailsTab="active";
			 scope.TicketsStatisticsTab="";
			 scope.STBCountTab="";
	   
             resourceFactory.runReportsResource.get({reportSource: 'Stock_Item_Details',R_officeId:1, genericResultSet:false} , function(data) 
             	{
                 	scope.disbursedData = [];
                 	scope.reportData = [];
 	   	   			scope.reportData = angular.copy(data);
 	   	   			for(var i in scope.reportData){
 	   	   				scope.disbursedData.push({key:scope.reportData[i].disbursedAmount,value:scope.reportData[i].amountToBeDisburse});
 	   	   			}
 	   	   			//scope.disbursedData.push({key:scope.disbursedAmount,y:scope.amountToBeDisburse});
             });
		 };
		 
		 //tab6
		 scope.stbDataTabFun = function(){
		     scope.ClientDetailsTab="";
		     scope.ClientTrendsTab="";
			 scope.AountCollectedTab="";
			 scope.StockItemDetailsTab="";
			 scope.TicketsStatisticsTab="";
			 scope.STBCountTab="active";
	   
			 resourceFactory.runReportsResource.get({reportSource: 'STBCount',genericResultSet:false} , function(data) 
             	{
                 	scope.stbData = [];
                 	scope.reportData = [];
 	   	   			scope.reportData = angular.copy(data);
 	   	   			for(var i in scope.reportData){
 	   	   				scope.stbData.push({key:scope.reportData[i].TotalSTBs,value:scope.reportData[i].cnt});
 	   	   			}
             });
		 };
		 
  //tab4 active
   		scope.ticketsStatisticsTabFun = function(){
			 scope.ClientDetailsTab=""; 
		  	 scope.ClientTrendsTab="";
		  	 scope.AountCollectedTab="";
		  	 scope.StockItemDetailsTab="";
		  	 scope.TicketsStatisticsTab="active";
		  	 scope.STBCountTab="";
  	 
  	/* Added by sarath on 26-jun-2014 ----> */
	  	scope.client1 = [];
	    scope.offices1 = [];
	    scope.bOfficeName1 = 'Head Office';
	    scope.chartType1 = 'Days';
    //scope.formData = {};
    
	    scope.getWeek1 = function() {
	        scope.formattedWeek1 = [];
	        var checkDate = new Date();
	        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
	        var time = checkDate.getTime();
	        checkDate.setMonth(0);
	        checkDate.setDate(1);
	        var week = Math.floor(Math.round((time - checkDate) / 86400000) / 7);
	        for(var i=0;i<12;i++)
	        {
	            if(week==0)
	            {
	                week = 52;
	            }
	            scope.formattedWeek1[i] = week - i;
	
	        }
	    };scope.getWeek1();

	    scope.getMonth1 = function(){
	        var today = new Date();
	        var aMonth = today.getMonth();
	        scope.formattedMonth1= [];
	        var month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	        for (var i=0; i<12; i++)
	        {
	            scope.formattedMonth1.push(month[aMonth]);
	            aMonth--;
	            if (aMonth < 0)
	            {
	                aMonth = 11;
	            }
	        }
	    }; scope.getMonth1();

    scope.getBarData1 = function(firstData,secondClientData,secondLoanData){
    	scope.BarData1 =[{"key": "All Tickets","values":[]},{"key": "Tickets Open","values":[]}];
    		for(var i=firstData.length-1;i>=0;i--){
    			scope.BarData1[0].values.push([firstData[i],secondClientData[i]]);
    			scope.BarData1[1].values.push([firstData[i],secondLoanData[i]]);
    		};
   	};
   	
   	scope.getFcount1 = function (dateData,retrievedDateData,responseData) {
        for(var i in dateData )
        {    scope.fcount1[i] = 0;
            for(var j in retrievedDateData)
            {
                if(dateData[i]==retrievedDateData[j])
                {
                    scope.fcount1[i]=responseData[j].count;

                }
            }
        }
    };
    scope.getLcount1 = function (dateData,retrievedDateData,responseData) {
        for(var i in dateData )
        {    scope.lcount1[i] = 0;
            for(var j in retrievedDateData)
            {
                if(dateData[i]==retrievedDateData[j])
                {
                    scope.lcount1[i]=responseData[j].lcount;

                }
            }
        }
    };
            
    scope.getFcount1 = function (retrievedDateData,responseData) {
            for(var j in retrievedDateData)
            {
            	scope.fcount1[j] = 0;
            	scope.fcount1[j]=responseData[j].tkt_cnt;
            }
    };
    scope.getLcount1 = function (retrievedDateData,responseData) {
            for(var j in retrievedDateData)
            {
            	scope.lcount1[j] = 0;
            	scope.lcount1[j]=responseData[j].tkt_cnt;
            }
    };

 scope.id1 = this.officeId1 || 1;	
    resourceFactory.runReportsResource.get({reportSource: 'TicketsbyDays',R_officeId:scope.id1, genericResultSet:false} , function(data) {
        scope.client1 = data;
        scope.days1 = [];
        scope.tempDate1 = [];
        scope.fcount1 = [];
        for(var i in scope.client1)
        {
            scope.days1[i] = scope.client1[i].days;
        }
        for(var i in scope.days1)
        {
        	if(scope.days1[i] && scope.days1[i].length > 2){
            var tday = scope.days1[i][2];
            var tmonth = scope.days1[i][1];
           // var tyear = scope.days1[i][0];
            scope.tempDate1[i] = tday + "/" + tmonth;
        	}
        }
        scope.getFcount1(scope.tempDate1,scope.client1);
 scope.id1 = this.officeId1 || 1;
        resourceFactory.runReportsResource.get({reportSource: 'TicketsbyDays',R_officeId:scope.id1, genericResultSet:false} , function(data) {
            scope.ldays1 = [];
            scope.ltempDate1 = [];
            scope.lcount1 = [];
            for(var i in data)
            {
                scope.ldays1[i] = data[i].days;
            }
            for(var i in scope.ldays1)
            {
            	if(scope.ldays1[i] && scope.ldays1[i].length > 2){
                var tday = scope.ldays1[i][2];
                var tmonth = scope.ldays1[i][1];
                scope.ltempDate1[i] = tday + "/" + tmonth;
            	}
            }
            scope.getLcount1(scope.ltempDate1,data);
            scope.getBarData1(scope.ltempDate1,scope.fcount1,scope.lcount1);
        });
    });

resourceFactory.groupTemplateResource.get(function(data) {scope.offices1 = data.officeOptions;scope.officeId1=data.officeId;});

/*Daily Data */
scope.getDailyData1 = function(){
scope.chartType1 = 'Days';
scope.id1 = this.officeId1 || 1;
resourceFactory.runReportsResource.get({reportSource: 'TicketsbyDays',R_officeId:scope.id1, genericResultSet:false} , function(data) {
	scope.client1 = data;
    scope.days1 = [];
    scope.tempDate1 = [];
    scope.fcount1 = [];
    for(var i in scope.offices1){
        if(scope.offices1[i].id == scope.id1){
            scope.bOfficeName1 = scope.offices1[i].name;
        }
    }
    for(var i in scope.client1)
    {
        scope.days1[i] = scope.client1[i].days;
    }
    for(var i in scope.days1)
    {
    	if(scope.days1[i] && scope.days1[i].length > 2){
        var tday = scope.days1[i][2];
        var tmonth = scope.days1[i][1];
        scope.tempDate1[i] = tday + "/" + tmonth;
    	}
    }
    scope.getFcount1(scope.tempDate1,scope.client1);
    scope.id1 = this.officeId1 || 1;
    resourceFactory.runReportsResource.get({reportSource: 'TicketsbyDays',R_officeId:scope.id1, genericResultSet:false} , function(data) {
        scope.ldays1 = [];
        scope.ltempDate1 = [];
        scope.lcount1 = [];
        for(var i in data)
        {
            scope.ldays1[i] = data[i].days;
        }
        for(var i in scope.ldays1)
        {
        	if(scope.ldays1[i] && scope.ldays1[i].length > 2){
            var tday = scope.ldays1[i][2];
            var tmonth = scope.ldays1[i][1];
            scope.ltempDate1[i] = tday + "/" + tmonth;
        	}
        }
        scope.getLcount1(scope.ltempDate1,data);
        scope.getBarData1(scope.ltempDate1,scope.fcount1,scope.lcount1);
    }); 
});
};

scope.getWeeklyData1 = function(){
scope.chartType1 = 'Weeks';
scope.id1 = this.officeId1 || 1;
resourceFactory.runReportsResource.get({reportSource: 'TicketsByWeek',R_officeId:scope.id1, genericResultSet:false} , function(data) {
    scope.client1 = data;
    scope.weeks1 = [];
    scope.fcount1 = [];

    for(var i in scope.offices1){
        if(scope.offices1[i].id == scope.id1){
            scope.bOfficeName1 = scope.offices1[i].name;
        }
    }
    for(var i in scope.client1)
    {
        scope.weeks1[i] = scope.client1[i].Weeks;
    }

    scope.getFcount1(scope.formattedWeek1,scope.weeks1,scope.client1);
    scope.id1 = this.officeId1 || 1;
    resourceFactory.runReportsResource.get({reportSource: 'TicketsByWeek',R_officeId:scope.id1, genericResultSet:false} , function(data) {
        scope.lweeks1 = [];
        scope.lcount1 = [];
        for(var i in data)
        {
            scope.lweeks1[i] = data[i].Weeks;
        }
        scope.getLcount1(scope.formattedWeek1,scope.lweeks1,data);
        scope.getBarData1(scope.formattedWeek1,scope.fcount1,scope.lcount1);
    });
});
};

scope.getMonthlyData1 = function() {
scope.chartType1 = 'Months';
scope.id1 = this.officeId1 || 1;
scope.formattedSMonth1 = [];
var monthArray = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var today = new Date();
var aMonth = today.getMonth();
for (var i=0; i<12; i++)
{
    scope.formattedSMonth1.push(monthArray[aMonth]);
    aMonth--;
    if (aMonth < 0)
    {
        aMonth = 11;
    }
}
resourceFactory.runReportsResource.get({reportSource: 'TicketsByMonth',R_officeId:scope.id1, genericResultSet:false} , function(data) {
    scope.client1 = data;
    scope.months1 = [];
    scope.fcount1 = [];

    for(var i in scope.offices1){
        if(scope.offices1[i].id == scope.id1){
            scope.bOfficeName1 = scope.offices1[i].name;
        }
    }
    for(var i in scope.client1)
    {
        scope.months1[i] = scope.client1[i].Months;
    }
    scope.getFcount1(scope.formattedMonth1,scope.months1,scope.client1);
    scope.id1 = this.officeId1 || 1;
    resourceFactory.runReportsResource.get({reportSource: 'TicketsByMonth',R_officeId:scope.id1, genericResultSet:false} , function(data) {
        scope.lmonths1 = [];
        scope.lcount1 = [];

        for(var i in data)
        {
            scope.lmonths1[i] = data[i].Months;
        }
        scope.getLcount1(scope.formattedMonth1,scope.lmonths1,data);
        scope.getBarData1(scope.formattedSMonth1,scope.fcount1,scope.lcount1);
    });
});
};

var colorArray = ['#0f82f5', '#008000', '#808080', '#000000', '#FFE6E6'];
scope.colorFunction1= function() {
return function(d, i) {
    return colorArray[i];
};
};
   };
         
         /*Daily Data */
            scope.getDailyData = function(){
                scope.chartType = 'Days';
                scope.id = this.officeId || 1;
                resourceFactory.runReportsResource.get({reportSource: 'ClientTrendsByDay',R_officeId:scope.id, genericResultSet:false} , function(data) {
		      scope.client = data;
                    scope.days = [];
                    scope.tempDate = [];
                    scope.fcount = [];
                    for(var i in scope.offices){
                        if(scope.offices[i].id == scope.id){
                            scope.bOfficeName = scope.offices[i].name;
                        }
                    }
                    for(var i in scope.client)
                    {
                        scope.days[i] = scope.client[i].days;
                    }
                    for(var i in scope.days)
                    {	
                    	if (scope.days[i] && scope.days[i].length > 2){
                        var tday = scope.days[i][2];
                        var tmonth = scope.days[i][1];
                        var tyear = scope.days[i][0];
                        scope.tempDate[i] = tday + "/" + tmonth;
                    	}
                    }
                    scope.getFcount(scope.formattedDate,scope.tempDate,scope.client);
			 scope.id = this.officeId || 1;
                    resourceFactory.runReportsResource.get({reportSource: 'OrderTrendsByDay',R_officeId:scope.id, genericResultSet:false} , function(data) {
                        scope.ldays = [];
                        scope.ltempDate = [];
                        scope.lcount = [];
                        for(var i in data)
                        {
                            scope.ldays[i] = data[i].days;
                        }
                        for(var i in scope.ldays)
                        {
                        	if(scope.ldays[i] && scope.ldays[i].length > 2){
                            var tday = scope.ldays[i][2];
                            var tmonth = scope.ldays[i][1];
                            var tyear = scope.ldays[i][0];
                            scope.ltempDate[i] = tday + "/" + tmonth;
                        	}
                        }
                        scope.getLcount(scope.formattedDate,scope.ltempDate,data);
                        scope.getBarData(scope.formattedDate,scope.fcount,scope.lcount);
                    }); 
                });
            };

            scope.getWeeklyData = function(){
                scope.chartType = 'Weeks';
                scope.id = this.officeId || 1;
                resourceFactory.runReportsResource.get({reportSource: 'ClientTrendsByWeek',R_officeId:scope.id, genericResultSet:false} , function(data) {
                    scope.client = data;
                    scope.weeks = [];
                    scope.fcount = [];

                    for(var i in scope.offices){
                        if(scope.offices[i].id == scope.id){
                            scope.bOfficeName = scope.offices[i].name;
                        }
                    }
                    for(var i in scope.client)
                    {
                        scope.weeks[i] = scope.client[i].Weeks;
                    }

                    scope.getFcount(scope.formattedWeek,scope.weeks,scope.client);
			 scope.id = this.officeId || 1;
                    resourceFactory.runReportsResource.get({reportSource: 'OrderTrendsByWeek',R_officeId:scope.id, genericResultSet:false} , function(data) {
                        scope.lweeks = [];
                        scope.lcount = [];
                        for(var i in data)
                        {
                            scope.lweeks[i] = data[i].Weeks;
                        }
                        scope.getLcount(scope.formattedWeek,scope.lweeks,data);
                        scope.getBarData(scope.formattedWeek,scope.fcount,scope.lcount);
                    });
                });
            };

            scope.getMonthlyData = function() {
                scope.chartType = 'Months';
                scope.id = this.officeId || 1;
                scope.formattedSMonth = [];
                var monthArray = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
                var today = new Date();
                var aMonth = today.getMonth();
                for (var i=0; i<12; i++)
                {
                    scope.formattedSMonth.push(monthArray[aMonth]);
                    aMonth--;
                    if (aMonth < 0)
                    {
                        aMonth = 11;
                    }
                }
                resourceFactory.runReportsResource.get({reportSource: 'ClientTrendsByMonth',R_officeId:scope.id, genericResultSet:false} , function(data) {
                    scope.client = data;
                    scope.months = [];
                    scope.fcount = [];

                    for(var i in scope.offices){
                        if(scope.offices[i].id == scope.id){
                            scope.bOfficeName = scope.offices[i].name;
                        }
                    }
                    for(var i in scope.client)
                    {
                        scope.months[i] = scope.client[i].Months;
                    }
                    scope.getFcount(scope.formattedMonth,scope.months,scope.client);
			 scope.id = this.officeId || 1;
                    resourceFactory.runReportsResource.get({reportSource: 'OrderTrendsByMonth',R_officeId:scope.id, genericResultSet:false} , function(data) {
                        scope.lmonths = [];
                        scope.lcount = [];

                        for(var i in data)
                        {
                            scope.lmonths[i] = data[i].Months;
                        }
                        scope.getLcount(scope.formattedMonth,scope.lmonths,data);
                        scope.getBarData(scope.formattedSMonth,scope.fcount,scope.lcount);
                    });
                });
            };

/* Paymode Collection Chart*/

            scope.getCollectionOffice = function (){	
            	var id = this.officeId || 1;
                for(var i in scope.offices){if(scope.offices[i].id==id){scope.cOfficeName = scope.offices[i].name;}}
                scope.id = this.officeId || 1;
                var count= 0;
                resourceFactory.runReportsResource.get({reportSource: 'PaymodeCollection Chart',R_officeId:scope.id, genericResultSet:false},function(data) 
                	{
                	scope.showCollectionerror = false;
                	scope.collectionPieData = data;
                	for(var i in data){
                		if(data[i].Amount==0){
                			count+=1;
                		}
                		
                	}
                	if(count==data.length)
                	scope.showCollectionerror = true;
                	scope.collectedData=[];
                	for(var i in data){	console.log(data[i].PayMode);
                						scope.collectedData.push({key:data[i].PayMode,y:data[i].Amount});
                						console.log(scope.collectedData);
                					  }
                	});
            };
/* status wise orders */
            scope.getCumOffice = function () 
            {   var id = this.officeId || 1;
                for(var i in scope.offices)	{ if(scope.offices[i].id== id){scope.dOfficeName = scope.offices[i].name;} }
                scope.id = this.officeId || 1;
                var count = 0;
                scope.showCumCustomerDataerror = false;
                resourceFactory.runReportsResource.get({reportSource: 'CumulativeCustomersChart',R_officeId:scope.id, genericResultSet:false} , function(data) 
            		{
            		scope.cumCustomersPieData = data;
            		for(var i in data){
                		if(data[i].clients==0){
                			count+=1;
                		}
                		
                	}
                	if(count==data.length)
            		scope.showCumCustomerDataerror = true;
            		scope.cumCustomerData = [];
            		for(var i in data)	{console.log(data[i].status);
            							scope.cumCustomerData.push({key:data[i].status,y:data[i].clients});
            							console.log(scope.cumCustomerData);
            					  		}
            		});
            };

/* Stock Item Details */
            scope.getStock = function () 
            {	var id = this.officeId || 1;
                for(var i in scope.offices){if(scope.offices[i].id== id){scope.sOfficeName = scope.offices[i].name;}}
                scope.id = this.officeId || 1;
                var count=0;
                scope.showDisbursementerror=false;
                resourceFactory.runReportsResource.get({reportSource: 'Stock_Item_Details',R_officeId:scope.id, genericResultSet:false} , function(data) 
                	{scope.disbursedPieData = data;
                	for(var i in data){
                		if(data[i].allocated==0){
                			count+=1;
                		}
                		
                	}
                	if(count==data.length)
                		scope.showDisbursementerror=true;
                    scope.disbursedData = [];
            		for(var i in data)	{
            							console.log(data[i].Item);
										scope.disbursedData.push({key:data[i].Item,y:data[i].allocated});
										console.log(scope.disbursedData);}
                	});
            };
            
            scope.xFunction = function(){
                return function(d) {
                    return d.key;
                };
            };
            scope.yFunction = function(){
                return function(d) {
                    return d.value;
                };
            };
            var colorArray = ['#0f82f5', '#39b54a', '#000000', '#FFE6E6'];
            var colorArrayPie =['#39b54a','#ff4500','#0f82f5'];
            var colorArrayPie1 =['#ffd145','#39b54a','#959595','#f45656'];
            var colorArrayPie2 =['#959595','#ffd145','#39b54a','#f45656'];
            scope.colorFunction = function() {
                return function(d, i) {
                    return colorArray[i];
                };
            };
            scope.colorFunctionPie = function() {
                return function(d, i) {
                    return colorArrayPie[i];
                };
            };
            scope.colorFunctionPie1 = function() {
                return function(d, i) {
                    return colorArrayPie1[i];
                };
            };
            scope.colorFunctionPie2 = function() {
                return function(d, i) {
                    return colorArrayPie2[i];
                };
            };

        }
    });
    mifosX.ng.application.controller('RichDashboard', ['$scope', 'ResourceFactory','$location','dateFilter', mifosX.controllers.RichDashboard]).run(function($log) {
        $log.info("RichDashboard initialized");
    });
}(mifosX.controllers || {}));

