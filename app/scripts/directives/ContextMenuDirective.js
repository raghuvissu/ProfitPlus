 (function(module) {
    mifosX.directives = _.extend(module, {
        ContextMenuDirective: function () {
           return {
                restrict: 'A',
                scope  : '@&', 
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          post: function postLink(scope, iElement, iAttrs, controller) {
        	 
        	  var ul1 = $('#context1');
        	  var ul2 = $('#context2');
        	  var ul3 = $('#context3'),
              last = null;
              ul1.css({ 'display' : 'none'});
              ul2.css({ 'display' : 'none'});
              ul3.css({ 'display' : 'none'});
              //console.log($('#'+iAttrs.context));
            $(iElement).mousedown(function(event) {
             if(event.button==2){
            	//console.log(iElement.context.id);
            	 //console.log("iAttrs.id::"+iAttrs.id);
            	
            	for(var i in scope.countryObject){
            		if(iAttrs.id == scope.countryObject[i].id){
            			ul1.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul2.css({ 'display' : 'none'});
                        ul3.css({ 'display' : 'none'});
                          last = event.timeStamp;
            			break;
            		}
          	     }
            	for(var j in scope.stateObject){
            		if(iAttrs.id == scope.stateObject[j].id){
            			ul2.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
                        
            			ul1.css({ 'display' : 'none'});
            			ul3.css({ 'display' : 'none'});
                          last = event.timeStamp;
            			break;
            		}
          	      }
            	for(var k in scope.cityObject){
            		if(iAttrs.id == scope.cityObject[k].id){
            			ul3.css({
                            position: "fixed",
                            display: "block",
                            left: event.clientX + 'px',
                            top:  event.clientY + 'px'
                          });
            			ul1.css({ 'display' : 'none'});
            			ul2.css({ 'display' : 'none'});
                        
                          last = event.timeStamp;
            			break;
            		}
          	      }
             }
            });
            
            $(document).click(function(event) {
            	document.oncontextmenu = function() {return false;};
            	var target = $(event.target);
            	if(!target.is(".popover") && !target.parents().is(".popover")) {
            	  if(event.button==2){
                  	return ;
                     /*if(last === event.timeStamp){
                	   console.log("if last");
                	    return; 
                      }*/
                   }
            	  ul1.css({
            		  'display' : 'none'
            	  });
            	  ul2.css({
                    'display' : 'none'
                  });
            	  ul3.css({
                    'display' : 'none'
                  });
            	}
            });
          }
        };
      }
    };
   }
});
}(mifosX.directives || {}));

mifosX.ng.application.directive("context", ['$parse', mifosX.directives.ContextMenuDirective]).run(function($log) {
    $log.info("ContextMenuDirective initialized");
});

