'use strict';

angular.module('myApp').service('studentService', [
    function () {
        this.data = {
            "classStudents": [
                {
                    "students":
                        [{ "fname": "Jones", "lname": "Smith", "grade": 84.2, "year": 1940 },
                        { "fname": "Barbara", "lname": "Farly", "grade": 55.0, "year": 1940 },
                        { "fname": "Shirly", "lname": "Tema", "grade": 30.0, "year": 2012 },
                        { "fname": "Santa", "lname": "Rummi", "grade": 75.0, "year": 2012 }],
                    "classType": "Biology"
                }, {
                    "students": [
                        { "fname": "Sara", "lname": "Karlson", "grade": 99.2, "year": 1960 },
                        { "fname": "Avi", "lname": "Kaster", "grade": 70.0, "year": 1960 },
                        { "fname": "Sami", "lname": "Perez", "grade": 90.0, "year": 2009 }],
                    "classType": "Chemistry"
                }, {
                    "students": [
                        { "fname": "Tevon", "lname": "Barens", "grade": 43.0, "year": 1980 },
                        { "fname": "Josef", "lname": "Cohen", "grade": 60.0, "year": 1980 },
                        { "fname": "Nati", "lname": "Green", "grade": 99.0, "year": 2001 },
                        { "fname": "Shakil", "lname": "Jareh", "grade": 88.0, "year": 2001 }
                    ], "classType": "ComputerScience"
                }],
            "classTypes": ["Biology", "Chemistry", "ComputerScience"]
        };

        this.getClasses = function getClasses() {
            return this.data.classTypes;
        }

        this.getYears = function getYears() {
            var arrays = [...new Set(this.data.classStudents
                .map(item => [...new Set(item.students.map(s => s.year))]))];
            return [].concat.apply([], arrays).sort();
        }

        this.getYearsByClass = function getYearsByClass(classType) {
            if (!classType || classType == "0") {
                return this.getYears();
            }
            var filtered = this.data.classStudents.filter(item => item.classType == classType);
            var arrays = [...new Set(filtered
                .map(item => [...new Set(item.students.map(s => s.year))]))];
            return [].concat.apply([], arrays).sort();
        }

        this.getClassesByYear = function getClassesByYear(year) {
            if (!year || year == "0") {
                return this.getClasses();
            }
            var filtered = this.data
                .classStudents
                .filter(item => item.students.some(s => s.year == year));

            return filtered.map(item => item.classType);
        }

        this.getStudents = function (year, classType) {
            var filtered = [];
            var filterByClass = this.data
                .classStudents
                .find(cs => cs.classType == classType);

            if (filterByClass) {
                filtered = filterByClass.students;
                if (year && year != "0") {
                    filtered = filtered.filter(s => s.year == year);
                }
            }
            return filtered;
        }

        this.updateGrade = function (studentData, classType) {
            var rowToUpdate = this.data.classStudents.find(cs => cs.classType == classType);
            if (!rowToUpdate) { return; }
            var student = rowToUpdate.students.find(s => s.fname == studentData.fname
                && s.lname == studentData.lname
                && s.year == studentData.year);
            if (!student) { return; }
            student.grade = +studentData.grade;
        }


    }]);