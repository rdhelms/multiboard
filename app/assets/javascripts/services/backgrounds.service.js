(function() {
  angular.module('multiboard').service('Backgrounds', function($http, Background, localStorageService) {
    var self = this;

    function setBackgrounds(backgrounds) {
      localStorageService.set('boardBackgrounds', backgrounds);
    }

    function getBackgrounds(type) {
      switch (type) {
        case 'user':
          return localStorageService.get('boardBackgrounds') || [];
          break;
        case 'public':
          return self.getPublicBackgrounds() || [];
      }
    }

    this.getPublicBackgrounds = function() {
      var fullResponse = $http({
        url: "background/index",
        method: "GET"
      });
      return fullResponse;
    }

    this.getPublicBackgroundById = function(background) {
      $.ajax({
        url: "background/get?id=" + background.id,
        method: "GET",
        success: function(response) {
          return response;
        },
        error: function(error) {
          return error;
        }
      });
    }

    this.publishBackground = function(background) {

      var backArr = background.staticArr;

      var imageArr = [];
      backArr.forEach(function(object) {
        imageArr.push(encodeURIComponent(JSON.stringify(object)));
      });

      $.ajax({
        url: "background/create?name=" + background.name + "&img=" + imageArr,
        method: "POST",
        data: background,
        success: function(response) {
        },
        error: function(error) {
          return error;
        }
      });
    }

    self.updateBackground = function(background) {
      $.ajax({
        url: "background/update?=" + background.id,
        method: "PATCH",
        data: background,
        success: function(response) {
          return response;
        },
        error: function(error) {
          return error;
        }
      });
    }

    function getCurrentBackground() {
      return localStorageService.get('currentBackground') || {};
    }

    function setCurrentBackground(background) {
      localStorageService.set('currentBackground', background);
    }

    function findBackgroundById(backgroundsOld, idToFind) {
      var backgroundFound;
      backgroundsOld.forEach(function(backgroundOld) {
        if (backgroundOld.id === idToFind) {
          backgroundFound = backgroundOld;
        }
      });
      return backgroundFound;
    }

    this.updateBackgrounds = function(backgrounds) {
      setBackgrounds(backgrounds);
    };
    this.fetch = function(type) {
      switch (type) {
        case 'user':
          return getBackgrounds('user');
          break;
        case 'public':
          return getBackgrounds('public');
          break;
      }
    };
    this.construct = function(backgroundContent) {
      return new Background(backgroundContent);
    }
    this.create = function(backgroundContent) {
      var backgrounds = getBackgrounds('user');
      var newBackground = new Background(backgroundContent);
      backgrounds.push(newBackground);
      setBackgrounds(backgrounds);
      return newBackground;
    };
    this.reset = function() {
      var backgrounds = [];
      setBackgrounds(backgrounds);
      return getBackgrounds('user');
    };
    this.delete = function(background) {
      var backgrounds = getBackgrounds('user');
      var newBackgrounds = [];
      backgrounds.forEach(function(oldBackground) {
        if (oldBackground.id !== background.id) {
          newBackgrounds.push(oldBackground);
        }
      });
      setBackgrounds(newBackgrounds);
    };
    this.selectBackground = function(background) {
      setCurrentBackground(background);
    };
    this.fetchCurrentBackground = function() {
      return getCurrentBackground();
    };

  });
})();
