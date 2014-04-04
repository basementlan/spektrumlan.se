    //Gruntfile
    module.exports = function(grunt) {

    //Initializing the configuration object
      grunt.initConfig({
        // Task configuration
        // clean all previously built files
        clean: ['dist/', 'out'],
        copy: {
          img: {
            //copy images to /dist folder for deployment
            files: [
              {
                expand: true, cwd: 'site/img', src: ['./**'], dest: 'dist/img/',
                filter: 'isFile'
              }
            ]
          },
          fonts: {
            files: [
              {
                expand: true, flatten: true, src: ['site/fonts/**'], dest: 'dist/fonts/',
                filter: 'isFile'
              }
            ]
          }
        },
        jslint: {

          // lint your project's client code
          client: {
            src: [
              'site/js/*.js',
              'site/*.js'
            ],
            directives: {
              browser: true,
              predef: [
                'jQuery'
              ]
            },
            options: {
              junit: 'out/client-junit.xml'
            }
          }
        },
        build_html: {
          main: {
            options: {
              templates: 'site/parts/**/*.html'
            },
            expand: true,
            cwd: 'site/',
            src: ['*.html'],
            dest: 'dist/',
            ext: '.html'
          }
        },
        concat: {
              options: {
                separator: ';',
              },
              js_main: {
                  // concat js files for main page/info part
                src: [
                  './bower_components/jquery/jquery.js',
                  './bower_components/bootstrap/dist/js/bootstrap.js',
                  './site/js/main.js'
                ],
                dest: './dist/assets/js/main.js',
              },
              js_landing: {
                  /* concat javascript files for the landing page – atm only
                   * jQuery and Bootstrap and should use main.js instead.
                  */
                src: [
                  './bower_components/jquery/jquery.js',
                  './bower_components/bootstrap/dist/js/bootstrap.js',
                ],
                dest: './dist/assets/js/landing.js',
              },
        },
        less: {
            development: {
                options: {
                  compress: true,  //minifying the result
                },
                files: {
                  //compiling base.less into style.css
                  "./dist/css/style.css":
                   "./site/stylesheets/base.less",
                }
            }
        },
        uglify: {
          options: {
            mangle: false  // Keep function names etc. unchanged
          },
          frontend: {
            files: {
              './site/js/main.js':
                './site/js/main.js',
            }
          },
          backend: {
            files: {
              './site/js/landing.js':
                './site/js/landing.js',
            }
          },
        },


      });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-build-html');

    // Task definition
      grunt.registerTask('default', ['clean', 'jslint', 'build_html', 'copy', 'less',
        'concat', 'uglify']);

  };
