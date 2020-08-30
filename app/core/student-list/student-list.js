angular.module('myApp')
    .component('studentList', {
        templateUrl: 'core/student-list/student-list.html',
        controller: ['$scope',
            function StudentListController($scope) {
                var ctrl = this;               

            }],
        bindings: {
            students: '=',
            selectedStudent: '=',
            updateGrade: '&',
            selectStudent: '&',
            registerParent: '=',
            classType: '<'
        }
    });