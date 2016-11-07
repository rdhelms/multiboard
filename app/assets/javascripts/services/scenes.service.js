(function() {
  angular.module('multiboard').service('Scenes', function($http, Scene, localStorageService) {

    var self = this;

    function setScenes(scenes) {
      localStorageService.set('boardScenes', scenes);
    }

    function getScenes(type) {
      switch (type) {
        case 'user':
          return localStorageService.get('boardScenes') || [];
          break;
        case 'public':
          return self.getPublicScenes() || [];
      }
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

    this.getPublicScenes = function() {
      var fullResponse = $http({
        url: "scene/index",
        method: "GET"
      });
      return fullResponse;
    }

    this.getPublicSceneById = function(scene) {
      $.ajax({
        url: "scene/get?id=" + scene.id,
        method: "GET",
        success: function(response) {
          encodeURIComponent(JSON.parse(response));
        },
        error: function(error) {
          return error;
        }
      });
    }

    this.publishScene = function(scene) {
      var sceneArr = scene.staticArr;
      var imageArr = [];
      sceneArr.forEach(function(object) {
        imageArr.push(encodeURIComponent(JSON.stringify(object)));
      });
      var request = $http({
        url: "scene/create?name=" + scene.name + "&img=" + imageArr,
        method: "POST",
        data: scene
      });
      request.then(function(response) {
        // Can do something after response is acquired here.
      });
    }

    this.updateScene = function(scene) {
      $.ajax({
        url: "scene/update?name=" + scene.name,
        method: "POST",
        data: scene,
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
    this.construct = function(sceneContent) {
      return new Scene(sceneContent);
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
