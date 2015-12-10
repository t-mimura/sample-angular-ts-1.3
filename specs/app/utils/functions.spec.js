(function() {
  'use strict';

  describe('myAPp.utils.isEmpty', function() {

    beforeEach(module('myApp'));

    it('isEmptyのテストです', inject(function() {
      var isEmpty = myApp.utils.isEmpty;

      // truthy
      expect(isEmpty).toBeTruthy();
      expect(isEmpty(null)).toBeTruthy();
      expect(isEmpty(undefined)).toBeTruthy();
      expect(isEmpty([])).toBeTruthy();

      // falsy
      expect(isEmpty('')).not.toBeTruthy();
      expect(isEmpty('a')).not.toBeTruthy();
      expect(isEmpty('null')).not.toBeTruthy();
      expect(isEmpty([null])).not.toBeTruthy();
      expect(isEmpty(['a'])).not.toBeTruthy();
      expect(isEmpty(['a', 'b'])).not.toBeTruthy();
    }));

  });

})();
