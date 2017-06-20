module.exports = (function loadConfig(){    
    var config = {
        js : {
            src : './src/js/*',
            dest : './dest/js/',
            fileName : 'app.js'
        },
        css : {
            src : './src/css/*',
            dest : './dest/css/',
            fileName : 'test.css'
        },
        html : {
            src : './src/*.html',
            dest : './dest/',
            //fileName : 'index.html'
        },
        injectConfig : {
            destAllJs : './dest/**/*.js',
            destAllCss : './dest/**/*.css',
            destAllHtml : './dest/*.html'
        },
        browserSyncConfig : {
            dev : 'localhost:9005/'
        }

    };
    
    return config;
})();