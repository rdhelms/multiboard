angular.module('multiboard').controller('scenesCtrl', function(Scenes, $state) {

  this.allScenes = Scenes.fetch() || [];

  this.selectScene = function(scene) {
    Scenes.selectScene(scene);
    $state.go('board.draw');
  };

  $('.getScenesBtn').click(function() {
    var allScenes = Scenes.fetch();
    $state.reload();
  });

  $('.deleteScenesBtn').click(function() {
    var allScenes = Scenes.reset();
    $state.reload();
  });

});
