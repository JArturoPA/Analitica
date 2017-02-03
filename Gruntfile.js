// Generated on 2017-02-02
'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var options = {
        // Project settings
        paths: {
           // Configurable paths
           app: 'src/app',
           dist: 'src/dist',
           less: 'src/less'
        }   
    };

	// Define the configuration for all the tasks
    grunt.initConfig({
        bgShell: {
            _defaults: {
                bg: true
            },
            build:{
                cmd: 'grunt build'
            },
            watchstyles: {
                cmd: 'grunt updatestyles'
            },
            runNode: {
                cmd: 'cd src & node ../scripts/web-server',
                bg: false
            }
        },
        paths:{
            base: 'src',
            app: 'src/app',
            dist: 'src/dist',
            less: 'src/less'
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['.tmp', '<%= paths.dist %>/*', '!<%= paths.dist %>/.git*']
                }]
            }
        },

        copy:{
            dist: {
                files: [{
                    expand: true,
                    dot: false,
                    cwd    : '<%= paths.base %>',
                    dest   : '<%= paths.dist %>',
                    src    : [ '**/*.{ico,png,txt}', '.htaccess', 'img/{,*/}*.webp', 'fonts/{,*/}*.*' ]
                }]
            }
        },
///////////////////////////////////////////////////////////////////////////////
        less: {
            development:{
                files: {
                    '<%= paths.dist %>/css/style.css': '<%= paths.less %>/toolkit-light.less'
                }                
            },
            production: {
                options: {
                    cleancss: true
                },
                files: {
                    '<%= paths.dist %>/css/style.css': '<%= paths.less %>/toolkit-light.less'
                } 
            }
        },

        watch: {
            less:{
                files: '<%= paths.less %>/**/*.less',
                tasks: 'less'
            },
            css:{
                files: '<%= paths.app %>/**/*.css',
                tasks:  ['concat:css', 'cssmin']
            },
            js: {
                files: [
                    '<%= paths.base %>/bower_components/**/*.js',
                    '<%= paths.app %>/**/*.js'
                ],
                tasks: ['uglify', 'concat:js']
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: [ 
                    '<%= paths.base %>/bower_components/jQuery/dist/jquery.min.js',
                    '<%= paths.base %>/bower_components/angular/angular.min.js',
                    '<%= paths.base %>/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    '<%= paths.dist %>/js/app.js'
                ],
                dest: '<%= paths.dist %>/js/app.min.js'

            },
            css: {
                src: [ 
                    '<%= paths.dist %>/css/style.css',
                    '<%= paths.app %>/**/*.css'
                ],
                dest: '<%= paths.dist %>/css/style.css'
            }
        },
        uglify: {
            options: {
                compress: true,
                mangle: true
            },
            target: {
                src: '<%= paths.app %>/**/*.js',
                dest: '<%= paths.dist %>/js/app.js'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.dist %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= paths.dist %>/css',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-bg-shell');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build', [
        'clean:dist',
        'less',
        'concat:css',
        'cssmin',
        'uglify',       
        'concat:js',
        'copy:dist'
    ]);
    grunt.registerTask('updatestyles', ['watch']);
    grunt.registerTask('start-development', ['bgShell:build','bgShell:watchstyles','bgShell:runNode']);
};