(function() {
  angular.module('multiboard').factory('Scene', function() {
    return function Scene(content) {
      this.id = Date.now();
      this.name = content.name || '';
      this.staticArr = content.staticArr || [];
      this.mobileArr = content.mobileArr || [];
      this.thumbnail = content.thumbnail || '';
    };
  });
})();
