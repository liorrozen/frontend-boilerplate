require.config({
    paths: {
        jquery: '/bower_components/jquery/jquery.min',
        underscore: '/bower_components/underscore/underscore-min',
        backbone: '/bower_components/backbone/backbone',
        text: '/bower_components/requirejs-text/text'
    }

});

require([
    'app',
], function(App){
    App.initialize();
});
