define([
  'jquery',
  'underscore',
  'backbone',
  'views/main/app',
], function($, _, Backbone, AppView){
  var initialize = function(){

    var appView = new AppView({
        el: '#container'
    });
    appView.render();

  };

  return {
    initialize: initialize
  };
});
