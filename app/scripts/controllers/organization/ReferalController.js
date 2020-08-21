(function (module) {
    mifosX.controllers = _.extend(module, {
        ReferalController: function (scope, resourceFactory, location,$uibModal, paginatorService) {
        	
            scope.referals = [];
            scope.isTreeView = false;
            var idToNodeMap = {};

            scope.routeTo = function(clientId){
              location.path('/viewclient/id/'+ clientId);
            };

            if (!scope.searchCriteria.referals) {
                scope.searchCriteria.referals = null;
                scope.saveSC();
            }
            scope.filterText = scope.searchCriteria.referals || '';

            scope.onFilter = function () {
                scope.searchCriteria.referals = scope.filterText;
                scope.saveSC();
            };

            scope.deepCopy = function (obj) {
                if (Object.prototype.toString.call(obj) === '[object Array]') {
                    var out = [], i = 0, len = obj.length;
                    for (; i < len; i++) {
                        out[i] = arguments.callee(obj[i]);
                    }
                    return out;
                }
                if (typeof obj === 'object') {
                    var out = {}, i;
                    for (i in obj) {
                        out[i] = arguments.callee(obj[i]);
                    }
                    return out;
                }
                return obj;
            }

            resourceFactory.referalResource.getAllReferals(function (data) {
                scope.referals = scope.deepCopy(data);
                for (var i in data) {
                    data[i].children = [];
                    idToNodeMap[data[i].id] = data[i];
                }
                function sortByParentId(a, b) {
                    return a.parentId - b.parentId;
                }

                data.sort(sortByParentId);

                var root = [];
                for (var i = 0; i < data.length; i++) {
                    var currentObj = data[i];
                    if (currentObj.children) {
                        currentObj.collapsed = "true";
                    }
                    if (typeof currentObj.parentId === "undefined") {
                        root.push(currentObj);
                    } else {
                        parentNode = idToNodeMap[currentObj.parentId];
                        parentNode.children.push(currentObj);
                    }
                }
                scope.treedata = root;
                console.log(scope.treedata)
            });

            var ViewLargerPicCtrl = function ($scope, $uibModalInstance, image) {
                $scope.largeImage = image;
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };

            scope.viewImg = function(img){
                $uibModal.open({
                        templateUrl: 'photo-dialog.html',
                        controller:  ViewLargerPicCtrl,
                        resolve: {
                            image: function () {
                              return img;
                            }
                          }
                    });
            }
            
        }
    });
    mifosX.ng.application.controller('ReferalController', ['$scope', 
                                                           'ResourceFactory', 
                                                           '$location',
                                                           '$uibModal',
                                                           'PaginatorService', mifosX.controllers.ReferalController]).run(function ($log) {
        $log.info("ReferalController initialized");
    });
}(mifosX.controllers || {}));