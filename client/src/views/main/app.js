define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var AppView = Backbone.View.extend({

    render: function(){
        console.log( 'Here' );
    }
  });
  return AppView;
});
