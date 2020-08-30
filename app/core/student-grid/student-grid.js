angular.module('myApp')
    .component('studentGrid', {
        templateUrl: 'core/student-grid/student-grid.html',
        controller: ['$scope',
            function StudentGridController($scope) {
                var ctrl = this;
                var gridApi;

                //ctrl.registerParent(/{ childRef: ctrl });

                ctrl.setRowData = function () {
                    $scope.gridOptions.rowData = ctrl.students;
                    if (gridApi) {
                        gridApi.setRowData(ctrl.students);
                        gridApi.redrawRows();
                    }
                }

                $scope.$on('studentsUpdate', function (evt, data) {
                    ctrl.students = data;
                    ctrl.setRowData();
                })

                $scope.gridOptions = {
                    columnDefs: [
                        {
                            headerName: 'Name', field: 'fname', editable: false, width: 250,
                        },
                        { headerName: 'S Name', field: 'lname', editable: false, width: 250 },
                        {
                            headerName: 'Score', field: 'grade', editable: true, width: 150//,
                            //valueFormatter: params => params.value ? params.value.toFixed(0) : params.value
                        }
                    ],
                    rowSelection: 'single',
                    onGridReady: function (event) {
                        gridApi = event.api;
                    },
                    onCellEditingStopped: function (event) {
                        ctrl.updateGrade({
                            eventData: event.data
                        });
                        event.node.setData(event.data);
                    },
                    rowData: ctrl.students,
                    getRowStyle: function (params) {
                        if (params.data.grade <= 45) {
                            return { 'background-color': 'lightcoral' }
                        }
                    },
                    onRowSelected: function (event) {
                        if (event.node.selected) {
                            ctrl.selectedStudent = {
                                fname: event.data.fname,
                                lname: event.data.lname,
                                year: event.data.year,
                                grade: event.data.grade
                            };
                            ctrl.selectStudent({
                                eventData: ctrl.selectedStudent
                            });
                        }
                    }
                };
            }],
        bindings: {
            students: '=',
            selectedStudent: '=',
            updateGrade: '&',
            selectStudent: '&',
            registerParent: '='
        }
    });