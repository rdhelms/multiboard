(function() {
  angular.module('multiboard').service('Backgrounds', function(Background, localStorageService) {

    function setBackgrounds(backgrounds) {
      localStorageService.set('boardBackgrounds', backgrounds);
    }

    function getBackgrounds(type) {
      switch (type) {
        case 'user':
          return localStorageService.get('boardBackgrounds') || [];
          break;
        case 'public':
          return getPublicBackgrounds() || [];
      }
    }

    this.getPublicBackgroundByName = function(name) {
      $.ajax({
        url: "board/get?name=" + name,
        method: "GET",
        success: function(response) {
          return response;
        },
        error: function(error) {
          return error;
        }
      });
    }

    this.getPublicBackgrounds = function() {
      $.ajax({
        url: "board/get",
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
      $.ajax({
        url: "board?name=" + background.name,
        method: "POST",
        data: background,
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }

    this.updateBackground = function(background) {
      $.ajax({
        url: "board?name=" + background.name,
        method: "POST",
        data: background,
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          console.log(error);
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
        case 'all':
          return getBackgrounds('all');
          break;
      }
    };
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
