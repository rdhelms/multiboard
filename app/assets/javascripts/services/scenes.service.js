(function() {
  angular.module('multiboard').service('Scenes', function(Scene, localStorageService) {

    function setScenes(scenes) {
      localStorageService.set('boardScenes', scenes);
    }

    function getScenes(type) {
      switch (type) {
        case 'user':
          return localStorageService.get('boardScenes') || [];
          break;
        case 'public':
          return getPublicScenes() || [];
      }
    }

    this.getPublicSceneByName = function(name) {
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

    this.getPublicScenes = function() {
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

    this.publishScene = function(scene) {
      $.ajax({
        url: "board?name=" + scene.name,
        method: "POST",
        data: scene,
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }

    this.updateScene = function(scene) {
      $.ajax({
        url: "board?name=" + scene.name,
        method: "POST",
        data: scene,
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }

    function getCurrentScene() {
      return localStorageService.get('currentScene') || {};
    }

    function setCurrentScene(scene) {
      localStorageService.set('currentScene', scene);
    }

    function findSceneById(scenesOld, idToFind) {
      var sceneFound;
      scenesOld.forEach(function(sceneOld) {
        if (sceneOld.id === idToFind) {
          sceneFound = sceneOld;
        }
      });
      return sceneFound;
    }

    this.updateScenes = function(scenes) {
      setScenes(scenes);
    };
    this.fetch = function(type) {
      switch (type) {
        case 'user':
          return getScenes('user');
          break;
        case 'public':
          return getScenes('public');
          break;
      }
    };
    this.create = function(sceneContent) {
      var scenes = getScenes('user');
      var newScene = new Scene(sceneContent);
      scenes.push(newScene);
      setScenes(scenes);
      return newScene;
    };
    this.reset = function() {
      var scenes = [];
      setScenes(scenes);
      return getScenes('user');
    };
    this.delete = function(scene) {
      var scenes = getScenes('user');
      var newScenes = [];
      scenes.forEach(function(oldScene) {
        if (oldScene.id !== scene.id) {
          newScenes.push(oldScene);
        }
      });
      setScenes(newScenes);
    };
    this.selectScene = function(scene) {
      setCurrentScene(scene);
    };
    this.fetchCurrentScene = function() {
      return getCurrentScene();
    };

  });
})();
