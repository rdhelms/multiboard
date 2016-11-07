// Controller for scenes and backgrounds viewing page.
// App Name: multiboard
// Controller Name: scenesCtrl
// Alias: scenes
// Dependencies:
//  - Scenes Service: scenes.service.js
//  - Backgrounds Service: backgrounds.service.js
//  - $state from angular
angular.module('multiboard').controller('scenesCtrl', function(Scenes, Backgrounds, $state) {
  var self = this;  // To help with scope issues.
  this.userScenes = Scenes.fetch('user') || [];   // Get all the localStorage scenes. If none, get an empty array.
  this.userBackgrounds = Backgrounds.fetch('user') || [];   // Get all the localStorage backgrounds. If none, get an empty array.
  this.publicScenes = [];
  this.publicBackgrounds = [];

  //  Called when the user clicks on a scene.
  //  Changes the current Scene in localStorage to the one that was clicked.
  //  @params
  //    scene: the scene object from userScenes or publicScenes that was clicked on.
  this.selectScene = function(scene) {
    Scenes.selectScene(scene);
    $state.go('board.draw');
  };

  //  Called when the user clicks on a background.
  //  Changes the current Background in localStorage to the one that was clicked.
  //  @params
  //    background: the background object from userBackgrounds or publicBackgrounds that was clicked on.
  this.selectBackground = function(background) {
    Backgrounds.selectBackground(background);
    $state.go('board.draw');
  };

  // Called when the View Your Scenes button is clicked.
  // Update the userScenes array to the most recent localStorage value. If none, set it as an empty array.
  this.getUserScenes = function() {
    self.userScenes = Scenes.fetch('user') || [];
    $state.reload();
  }

  // Called when the View Your Backgrounds button is clicked.
  // Update the userBackgrounds array to the most recent localStorage value. If none, set it as an empty array.
  this.getUserBackgrounds = function() {
    self.userBackgrounds = Backgrounds.fetch('user');
    $state.reload();
  }

  // Called when the Delete Your Scenes button is clicked.
  // Reset the localStorage array of scenes.
  this.deleteUserScenes = function() {
    Scenes.reset();
    $state.reload();
  }

  // Called when the Delete Your Backgrounds button is clicked.
  // Reset the localStorage array of backgrounds.
  this.deleteUserBackgrounds = function() {
    Backgrounds.reset();
    $state.reload();
  }

  // Called when the Refresh Backgrounds button is clicked.
  this.refreshBackgrounds = function() {
    self.publicBackgrounds = [];
    // Similar to process for getting scenes from database.
    Backgrounds.fetch('public').then(function(response) {  // Get all the database backgrounds.
      var $canvasTest = $('<canvas width=700 height=500>').css({
        'background': 'white'
      });
      var drawTest = $canvasTest[0].getContext('2d');
      var partialBackgrounds = response.data;
      partialBackgrounds.forEach(function(background) {
        var backgroundInfo = {
          name: background.name,
          staticArr: JSON.parse('[' + background.img + ']'),
          thumbnail: ''
        };
        var newBackground = Backgrounds.construct(backgroundInfo);
        drawTest.clearRect(0, 0, $canvasTest[0].width, $canvasTest[0].height);
        for (var index = 0; index < newBackground.staticArr.length; index++) {
          var square = newBackground.staticArr[index];
          drawTest.fillStyle = square.color;
          drawTest.fillRect(square.x, square.y, square.width, square.height);
        }
        newBackground.thumbnail = $canvasTest[0].toDataURL();
        self.publicBackgrounds.push(newBackground);
      });
    });
  }

  // Called when the Refresh Scenes button is clicked.
  this.refreshScenes = function() {
    self.publicScenes = [];
    // Might be able to have the $http request here, rather than in the service.
    // NOTE: currently missing mobileArr
    Scenes.fetch('public').then(function(response) { // Get all the database scenes.
      var partialScenes = response.data;  // This is the response from the database. Array of partial Scene objects.
      var $canvasTest = $('<canvas width=700 height=500>').css({  // This canvas is only created in order to view the thumbnail
        'background': 'white'
      });
      var drawTest = $canvasTest[0].getContext('2d');
      partialScenes.forEach(function(scene) { // Loop through all the partial scenes.
        var sceneInfo = { // This is the information that a full scene needs.
          name: scene.name,
          staticArr: JSON.parse('[' + scene.img + ']'),
          thumbnail: ''
        };
        var newScene = Scenes.construct(sceneInfo); // Create a full scene object based on the partial information.
        drawTest.clearRect(0, 0, $canvasTest[0].width, $canvasTest[0].height);
        for (var index = 0; index < newScene.staticArr.length; index++) { // Loop through the array of obstacles and draw them all.
          var square = newScene.staticArr[index];
          drawTest.fillStyle = square.color;
          drawTest.fillRect(square.x, square.y, square.width, square.height);
        }
        newScene.thumbnail = $canvasTest[0].toDataURL();  // Get the thumbnail image from the canvas.
        self.publicScenes.push(newScene);   // Add the new full scene object to the array of all the scenes.
      });
    });
  }

});
