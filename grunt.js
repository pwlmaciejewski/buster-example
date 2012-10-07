module.exports = function(grunt) {
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'test/**/*.js', 'lib/**/*.js']
    },
    buster: {
      test: {
        config: 'test/buster.js'
      },
      server: {
        port: 1111
      }
    }
  });

  grunt.loadNpmTasks('grunt-buster');

  grunt.registerTask('test', 'lint buster');
};