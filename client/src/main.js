require.config({
    paths: {
        jquery: '/static/libs/jquery/jquery.min',
        underscore: '/static/libs/underscore/underscore-min',
        backbone: '/static/libs/backbone/backbone',
        text: '/static/libs/requirejs-text/text'
    }

});

require([
    'app',
], function(App){
    App.initialize();
});
