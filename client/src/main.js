require.config({
    paths: {
        jquery: '/static/libs/jquery/dist/jquery.min',
        underscore: '/static/libs/underscore/underscore-min',
        backbone: '/static/libs/backbone/backbone',
        foundation: '/static/libs/foundation/js/foundation.min',
        text: '/static/libs/requirejs-text/text'
    }

});

require([
    'app',
], function(App){
    App.initialize();
});
