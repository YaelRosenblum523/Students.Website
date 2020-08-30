angular.module('myApp')
    .component('studentDetails', {
        templateUrl: 'core/student-details/student-details.html',
        controller: ['$scope',
            function StudentDetailsController($scope) {
                var ctrl = this;

                $scope.$on('studentSelected', function (evt, data) {
                    $scope.$apply();
                });

            }],
        bindings: {
            student: '=',
            classType: '<',
            updateGrade: '&'
        }
    });