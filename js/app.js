(function (ng) {
    'use strict';

    var controls = ng.module('controls', []);

    controls.directive("tabgroup", function(){
        return {
            restrict: 'E',
            transclude: true,
            template: '<div data-ng-repeat="tab in tabs" data-ng-click="select(tab)" class="btn btn-default" data-ng-class="{active: tab.selected}">{{tab.title}}</div>'
                + '<div data-ng-transclude=""> </div>',
            controller: function($scope){

                $scope.tabs = [];
                this.addTab = function(tab){
                    if($scope.tabs.length === 0){
                        tab.selected = true;
                    }
                    $scope.tabs.push(tab);
                }

                $scope.select = function(tab){
                    ng.forEach($scope.tabs, function(eachTab){
                        eachTab.selected = ng.equals(tab, eachTab)
                    });
                }
            }
        }
    });

    controls.directive("tab", function(){
        return {
            restrict: 'E',
            scope: {
                title: '@'
            },
            transclude: true,
        //    template:  '<div class="btn btn-default" data-ng-class="{active: selected}">{{title}}</div> <div data-ng-transclude="true"></div>'
            template:  '<div data-ng-transclude=""></div>',
            require: "^tabgroup",
            link: function(scope, element, attrs, ctrl){
                ctrl.addTab(scope);
            }
        }
    });



}(angular))