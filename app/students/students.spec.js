'use strict';

describe('myApp.students module', function() {

  beforeEach(module('myApp.students'));

  describe('students controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var studentsCtrl = $controller('StudentsCtrl');
      expect(studentsCtrl).toBeDefined();
    }));

  });
});