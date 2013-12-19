({
	appDir: '../src/',
	baseUrl: './scripts/',
	dir: '../dist',
	mainConfigFile: '../src/scripts/main.js',
	optimizeCss: 'none',
	paths: {
		requireLib: '../scripts/vendors/requirejs/require'
	},
	modules: [
		// WARNING: Do not remove this entry, it will be required
		// by all your bundles.
        {
            name: 'main',
            include: ['requireLib', 'main', 'app'],
        },


        //
        // Add your bundles here.
        // Make sure you always exclude 'main', unless you want to have
        // one single big file with every bundle and dependency. This is
        // not recommended.
        //
        {
            name: 'bundles/todos/main',
            exclude: ['main']
        },
        {
            name: 'bundles/foo/main',
            exclude: ['main']
        }
    ]
})
