module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      coffee: {
        files: '<config:coffee.all.src>',
        tasks: 'coffee'
      }
    },

    coffee: {
      all: {
        src: ['bin/**/*.coffee', 'test/**/*.coffee', 'lib/**/*.coffee'],
        dest: '<%= grunt.task.current.target %>',
        options: {
          bare: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-coffee');

};