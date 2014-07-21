// Karma configuration
// Generated on Mon Jul 07 2014 13:39:20 GMT-0500 (Central Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        "bower_components/jquery/dist/jquery.js",
        "bower_components/angular/angular.js",
        "bower_components/angular-mocks/angular-mocks.js",
        "bower_components/angular-route/angular-route.js",
        "bower_components/angular-resource/angular-resource.js",
        "bower_components/bootstrap/dist/js/bootstrap.js",
        "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
        "bower_components/angular-xeditable/dist/js/xeditable.js",
        "bower_components/ng-grid/ng-grid-2.0.11.debug.js",
        "bower_components/lodash/dist/lodash.js",
        "components/angular-crud/angular-crud.js",
        "components/angular-crud-elasticsearch/resource-service.js",
        "app/app.js",
        "test/**/*-spec.js"
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
