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
  this.publicScenes = Scenes.fetch('public') || [];   // Get all the database scenes. If none, get an empty array.
  this.userBackgrounds = Backgrounds.fetch('user') || [];   // Get all the localStorage backgrounds. If none, get an empty array.
  this.publicBackgrounds = [];
  Backgrounds.fetch('public').then(function(response) {
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
      for (var index = 0; index < newBackground.staticArr.length; index++) {
        var square = newBackground.staticArr[index];
        drawTest.fillStyle = square.color;
        drawTest.fillRect(square.x, square.y, square.width, square.height);
      }
      newBackground.thumbnail = $canvasTest[0].toDataURL();
      self.publicBackgrounds.push(newBackground);
    });
  }) || [];   // Get all the database backgrounds. If none, get an empty array.

  //  Called when the user clicks on a scene.
  //  Changes the current Scene in localStorage to the one that was clicked.
  //  @params
  //    scene: the scene object from userScenes or publicScenes that was clicked on.
  this.selectScene = function(scene) {
    Scenes.selectScene(scene);
    $state.go('board.draw');
  };

  // Called when the View Your Scenes button is clicked.
  // Update the userScenes array to the most recent localStorage value. If none, set it as an empty array.
  this.getUserScenes = function() {
    self.userScenes = Scenes.fetch('user') || [];
    $state.reload();
  }

  // Called when the Delete Your Scenes button is clicked.
  // Reset the localStorage array of scenes.
  this.deleteUserScenes = function() {
    Scenes.reset();
    $state.reload();
  }

  //  Called when the user clicks on a background.
  //  Changes the current Background in localStorage to the one that was clicked.
  //  @params
  //    background: the background object from userBackgrounds or publicBackgrounds that was clicked on.
  this.selectBackground = function(background) {
    Backgrounds.selectBackground(background);
    $state.go('board.draw');
  };

  // Called when the View Your Backgrounds button is clicked.
  // Update the userBackgrounds array to the most recent localStorage value. If none, set it as an empty array.
  this.getUserBackgrounds = function() {
    self.userBackgrounds = Backgrounds.fetch('user');
    $state.reload();
  }

  // Called when the Delete Your Backgrounds button is clicked.
  // Reset the localStorage array of backgrounds.
  this.deleteUserBackgrounds = function() {
    Backgrounds.reset();
    $state.reload();
  }

});
