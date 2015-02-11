module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            libs: 'client/libs',
            src: 'client/src',
            build: 'client/build'
        },
        jshint: {
            all: ['Gruntfile.js', '<%= paths.src %>/**/*.js']
        },
        connect: {
            rules: [
                {from: '/static/(.*)$', to: '/client/$1'}
            ],
            server: {
                options: {
                    port: 9001,
                    livereload: true,
                    open: {
                        target: 'http://127.0.0.1:<%= connect.server.options.port %>'
                    },
                    middleware: function (connect, options) {
                        var middlewares = [];

                        // RewriteRules support
                        middlewares.push(rewriteRulesSnippet);

                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        options.base.forEach(function (base) {
                            // Serve static files.
                            middlewares.push(connect.static(base));
                        });

                        return middlewares;
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
                    dest: '<%= paths.build %>/',
                    expand: false,
            },
            vendors: {
                    src: [ '<%= paths.libs %>/**/*' ],
                    dest: '<%= paths.build %>/',
                    expand: false,
                }

        },
        requirejs: {
            compile: {
                options: {
                    appDir: "<%= paths.build %>",
                    baseUrl: "./",
                    mainConfigFile: "<%= paths.build %>/src/main.js",
                    allowSourceOverwrites: true,
                    keepBuildDir: true,
                    dir: "<%= paths.build %>",
                },
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
        'preprocess',
        'requirejs'
    ]);

    grunt.registerTask('server',[
        'configureRewriteRules',
        'connect:server',
        'watch'
    ]);

};
