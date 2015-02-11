define([
  'jquery',
  'underscore',
  'backbone',
  'foundation'
], function($, _, Backbone){
  var AppView = Backbone.View.extend({

    render: function(){
        $(document).foundation();
        console.log( 'Here' );
    }
  });
  return AppView;
});
