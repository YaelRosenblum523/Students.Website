'use strict';

angular.module('myApp.students', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/students', {
      templateUrl: 'students/students.html',
      controller: 'StudentsCtrl'
    });
  }])

  .controller('StudentsCtrl', ['$scope', 'studentService', function ($scope, studentService) {
    $scope.selectedClass = { value: "0" };
    $scope.selectedYear = { value: "0" };
    $scope.selectedStudent = {};
    $scope.selectedView = 'grid';
    $scope.htmlVariable = "";
    $scope.disabled = false;

    setTimeout(function () {
      var els = document.getElementsByClassName("btn-default");
      [].forEach.call(els, function (el) { el.disabled = false; });
      var el= document.getElementsByClassName("fa-code");
      if(el.length>0)
      {
        el[0].click();
        el[0].click();
      }
    }, 2000);


    $scope.register = function (child) {
      $scope.gridRef = child;
    };

    $scope.onViewSelected = function (view) {
      $scope.selectedView = view;
      if (view == 'grid') {
        $scope.$broadcast('studentsUpdate', $scope.students);
      }
    }

    var initYears = function () {
      $scope.years = studentService.getYearsByClass($scope.selectedClass.value);
    }

    var initClasses = function () {
      $scope.classes = studentService.getClassesByYear($scope.selectedYear.value);
    }

    var initStudents = function () {
      if ($scope.selectedClass.value && $scope.selectedClass.value != "0") {
        $scope.students = studentService.getStudents($scope.selectedYear.value,
          $scope.selectedClass.value);
      }
      else {
        $scope.students = [];
      }
      //$scope.gridRef.setRowData();
      $scope.$broadcast('studentsUpdate', $scope.students);

      if ($scope.selectedStudent && !$scope.students.find(s => s.fname == $scope.fname)) {
        $scope.selectedStudent = {};
      }
    }

    initYears();
    initClasses();

    $scope.onGradeUpdated = function (data) {
      studentService.updateGrade(data, $scope.selectedClass.value);
    }

    $scope.onGradeUpdatedDetails = function (data) {
      studentService.updateGrade(data, $scope.selectedClass.value);
      $scope.students = studentService.getStudents($scope.selectedYear.value,
        $scope.selectedClass.value);
      $scope.$broadcast('studentsUpdate', $scope.students);
    }

    $scope.onStudentSelected = function (student) {
      $scope.selectedStudent = student;
      $scope.$broadcast('studentSelected');
    }

    $scope.onYearChanged = function () {
      initClasses();
      if (!$scope.classes.some(c => c == $scope.selectedClass.value)) {
        $scope.selectedClass.value = "0";
      }
      initStudents();
    }

    $scope.onClassChanged = function () {
      initYears();
      if (!$scope.years.some(y => y == $scope.selectedYear.value)) {
        $scope.selectedYear.value = "0";
      }
      initStudents();
    }
  }]);