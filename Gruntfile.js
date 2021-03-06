// Generated on 2014-05-13 using generator-angular 0.6.0-rc.2
/**
 * Free to use and abuse.
 * If you modify jsBlackBelt code, please let me know or submit a pull request for the benefit of others.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: 'app',
            dist: 'dist/jsblackbelt'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['{.tmp,<%= yeoman.app %>}/scripts/**/*.js'],
                tasks: ['jshint:all']
            },
            jsTest: {
                files: ['test/spec/**/*.js'],
                tasks: ['jshint:test', 'karma']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/**/*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/**.html',
                    '.tmp/styles/**.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/**.js',
                    '<%= yeoman.app %>/images/**.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/**/*.js'
            ]
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'target/*',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: ['last 1 version'],
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '**/*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },


        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/**/*.js',
                        '<%= yeoman.dist %>/styles/**/*.css',
                        '<%= yeoman.dist %>/{images,styles}/**/*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/styles/**/*.css'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>',
                    '<%= yeoman.dist %>/images',
                    '<%= yeoman.dist %>/styles',
                    '<%= yeoman.dist %>/styles/fonts'
                ]
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '**/*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '**/*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        html2js: {
            options: {
                htmlmin: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeComments: true
                },
                module: 'jsBlackBelt',
                base: 'app'
            },
            main: {
                src: ['<%= yeoman.app %>/scripts/**/*.html'],
                dest: '.tmp/concat/scripts/templates.js'
            }
        },
//        htmlmin: {
//            dist: {
//                options: {
//                    // Optional configurations that you can uncomment to use
//                    // removeCommentsFromCDATA: true,
//                    collapseWhitespace: true,
//                    collapseBooleanAttributes: true,
//                    removeComments: true
//                    // removeAttributeQuotes: true,
//                    // removeRedundantAttributes: true,
//                    // useShortDoctype: true,
//                    // removeEmptyAttributes: true,
//                    // removeOptionalTags: true*/
//                },
//                files: [
//                    {
//                        expand: true,
//                        cwd: '<%= yeoman.app %>',
//                        src: ['*.html', 'scripts/**/*.html', 'conf/*'],
//                        dest: '<%= yeoman.dist %>'
//                    }
//                ]
//            }
//        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },
        /*
        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },*/

        // Copies remaining files to places other tasks can use
        copy: {
            css: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '.tmp/styles',
                        dest: '<%= yeoman.dist %>/styles',
                        src: [
                            '*.css'
                        ]
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'bower_components/**/*',
                            'images/**/*.{png,jpg,jpeg,gif,webp}',
                            'styles/fonts/*',
                            'i18n/*.json',
                            'WEB-INF/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: [
                            'generated/*'
                        ]
                    },
                    {
                        // copy bootstrap glyphicons
                        expand: true,
                        cwd: '<%= yeoman.app %>/bower_components/bootstrap/dist/fonts',
                        dest: '<%= yeoman.dist %>/fonts',
                        src: ['*']
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '**/*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server',
                'copy:styles'
            ],
            test: [
                'compass',
                'copy:styles'
            ],
            dist: [
                'compass:dist',
                'copy:styles',
//                'imagemin',
                'svgmin',
//                'htmlmin'
                'html2js'
            ]
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= yeoman.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        uglify: {
            options: {
                mangle: true
                /*mangle: {except: ['$log']}*/
            },
            dist: {
             files: {
               '<%= yeoman.dist %>/scripts/jsblackbelt.min.js': [
                 '<%= yeoman.dist %>/scripts/jsblackbelt.js'
               ]

             }
           }
        },
        concat: {
           options: {
               separator: ';'
           },
           dist: {
               src: ['.tmp/concat/scripts/jsblackbelt.js', '.tmp/concat/scripts/templates.js'],
               dest: '<%= yeoman.dist %>/scripts/jsblackbelt.js'
           }
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            e2e: {
                configFile: 'karma-e2e.conf.js',
                singleRun: true
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'tgz',
                    archive: 'target/jsBlackBelt.tgz'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: '**/*',
                    dot: true
                }]
            }
        },
        includeSource: {
            options: {
                basePath: 'app',
                templates: {
                    html: {
                        js: '<script src="{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />'
                    },
                    scss: {
                        scss: '@import "{filePath}";',
                        css: '@import "{filePath}";'
                    }
                }
            },
            myTarget: {
                files: {
                    'app/index.html': 'app/index.tpl.html'
                }
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma:unit'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'includeSource',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'copy:dist',
        'ngmin',
        'cssmin',
        'concat:dist',
        'uglify:dist',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('check', ['jshint', 'test']);
};
