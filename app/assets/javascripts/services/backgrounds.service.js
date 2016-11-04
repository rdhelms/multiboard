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

    self.getPublicBackgroundByName = function(name) {
      $.ajax({
        url: "background/get?name=" + name,
        method: "GET",
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          return error;
        }
      });
    }

    self.getPublicBackgrounds = function() {
      $.ajax({
        url: "background/index",
        method: "GET",
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          return error;
        }
      });
    }

    this.publishBackground = function(background) {
      $.ajax({
        url: "background/create?name=" + background.name + "&img=" + background.staticArr,
        method: "POST",
        data: background,
        success: function(response) {
          console.log(background.staticArr);

          //This is wired up. Jus tneed to add the img data to the url - which is the array of objects.
        },
        error: function(error) {
          console.log(error);
        }
      });
    }

    self.updateBackground = function(background) {
      $.ajax({
        url: "background/update?=" + background.id,
        method: "PATCH",
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
        case 'public':
          return getBackgrounds('public');
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
