var fs = require("fs");
var browserify = require("browserify");
var grunt = require("grunt");

grunt.initConfig({
    srcPath: '.',
    browserify: {
        client: {
            options: {
                debug: true,
                transform: [["babelify"]]
            },
            files: {
                "./client.js": ["./index.js"]
            }
        }
    },
    babel: {
        options: {
            loose: "all",
            presets: ['es2015']
        },
        dev: {}
    }
});

grunt.loadNpmTasks('grunt-babel');
grunt.loadNpmTasks('grunt-browserify');
grunt.registerTask('build', ["browserify:client"]);
grunt.registerTask('default', ["build"]);
