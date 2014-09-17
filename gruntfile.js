module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        'tessel-run': {
            options: {
                //fileToPush: './lib/index.js'
                //additionalArgs: ['-s']
            },
            'default': {}
        },

        'blacklist-dev-deps': {
            default: {}
        },


        'tessel-push': {
            options: {
                // Passes the --logs flag to `tessel push`.
                // This will keep the connection open so you can watch what the tessel is doing.
                // This option makes the task run forever.
                // Defaults to `true`.
                keepalive: true,

                // The package.json to look for a `main` script - relative to the cwd.
                // This option is ignored if `fileToPush` is specified.
                // Defaults to `package.json`.
                packageJsonFilePath: 'package.json',

                // Instead of looking in a package.json for a `main` field, just push this file instead.
                // Setting this field causes `packageJsonFilePath` to be ignored.
                // Defaults to `null`
                fileToPush: null,

                // Additional arguments to pass through to `tessel push`.
                // See `tessel push --help` for more details.
                // Defaults to an empty list.
                additionalArgs: []
            },

            // Example task targets
            'watch-the-logs': {
                options: {
                    keepalive: true
                }
            },
            'fire-and-forget': {
                options: {
                    keepalive: false
                }
            }
        }
    });


    grunt.registerTask('default', [
        //'test', // assuming you've already defined test to be something interesting
        'blacklist-dev-deps',
        'tessel-run'
    ]);
};
