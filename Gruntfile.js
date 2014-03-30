    //Gruntfile
    module.exports = function(grunt) {

    //Initializing the configuration object
      grunt.initConfig({
        // Task configuration
        // clean all previously built files
        clean: {
        default: {dist: ["dist/"]}
        },
        copy: {
          img: {
            //copy images to /dist folder for deployment
            files: [
              {
                expand: true, src: ['site/img/**'], dest: 'dist/img/',
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
                  //compiling frontend.less into frontend.css
                  "./dist/assets/stylesheets/landing.css":
                   "./site/stylesheets/landing.less",
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jslint');

    // Task definition
      grunt.registerTask('default', ['jslint', 'clean', 'copy', 'less',
        'concat', 'uglify']);

  };
