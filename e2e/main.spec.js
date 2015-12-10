'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('/app-name/');
  });

  it('should default path', function() {
    expect(browser.getLocationAbsUrl()).toMatch(/hoge-list$/);
  });

  it('should exists h1 title with hoges', function() {
    var h1 = element(by.css('.hoge-list h1'));
    expect(h1.getText()).toBe('hoges');
  });

  it('should 5 items', function () {
    element.all(by.repeater('hoge in controller.hoges')).then(function(items) {
      expect(items.length).toBe(5);
    });
  });

  it('should first item / hage', function() {
    element.all(by.repeater('hoge in controller.hoges')).then(function(items) {
      expect(items[0].getText()).toBe('はげ (hage)');
    });
  });

  it('should first item / hage', function() {
    element.all(by.repeater('hoge in controller.hoges')).then(function(items) {
      items[0].element(by.css('a')).click();
      expect(browser.getLocationAbsUrl()).toMatch(/hoge-detail\/hage$/);
    });
  });
});
