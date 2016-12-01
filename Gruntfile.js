module.exports = function(grunt) {


  require("load-grunt-tasks")(grunt);

  grunt.initConfig ({
    less: {
      style: {
        files: {
          "build/css/style.css":["source/less/style.less"]
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },
    
    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      target: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },
    
    concat: {
      main: {
        src: [
          "node_modules/mustache/mustache.min.js",
          "node_modules/moment/min/moment-with-locales.min.js",
          "source/js/menu.js",
          "source/js/modals.js",
          "source/js/send.js",
          "source/js/spinner.js"
        ],
        dest: "build/js/scripts.js"
      }
    },
    
    uglify: {
      main: {
        files: {
          "build/js/scripts.min.js": ["build/js/scripts.js"]
        }
      }
    },
    
     clean: {
      build: ["build"],
      watch_html: ["build/*.html"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "js/**",
            "fonts/**",
            "img/**",
            "*.html"
          ],
          dest: "build"
        }]
      },
      
      watch_html: {
        files: [{
          expand: true,
          cwd: "source",
          src: ["*.html"],
          dest: "build"
        }]
      }
    },
    
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }] 
      }
    },
    
    watch: {
      configFiles: {
        files: [ "Gruntfile.js", "config/*.js" ],
        options: {
          reload: true
        }
      },
      
      options: {
        livereload: true,
      },

      style: {
        files: ["source/less/**/*.less", "source/less/*.less"],
        tasks: ["less", "cmq", "postcss", "cssmin", "imagemin"],
        options: {
          spawn: false,
          livereload: true
        }
      },
      
      script: {
        files: ["source/js/**/*.js"],
        tasks: ["concat", "uglify"],
        options: {
          spawn: false,
          livereload: true
        }
      },
      
      html: {
        files: ["source/*.html"],
        tasks: ["clean:watch_html", "copy:watch_html"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
    
  });
  
  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "cmq",
    "postcss",
    "cssmin",
    "imagemin",
    "concat",
    "uglify"
  ]);
  
};
