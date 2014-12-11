var grunt = require('grunt');
var config = require('config');
grunt.initConfig({
	bower: {
	    install: {
	      options: {
	        targetDir: './'+ config.upload.path + '/lib/',
	        layout: 'byComponent',
	        install: true,
	        verbose: false,
	        cleanTargetDir: true,
	        cleanBowerDir: false,
	        bowerOptions: {}
	      }
	    }
	},
	less: {
        production: {
            options: {
                compress: true
            },
            files: {
                "build/css/index.css":"src/less/index.less"
            }
        }
    },
    watch: {
        files: "src/less/**/*.less",
        tasks: ["less"]
    },


})

grunt.loadNpmTasks('grunt-bower-task');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default',['bower']);