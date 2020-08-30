angular.module('myApp')
    .component('combo', {
        templateUrl: 'core/combo/combo.html',
        controller: ['$scope',
            function ComboController($scope) {
                var ctrl=this;
                $scope.onChange = function (item) {
                    ctrl.change();
                }
            }],
        bindings: {
            selected: '=',
            items: '<',
            placeHolder: '@',
            change: '&'
        }
    });