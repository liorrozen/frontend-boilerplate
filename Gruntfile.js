module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            src: 'src',
            build: 'build'
        },
        jshint: {
            all: ['Gruntfile.js', '<%= paths.src %>/**/*.js']
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    livereload: true,
                    open: {
                        target: 'http://127.0.0.1:<%= connect.server.options.port %>'
                    }
                }
            }
        },
        preprocess : {
            options: {
                inline: true,
                context : {
                    DEBUG: false,
                    css: []
                }
            },
            html: {
                src : '<%= paths.build %>/index.html',
                dest : '<%= paths.build %>/index.html'
            },
        },
        clean: [ '<%= paths.build %>/*' ],
        copy: {
            main: {
                src: [ '<%= paths.src %>/**/*', 'index.html' ],
                dest: '<%= paths.build %>/'
            },
            vendors: {
                src: [
                    'bower_components/fontawesome/css/font-awesome.min.css',
                    'bower_components/fontawesome/fonts/*',
                    'bower_components/nanoscroller/bin/css/nanoscroller.css',

                    'bower_components/requirejs/require.js',
                    'bower_components/jquery/jquery.min.js',
                    'bower_components/underscore/underscore-min.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/requirejs-text/text.js'
                ],
                dest: '<%= paths.build %>/'
            }

        },
        watch: {
            options: {
                livereload: true,
            },
            styles: {
                files: ['<%= paths.src %>/**/*.css'],
            },
            js: {
                files: ['<%= paths.src %>/**/*.js'],
            },
            html: {
                files: [ 'index.html', '<%= paths.src %>/**/*.html'],
            },
        }
    });

    grunt.registerTask('default',[
        'jshint',
        'clean',
        'copy',
        'preprocess'
    ]);

    grunt.registerTask('server',[
        'connect',
        'watch'
    ]);

};
