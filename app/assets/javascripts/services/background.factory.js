(function() {
  angular.module('multiboard').factory('Background', function() {
    return function Background(content) {
      this.id = Date.now();
      this.name = content.name;
      this.staticArr = content.staticArr;
      this.thumbnail = content.thumbnail;
    };
  });
})();
