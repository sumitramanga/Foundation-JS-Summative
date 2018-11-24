module.exports = function(grunt) {
  grunt.initConfig({
    cssmin: {
      target: {
        files:[{
          expand: true,
          cwd: 'css/',
          src: ['*.css', '!*.min.css'],
          dest: 'css/',
          ext:'.min.css'
        }]
      }
    },

    uglify: {
      my_target: {
        files: {
          'js/script.min.js': ['js/script.js']
        }
      }
    },

    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['css/style.css']
      }
    },

    jshint: {
      all: ['*.js', 'js/script.js'],
      options: {
        globals: {jQuery: true}
      }
    },

    sass: {
      dist: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    },

    watch:{
      css: {
        files:['css/style.css'],
        tasks: ['cssmin']
      },

      js: {
        files:['js/script.js'],
        tasks: ['jshint', 'uglify']
      },

      sass: {
        files:['sass/style.scss'],
        tasks:['sass']
      }
    }
  });

  // grunt.loadNpmTasks();
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // grunt.registerTask();
  // name of the task, and what's going to happen

  // Default to run tasks all together
  grunt.registerTask('default', ['cssmin']);
  grunt.registerTask('min', ['cssmin']);
  grunt.registerTask('ugg', ['uglify']);
  grunt.registerTask('lintcss', ['csslint']);
  grunt.registerTask('hintingjs', ['jshint']);
  grunt.registerTask('compile', ['sass']);
  grunt.registerTask('w', ['watch']);

};

// '!*.min.css' = do not minify the minfied css
// ext = the extension of the file
// minify js at the end of development
