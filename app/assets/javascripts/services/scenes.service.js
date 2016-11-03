(function() {
  angular.module('multiboard').service('Scenes', function(Scene, localStorageService) {
    function getScenes() {
      return localStorageService.get('boardScenes') || [];
    }

    function setScenes(scenes) {
      localStorageService.set('boardScenes', scenes);
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

    this.getSceneByName = function(name) {
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

    this.updateScenes = function(scenes) {
      setScenes(scenes);
    };
    this.fetch = function() {
      return getScenes();
    };
    this.create = function(sceneContent) {
      var scenes = getScenes();
      var newScene = new Scene(sceneContent);
      scenes.push(newScene);
      setScenes(scenes);
    };
    this.reset = function() {
      var scenes = [];
      setScenes(scenes);
      return getScenes();
    };
    this.delete = function(scene) {
      var scenes = getScenes();
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
