angular.module('multiboard').controller('scenesCtrl', function(Scenes, Backgrounds, $state) {
  var self = this;
  this.userScenes = Scenes.fetch('user') || [];
  this.publicScenes = Scenes.fetch('all') || [];
  this.userBackgrounds = Backgrounds.fetch('user') || [];
  this.publicBackgrounds = Backgrounds.fetch('all') || [];

  this.selectScene = function(scene) {
    Scenes.selectScene(scene);
    $state.go('board.draw');
  };

  $('.getScenesBtn').click(function() {
    self.userScenes = Scenes.fetch('all');
    $state.reload();
  });

  $('.deleteScenesBtn').click(function() {
    var allScenes = Scenes.reset();
    $state.reload();
  });

  this.selectBackground = function(background) {
    Backgrounds.selectBackground(background);
    $state.go('board.draw');
  };

  $('.getBackgroundsBtn').click(function() {
    self.userBackgrounds = Backgrounds.fetch('all');
    $state.reload();
  });

  $('.deleteBackgroundsBtn').click(function() {
    var allBackgrounds = Backgrounds.reset();
    $state.reload();
  });

});
